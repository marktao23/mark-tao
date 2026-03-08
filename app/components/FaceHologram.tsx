"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function HoloPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const tex = useTexture("/Mark_Headshot.png");

  useMemo(() => {
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 8;
  }, [tex]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTex: { value: tex },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }, // uv space (0..1)
      uHover: { value: 0.0 }, // 0 or 1
      uRepelStrength: { value: 0.06 }, // how much UV gets pushed
      uRepelRadius: { value: 0.22 }, // radius in UV units
      uScanLines: { value: 240.0 }, // scanline density
    }),
    [tex]
  );

  const [isHover, setIsHover] = useState(false);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;

    // smooth hover in/out
    const target = isHover ? 1.0 : 0.0;
    uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, target, 1 - Math.pow(0.001, delta));
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      onPointerMove={(e) => {
        // e.uv exists because we have UVs on planeGeometry
        if (e.uv) uniforms.uMouse.value.set(e.uv.x, e.uv.y);
      }}
    >
      <planeGeometry args={[1.2, 1.6]} />

      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;

          uniform float uTime;
          uniform sampler2D uTex;
          uniform vec2 uMouse;
          uniform float uHover;
          uniform float uRepelStrength;
          uniform float uRepelRadius;
          uniform float uScanLines;

          // tiny hash noise
          float hash(vec2 p){
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
          }

          void main() {
            // --- cursor repel in UV space ---
            vec2 uv = vUv;

            vec2 d = uv - uMouse;
            float dist = length(d);

            // 0..1 influence inside radius (soft falloff)
            float influence = (1.0 - smoothstep(0.0, uRepelRadius, dist)) * uHover;

            // direction away from cursor
            vec2 dir = (dist > 0.0001) ? (d / dist) : vec2(0.0);

            // small animated ripple on top of repel
            float ripple = sin((dist * 40.0) - (uTime * 8.0)) * 0.006 * influence;

            uv += dir * (uRepelStrength * influence) + dir * ripple;

            // clamp so we don't sample outside
            uv = clamp(uv, 0.001, 0.999);

            vec4 img = texture2D(uTex, uv);

            // luminance drives the mask (we'll kill skin detail)
            float lumin = dot(img.rgb, vec3(0.299, 0.587, 0.114));

            // --- line-only hologram look ---
            // scanlines (hard-ish)
            float scan = step(0.5, fract(uv.y * uScanLines + uTime * 1.2));

            // add subtle vertical "data columns" so it looks like your refs
            float cols = step(0.85, fract(uv.x * 120.0 + sin(uTime*0.7)*2.0));
            cols *= 0.25;

            // threshold mask to remove skin texture
            float mask = smoothstep(0.38, 0.78, lumin);

            // flicker/noise
            float n = (hash(uv * 900.0 + uTime) - 0.5) * 2.0;
            float flicker = 0.92 + 0.08 * sin(uTime * 9.0) + n * 0.03;

            float intensity = mask * (scan + cols) * flicker;

            // edge vignette (projected feel)
            float edge =
              smoothstep(0.02, 0.20, uv.x) *
              smoothstep(0.02, 0.20, uv.y) *
              smoothstep(0.02, 0.20, 1.0 - uv.x) *
              smoothstep(0.02, 0.20, 1.0 - uv.y);

            intensity *= edge;

            // cyan hologram color
            vec3 holo = vec3(0.05, 0.85, 1.0);

            // brighten a bit near cursor for a "field disturbance" feel
            intensity += influence * 0.25;

            vec3 color = holo * intensity;

            gl_FragColor = vec4(color, intensity);
          }
        `}
      />
    </mesh>
  );
}

export default function FaceHologram() {
  return (
    <div style={{ width: "100%", height: "850px" }}>
      <Canvas camera={{ position: [0, 0, 2.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <HoloPlane />
      </Canvas>
    </div>
  );
}