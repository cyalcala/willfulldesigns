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
    <group position={[0, -1.2, 0]} rotation={[0.1, -0.4, 0]}>
      <RoundedBox args={[8, 0.15, 4]} radius={0.08} smoothness={4}>
        <ClayMaterial color="#ffffff" />
      </RoundedBox>
    </group>
  );
}

function Laptop() {
  return (
    <group position={[2, -1.05, 0.5]} rotation={[0.05, -0.6, 0]}>
      {/* Base - Smoother Beige Clay */}
      <RoundedBox args={[2.8, 0.12, 2]} radius={0.1} smoothness={8}>
        <ClayMaterial color="#f4f3ee" />
      </RoundedBox>
      
      {/* Trackpad - subtle indentation */}
      <RoundedBox args={[0.8, 0.02, 0.5]} position={[0, 0.06, 0.5]} radius={0.05} smoothness={4}>
        <ClayMaterial color="#eeeeee" />
      </RoundedBox>

      {/* Screen / Lid - Smoother Beige Clay */}
      <group position={[0, 0.06, -1]} rotation={[-1.3, 0, 0]}>
        <RoundedBox args={[2.8, 1.8, 0.08]} radius={0.1} smoothness={8} position={[0, 0.9, 0]}>
          <ClayMaterial color="#f4f3ee" />
        </RoundedBox>
        {/* The Display */}
        <RoundedBox args={[2.5, 1.6, 0.01]} position={[0, 0.9, 0.045]} radius={0.05} smoothness={4}>
          <meshBasicMaterial color="#ffffff" />
        </RoundedBox>
      </group>
    </group>
  );
}

function Plant() {
  return (
    <group position={[-2, -1.1, 1]} rotation={[0, 0.5, 0]}>
      <Cylinder args={[0.4, 0.3, 0.6, 32]} position={[0, 0.3, 0]}>
        <ClayMaterial color="#c15f3c" />
      </Cylinder>
      <group position={[0, 0.6, 0]}>
        <Sphere args={[0.3, 16, 16]} position={[0, 0.4, 0]} scale={[0.6, 1.8, 0.6]}>
          <ClayMaterial color="#b1ada1" />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={[0.2, 0.3, 0.2]} rotation={[0, 0, 0.6]} scale={[0.5, 1.4, 0.5]}>
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
      // Use additive rotation to avoid overwriting base angles
      sceneGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      sceneGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <FloatingShelf />
      <Laptop />
      <Plant />
      
      {/* Abstract Floating Objects */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <group position={[2.5, 2, -2]}>
          <RoundedBox args={[1.5, 1, 0.1]} radius={0.05} smoothness={4}>
            <GlassMaterial />
          </RoundedBox>
          <Box args={[0.1, 0.5, 0.05]} position={[-0.4, 0, 0.1]}>
            <ClayMaterial color="#c15f3c" />
          </Box>
          <Box args={[0.1, 0.3, 0.05]} position={[0, -0.1, 0.1]}>
            <ClayMaterial color="#1a2b4c" />
          </Box>
        </group>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[-4, 1.5, -3]}>
          <ClayMaterial color="#1a2b4c" />
        </Sphere>
      </Float>
      
      <Float speed={2.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[4, -1, -2]} rotation={[Math.PI/4, 0.2, 0]}>
          <octahedronGeometry args={[0.6]} />
          <ClayMaterial color="#b1ada1" />
        </mesh>
      </Float>
    </group>
  );
}
