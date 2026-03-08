"use client";

import React, { useMemo, useRef } from "react";
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
      uTex: { value: tex }
    }),
    [tex]
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={meshRef}>
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
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}

        fragmentShader={`
          varying vec2 vUv;

          uniform float uTime;
          uniform sampler2D uTex;

          void main(){

            vec4 img = texture2D(uTex, vUv);

            // convert image to brightness map
            float lumin = dot(img.rgb, vec3(0.299,0.587,0.114));

            // horizontal hologram scanlines
            float scan = step(0.5, fract(vUv.y * 220.0));

            // subtle flicker
            float flicker = 0.9 + 0.1 * sin(uTime * 8.0);

            // threshold to remove skin detail
            float mask = smoothstep(0.35,0.75,lumin);

            float intensity = mask * scan * flicker;

            vec3 hologramColor = vec3(0.05,0.85,1.0);

            vec3 color = hologramColor * intensity;

            gl_FragColor = vec4(color,intensity);
          }
        `}
      />
    </mesh>
  );
}

export default function FaceHologram() {
  return (
    <div style={{ width: "100%", height: "1000px" }}>
      <Canvas camera={{ position: [0, 0, 2.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <HoloPlane />
      </Canvas>
    </div>
  );
}