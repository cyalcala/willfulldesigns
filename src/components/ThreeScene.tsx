"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Cylinder, RoundedBox } from "@react-three/drei";
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

function Laptop() {
  return (
    <group position={[1.5, -0.5, 0]} rotation={[0, -0.4, 0]}>
      {/* Base */}
      <RoundedBox args={[2.5, 0.1, 1.8]} radius={0.05} smoothness={4}>
        <ClayMaterial color="#ffffff" />
      </RoundedBox>
      {/* Screen */}
      <group position={[0, 0.05, -0.9]} rotation={[-0.2, 0, 0]}>
        <RoundedBox args={[2.5, 1.7, 0.05]} radius={0.05} smoothness={4} position={[0, 0.85, 0]}>
          <ClayMaterial color="#ffffff" />
        </RoundedBox>
        {/* Screen Content */}
        <Box args={[2.3, 1.5, 0.01]} position={[0, 0.85, 0.03]}>
          <meshBasicMaterial color="#f4f3ee" />
        </Box>
      </group>
    </group>
  );
}

function Plant() {
  return (
    <group position={[-1.8, -0.8, 0.5]}>
      {/* Pot */}
      <Cylinder args={[0.3, 0.2, 0.5, 32]} position={[0, 0.25, 0]}>
        <ClayMaterial color="#c15f3c" />
      </Cylinder>
      {/* Leaves */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[0.2, 16, 16]} position={[0, 0.7, 0]} scale={[0.5, 1.5, 0.5]}>
          <ClayMaterial color="#b1ada1" />
        </Sphere>
        <Sphere args={[0.2, 16, 16]} position={[0.2, 0.6, 0.2]} rotation={[0, 0, 0.5]} scale={[0.5, 1.2, 0.5]}>
          <ClayMaterial color="#b1ada1" />
        </Sphere>
      </Float>
    </group>
  );
}

function FloatingChart() {
  return (
    <group position={[2.5, 1.5, -1]}>
      <RoundedBox args={[1.5, 1, 0.1]} radius={0.05} smoothness={4}>
        <GlassMaterial />
      </RoundedBox>
      <Box args={[0.1, 0.4, 0.05]} position={[-0.4, -0.1, 0.1]}>
        <ClayMaterial color="#c15f3c" />
      </Box>
      <Box args={[0.1, 0.6, 0.05]} position={[-0.1, 0, 0.1]}>
        <ClayMaterial color="#1a2b4c" />
      </Box>
      <Box args={[0.1, 0.3, 0.05]} position={[0.2, -0.15, 0.1]}>
        <ClayMaterial color="#b1ada1" />
      </Box>
    </group>
  );
}

export default function ThreeScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Laptop />
      <Plant />
      <FloatingChart />
      
      {/* Background abstract shapes */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[0.4, 32, 32]} position={[-3, 2, -3]}>
          <ClayMaterial color="#1a2b4c" />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-4, -1, -2]} rotation={[Math.PI/4, 0, 0]}>
          <octahedronGeometry args={[0.5]} />
          <ClayMaterial color="#f4f3ee" />
        </mesh>
      </Float>
    </group>
  );
}
