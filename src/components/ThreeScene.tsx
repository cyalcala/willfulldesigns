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
    <group position={[1.8, -1.1, 0.5]} rotation={[0.1, -0.7, 0]}>
      {/* Base */}
      <RoundedBox args={[2.8, 0.1, 2]} radius={0.04} smoothness={4}>
        <ClayMaterial color="#ffffff" />
      </RoundedBox>
      
      {/* Trackpad */}
      <Box args={[0.8, 0.01, 0.5]} position={[0, 0.051, 0.5]}>
        <meshStandardMaterial color="#eeeeee" roughness={0.4} />
      </Box>

      {/* Screen / Lid */}
      <group position={[0, 0.05, -1]} rotation={[-1.7, 0, 0]}>
        <RoundedBox args={[2.8, 1.8, 0.06]} radius={0.04} smoothness={4} position={[0, 0.9, 0]}>
          <ClayMaterial color="#ffffff" />
        </RoundedBox>
        <Box args={[2.6, 1.6, 0.01]} position={[0, 0.9, 0.035]}>
          <meshBasicMaterial color="#f4f3ee" />
        </Box>
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
