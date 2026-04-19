"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, RoundedBox, Cylinder, Box } from "@react-three/drei";
import * as THREE from "three";

function ClayMaterial({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.8}
      metalness={0.1}
      clearcoat={0.3}
      clearcoatRoughness={0.2}
    />
  );
}

function GlassMaterial() {
  return (
    <meshPhysicalMaterial
      transmission={0.9}
      thickness={0.5}
      roughness={0.1}
      metalness={0.1}
      color="#ffffff"
      ior={1.5}
    />
  );
}

function FloatingShelf() {
  return (
    <group position={[0, -0.8, 0]} rotation={[0.05, -0.4, 0]}>
      <RoundedBox args={[6, 0.1, 3]} radius={0.05} smoothness={4}>
        <ClayMaterial color="#ffffff" />
      </RoundedBox>
    </group>
  );
}

function Laptop() {
  return (
    <group position={[1.2, -0.75, 0.2]} rotation={[0.02, -0.6, 0]}>
      {/* Base - Smoother Clay */}
      <RoundedBox args={[2, 0.08, 1.4]} radius={0.06} smoothness={8}>
        <ClayMaterial color="#fdfcf8" />
      </RoundedBox>
      
      {/* Screen / Lid - More Upright */}
      <group position={[0, 0.04, -0.7]} rotation={[-1.1, 0, 0]}>
        <RoundedBox args={[2, 1.3, 0.06]} radius={0.06} smoothness={8} position={[0, 0.65, 0]}>
          <ClayMaterial color="#fdfcf8" />
        </RoundedBox>
        {/* The Display Area */}
        <Box args={[1.8, 1.15, 0.01]} position={[0, 0.65, 0.035]}>
          <meshBasicMaterial color="#ffffff" />
        </Box>
      </group>
    </group>
  );
}

function Plant() {
  return (
    <group position={[-1.5, -0.75, 0.5]} rotation={[0, 0.5, 0]}>
      <Cylinder args={[0.3, 0.25, 0.4, 32]} position={[0, 0.2, 0]}>
        <ClayMaterial color="#c15f3c" />
      </Cylinder>
      <group position={[0, 0.4, 0]}>
        <Sphere args={[0.2, 16, 16]} position={[0, 0.3, 0]} scale={[0.6, 1.6, 0.6]}>
          <ClayMaterial color="#b1ada1" />
        </Sphere>
      </group>
    </group>
  );
}

export default function ThreeScene() {
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneGroupRef.current) {
      sceneGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
      sceneGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.01;
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <FloatingShelf />
      <Laptop />
      <Plant />
      
      {/* Abstract Floating Objects - Smaller and subtle */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <group position={[1.5, 1.5, -2]}>
          <RoundedBox args={[1, 0.7, 0.08]} radius={0.05} smoothness={4}>
            <GlassMaterial />
          </RoundedBox>
        </group>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[0.3, 32, 32]} position={[-2.5, 1.2, -2]}>
          <ClayMaterial color="#1a2b4c" />
        </Sphere>
      </Float>
    </group>
  );
}
