"use client";

import * as THREE from "three";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 15, 10]} intensity={3} castShadow />
          <directionalLight position={[-10, -5, -10]} intensity={0.8} />
          <pointLight position={[0, 10, 5]} intensity={2} color="#0f1fcc" />
          <pointLight position={[-5, 5, -5]} intensity={1.5} color="#fab170" />

          <Geometries />

          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={20}
            blur={2.5}
            far={9}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  // Component unmount hone par memory clear karne ke liye cleanup
  useEffect(() => {
    return () => {
      STATIC_GEOMETRIES.forEach((g) => g.dispose());
      STATIC_MATERIALS.forEach((m) => m.dispose());
    };
  }, []);

  return SHAPES_CONFIG.map(({ position, r, geometryIndex }) => {
    return (
      <Geometry
        key={geometryIndex}
        position={[position[0] * 2, position[1] * 2, position[2] * 2]}
        geometry={STATIC_GEOMETRIES[geometryIndex]}
        materials={STATIC_MATERIALS}
        r={r}
      />
    );
  });
}

interface GeometryProps {
  r: number;
  position: [number, number, number];
  geometry: THREE.BufferGeometry;
  materials: THREE.Material[];
}

function Geometry({ r, position, geometry, materials }: GeometryProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(false);
  const [startingMaterial] = useState(
    () => gsap.utils.random(materials) as THREE.Material,
  );

  function getRandomMaterial() {
    return gsap.utils.random(materials) as THREE.Material;
  }

  function handleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;

    if (typeof window !== "undefined") {
      const randomSound = gsap.utils.random(["1", "2", "3"]);
      const audio = new Audio(`/sounds/knock${randomSound}.ogg`);
      audio.volume = 0.3;
      audio.play().catch((err) => console.log("Audio play blocked: ", err));
    }

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(1, 1.5)}`,
      y: `+=${gsap.utils.random(1, 1.5)}`,
      z: `+=${gsap.utils.random(1, 1.5)}`,
      duration: 2,
      ease: "elastic.out(1,0.3)",
      repeat: 1,
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    if (!meshRef.current) return;

    const ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current!.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1,0.3)",
        delay: 0.03,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={1.5 * r} rotationIntensity={1.5 * r} floatIntensity={2 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}

const STATIC_GEOMETRIES = [
  new THREE.IcosahedronGeometry(3),
  new THREE.CapsuleGeometry(0.5, 1.5, 2, 16),
  new THREE.OctahedronGeometry(1.5),
  new THREE.TorusGeometry(0.6, 0.25, 16, 32),
  new THREE.DodecahedronGeometry(1.5),
];

const STATIC_MATERIALS = [
  new THREE.MeshStandardMaterial({ color: 0x44ff6f, roughness: 0.03, metalness: 0.4 }),
  new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.01, metalness: 0.3 }),
  new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.05, metalness: 0.3 }),
  new THREE.MeshStandardMaterial({ color: 0xdd77fc, roughness: 0.05, metalness: 0.3 }),
  new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.01, metalness: 0.3 }),
  new THREE.MeshStandardMaterial({ color: 0x1abffc, roughness: 0.2, metalness: 0.3 }),
  new THREE.MeshStandardMaterial({ color: 0xb5d471, roughness: 0.01, metalness: 0.2 }),
  new THREE.MeshStandardMaterial({ color: 0xa4b0be, roughness: 0.5, metalness: 1 }),
];

const SHAPES_CONFIG = [
  { position: [0, 0, 0] as [number, number, number], r: 1, geometryIndex: 0 },
  { position: [1, -0.75, 4] as [number, number, number], r: 1.3, geometryIndex: 1 },
  { position: [-1.4, 2, -4] as [number, number, number], r: 1.5, geometryIndex: 2 },
  { position: [-0.8, -0.75, 5] as [number, number, number], r: 1.7, geometryIndex: 3 },
  { position: [1.6, 1.6, -4] as [number, number, number], r: 1.9, geometryIndex: 4 },
];