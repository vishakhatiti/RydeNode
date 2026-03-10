import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import FloatingCar from "./FloatingCar";

function CameraDrift() {
  const controlsRef = useRef(null);

  useFrame((state) => {
    if (!controlsRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    controlsRef.current.setAzimuthalAngle(Math.sin(t * 0.08) * 0.1);
    controlsRef.current.setPolarAngle(Math.PI / 2.6 + Math.sin(t * 0.09) * 0.04);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      autoRotate={false}
      minPolarAngle={Math.PI / 2.8}
      maxPolarAngle={Math.PI / 2.3}
    />
  );
}

function ParticleField() {
  const positions = useMemo(
    () =>
      Array.from({ length: 45 }, () => [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 6
      ]),
    []
  );

  return (
    <group>
      {positions.map((position, index) => (
        <mesh key={`particle-${index}`} position={position}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshBasicMaterial color={index % 2 ? "#2E8BFF" : "#8A2BE2"} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Hero3DScene() {
  return (
    <Canvas camera={{ position: [0, 0.7, 4.2], fov: 42 }} shadows dpr={[1, 1.5]}>
      <color attach="background" args={["#0F0F0F"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} color="#FFFFFF" castShadow />
      <pointLight position={[-2, 1, 1]} intensity={0.8} color="#2E8BFF" />
      <pointLight position={[2, -1, 2]} intensity={0.7} color="#8A2BE2" />
      <fog attach="fog" args={["#0F0F0F", 4, 9]} />
      <Stars radius={30} depth={10} count={300} factor={2} saturation={0} fade speed={0.2} />
      <ParticleField />
      <FloatingCar />
      <CameraDrift />
    </Canvas>
  );
}

export default Hero3DScene;
