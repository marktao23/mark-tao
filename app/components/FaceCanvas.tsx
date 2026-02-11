"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { useState, useEffect } from "react";

export default function FaceCanvas() {
  const [mounted, setMounted] = useState(false);

  // This ensures the Three.js code only runs in the browser
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing on the server
  if (!mounted) return null;

  const faceTexture = useLoader(TextureLoader, "/Mark_Headshot.jpg");

  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial map={faceTexture} />
      </Sphere>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}