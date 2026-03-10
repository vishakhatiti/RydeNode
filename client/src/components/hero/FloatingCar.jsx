import React, { useRef } from "react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function FloatingCar() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.22;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef}>
        <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
          <boxGeometry args={[2.2, 0.55, 1]} />
          <meshStandardMaterial color="#2E8BFF" metalness={0.85} roughness={0.2} emissive="#2E8BFF" emissiveIntensity={0.18} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.38, 0]}>
          <boxGeometry args={[1.2, 0.42, 0.92]} />
          <meshStandardMaterial color="#1C1C1C" metalness={0.6} roughness={0.28} />
        </mesh>
        <mesh position={[0, -0.16, -0.52]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.32, 0.4, 32]} />
          <meshBasicMaterial color="#8A2BE2" transparent opacity={0.32} />
        </mesh>
        <mesh position={[0, -0.16, 0.52]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.32, 0.4, 32]} />
          <meshBasicMaterial color="#8A2BE2" transparent opacity={0.32} />
        </mesh>
      </group>
    </Float>
  );
}

export default FloatingCar;
