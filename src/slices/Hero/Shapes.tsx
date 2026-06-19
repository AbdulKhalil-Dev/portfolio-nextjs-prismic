"use client";

import * as THREE from "three";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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
          <ambientLight intensity={0.6} /> 
          <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow />

          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={20}
            blur={2.5}
            far={9}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  // ڈبل فنکشن ڈیکلریشن کا ایرر فکس کر دیا گیا ہے
  const { geometries, materials } = useMemo(() => {
    const geoms = [
      new THREE.IcosahedronGeometry(3),
      new THREE.CapsuleGeometry(0.5, 1.5, 2, 16),
      new THREE.OctahedronGeometry(1.5),
      new THREE.TorusGeometry(0.6, 0.25, 16, 32),
      new THREE.DodecahedronGeometry(1.5),
    ];

    const mats = [
      new THREE.MeshNormalMaterial(),
      ...[0xff007f, 0xfab1a0, 0xf1c40f, 0x4cd137, 0xff9ff3, 0xb5ff00, 0x00f3ff].map(
        (color) =>
          new THREE.MeshStandardMaterial({
            color,
            roughness: color === 0xff007f || color === 0xb5ff00 ? 0 : 0.1,
            metalness: [0xf1c40f, 0xff9ff3, 0xb5ff00, 0x00f3ff].includes(color) ? 0.3 : 0.2,
          })
      ),
    ];

    return { geometries: geoms, materials: mats };
  }, []);

  useEffect(() => {
    return () => {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    };
  }, [geometries, materials]);

  return SHAPES_CONFIG.map(({ position, r, geometryIndex }) => {
    return (
      <Geometry
        key={geometryIndex}
        position={[position[0] * 2, position[1] * 2, position[2] * 2]}
        geometry={geometries[geometryIndex]}
        materials={materials}
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
  const [startingMaterial] = useState(() => gsap.utils.random(materials) as THREE.Material);

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

const SHAPES_CONFIG = [
  { position: [0, 0, 0], r: 1, geometryIndex: 0 },
  { position: [1, -0.75, 4], r: 1.3, geometryIndex: 1 },
  { position: [-1.4, 2, -4], r: 1.5, geometryIndex: 2 },
  { position: [-0.8, -0.75, 5], r: 1.7, geometryIndex: 3 },
  { position: [1.6, 1.6, -4], r: 1.9, geometryIndex: 4 },
];