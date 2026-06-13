"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
function Geometries() {
  const soundEffectsRef = useRef([]);

  useEffect(() => {
    soundEffectsRef.current = [
      new Audio("/sounds/knock1.ogg"),
      new Audio("/sounds/knock2.ogg"),
      new Audio("/sounds/knock3.ogg"),
    ];
  }, []);

  // Pass to Geometry
  return SHAPES_DATA.map(({ position, r, geometry }) => {
    return (
      <Geometry
        key={JSON.stringify(position)}
        position={position.map((p) => p * 2)}
        soundEffects={soundEffectsRef}
        geometry={geometry}
        materials={MATERIALS_DATA}
        r={r}
      />
    );
  });
}
function Geometry({ r, position, geometry, materials, soundEffects }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const [startingMaterial] = useState(() => gsap.utils.random(materials));

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    if (
      soundEffects &&
      soundEffects.current &&
      soundEffects.current.length > 0
    ) {
      const audio = gsap.utils.random(soundEffects.current);
      audio.currentTime = 0;

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
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1,0.3)",
        delay: 0.03,
      });
    });
    return () => ctx.revert(); // for cleanup
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

const SHAPES_DATA = [
  {
    position: [0, 0, 0],
    r: 1,
    geometry: new THREE.IcosahedronGeometry(3), // Gem / Diamond Ball
  },
  {
    position: [1, -0.75, 4],
    r: 1.3,
    geometry: new THREE.CapsuleGeometry(0.5, 1.5, 2, 16), // Pill / Capsule
  },
  {
    position: [-1.4, 2, -4],
    r: 1.5,
    geometry: new THREE.OctahedronGeometry(1.5), // Diamond / Crystal
  },
  {
    position: [-0.8, -0.75, 5],
    r: 1.7,
    geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Donut / Torus
  },
  {
    position: [1.6, 1.6, -4],
    r: 1.9,
    geometry: new THREE.DodecahedronGeometry(1.5), // Socket Ball / 12-Sided Ball
  },
];

const MATERIALS_DATA = [
  new THREE.MeshNormalMaterial(),
  new THREE.MeshStandardMaterial({
    color: 0x2ecc71,
    roughness: 0,
    metalness: 0.1,
  }),
  new THREE.MeshStandardMaterial({
    color: 0xbe2edd,
    roughness: 0.4,
    metalness: 0.2,
  }),
  new THREE.MeshStandardMaterial({
    color: 0xf6e58d,
    roughness: 0.1,
    metalness: 0.3,
  }),
  new THREE.MeshStandardMaterial({
    color: 0xd63031,
    roughness: 0.1,
    metalness: 0.2,
  }),
  new THREE.MeshStandardMaterial({
    color: 0xff9ff3,
    roughness: 0.1,
    metalness: 0.3,
  }),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 0.3,
    color: 0xFFC312,
  }),
  new THREE.MeshStandardMaterial({
    color: 0x30336b,
    roughness: 0.1,
    metalness: 0.7,
  }),
];
