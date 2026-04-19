"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, useTexture, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";

function WebsitePanel({ url, position, rotation, scale = 1 }: { url: string, position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  const texture = useTexture(url);
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position} rotation={rotation}>
        {/* The Frame / Glass */}
        <RoundedBox args={[4 * scale, 2.5 * scale, 0.05]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial 
            transmission={1} 
            thickness={0.5} 
            roughness={0.1} 
            color="#ffffff"
          />
        </RoundedBox>
        {/* The Website Texture */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[3.8 * scale, 2.3 * scale]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>
    </Float>
  );
}

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

export default function ThreeScene() {
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneGroupRef.current) {
      sceneGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={sceneGroupRef}>
      {/* Primary Website Showcase */}
      <WebsitePanel 
        url="/web1.png" 
        position={[1.5, 0.2, 0]} 
        rotation={[0, -0.4, 0]} 
        scale={1.2}
      />
      
      {/* Secondary Website Showcase (Partial reveal) */}
      <WebsitePanel 
        url="/web2.png" 
        position={[-1.8, -1.2, -1]} 
        rotation={[0.1, 0.5, 0]} 
        scale={0.8}
      />

      {/* Decorative 3D Spheres (Claymorphic) */}
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.4, 32, 32]} position={[-3, 1.5, -2]}>
          <ClayMaterial color="#c15f3c" />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.2, 32, 32]} position={[3, -1.5, -1]}>
          <ClayMaterial color="#1a2b4c" />
        </Sphere>
      </Float>

      <Environment preset="city" />
    </group>
  );
}
