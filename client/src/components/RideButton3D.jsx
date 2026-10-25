import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} intensity={1.4} />
      <Float speed={2} rotationIntensity={0.9} floatIntensity={1}>
        <mesh>
          <torusKnotGeometry args={[0.6, 0.22, 160, 32]} />
          <meshStandardMaterial color="#6366F1" emissive="#22D3EE" emissiveIntensity={0.45} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
    </>
  );
}

function RideButton3D({ onClick, disabled }) {
  return (
    <button
      className="group relative h-44 w-full overflow-hidden rounded-2xl border border-line/25 bg-fg/5 backdrop-blur-xl"
      onClick={onClick}
      disabled={disabled}
      aria-label="Request premium ride"
      type="button"
    >
      <Canvas camera={{ position: [0, 0, 2.2], fov: 70 }}>
        <Scene />
      </Canvas>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-lg font-semibold text-fg transition group-hover:tracking-wider">
        Request Ride
      </span>
    </button>
  );
}

export default RideButton3D;
