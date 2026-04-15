"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState, useCallback } from "react";
import * as THREE from "three";

function CoreMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const [hovered, setHovered] = useState(false);
  const pulseStrength = useRef(0);
  const { pointer } = useThree();

  // Particle positions for orbiting nodes
  const particleCount = 80;
  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const inclinations = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      radii[i] = 1.8 + Math.random() * 1.8;
      speeds[i] = 0.15 + Math.random() * 0.4;
      phases[i] = Math.random() * Math.PI * 2;
      inclinations[i] = (Math.random() - 0.5) * Math.PI * 0.8;
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }
    return { positions, speeds, radii, phases, inclinations };
  }, []);

  // Connection lines buffer
  const maxLines = 200;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), []);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), []);

  // Wireframe material
  const wireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00F0FF"),
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    []
  );

  const innerMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00F0FF"),
        transparent: true,
        opacity: 0.04,
      }),
    []
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00F0FF"),
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
      }),
    []
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00F0FF"),
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      }),
    []
  );

  const particleMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#00F0FF"),
        size: 0.04,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      }),
    []
  );

  const handlePointerOver = useCallback(() => setHovered(true), []);
  const handlePointerOut = useCallback(() => setHovered(false), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Check mouse proximity to center of viewport
    const dist = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y);
    const isNear = dist < 0.6;
    const targetPulse = hovered ? 1.0 : isNear ? 0.5 + (1 - dist / 0.6) * 0.5 : 0;
    pulseStrength.current += (targetPulse - pulseStrength.current) * 0.05;
    const pulse = pulseStrength.current;

    // Core rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1 + 0.15;
    }

    // Wireframe pulse
    if (wireRef.current) {
      const baseScale = 1.0 + Math.sin(t * 1.5) * 0.03;
      const pulseScale = baseScale + pulse * 0.25;
      wireRef.current.scale.setScalar(pulseScale);
      wireMaterial.opacity = 0.15 + pulse * 0.25;
    }

    // Inner solid
    if (innerRef.current) {
      innerMaterial.opacity = 0.04 + pulse * 0.08;
    }

    // Glow sphere
    if (glowRef.current) {
      const glowScale = 1.8 + Math.sin(t * 2) * 0.1 + pulse * 0.6;
      glowRef.current.scale.setScalar(glowScale);
      glowMaterial.opacity = 0.06 + pulse * 0.08;
    }

    // Orbital rings
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.2;
      ringRef1.current.rotation.x = t * 0.05;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.15;
      ringRef2.current.rotation.y = t * 0.08;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.x = t * 0.12;
      ringRef3.current.rotation.z = t * 0.1;
    }

    // Update particle positions
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const r = particleData.radii[i] + pulse * 0.15;
        const speed = particleData.speeds[i] * (1 + pulse * 0.5);
        const angle = t * speed + particleData.phases[i];
        const incl = particleData.inclinations[i];
        pos.array[i * 3] = Math.cos(angle) * Math.cos(incl) * r;
        pos.array[i * 3 + 1] = Math.sin(incl) * r + Math.sin(t * 0.5 + i) * 0.1;
        pos.array[i * 3 + 2] = Math.sin(angle) * Math.cos(incl) * r;
      }
      pos.needsUpdate = true;
      particleMaterial.opacity = 0.5 + pulse * 0.4;
      particleMaterial.size = 0.04 + pulse * 0.02;
    }

    // Update connection lines
    if (linesRef.current && particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      let lineIdx = 0;
      const connectionDist = 1.6 + pulse * 0.4;

      for (let i = 0; i < particleCount && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < particleCount && lineIdx < maxLines; j++) {
          const dx = pos.array[i * 3] - pos.array[j * 3];
          const dy = pos.array[i * 3 + 1] - pos.array[j * 3 + 1];
          const dz = pos.array[i * 3 + 2] - pos.array[j * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (d < connectionDist) {
            const alpha = (1 - d / connectionDist) * (0.12 + pulse * 0.15);
            linePositions[lineIdx * 6] = pos.array[i * 3];
            linePositions[lineIdx * 6 + 1] = pos.array[i * 3 + 1];
            linePositions[lineIdx * 6 + 2] = pos.array[i * 3 + 2];
            linePositions[lineIdx * 6 + 3] = pos.array[j * 3];
            linePositions[lineIdx * 6 + 4] = pos.array[j * 3 + 1];
            linePositions[lineIdx * 6 + 5] = pos.array[j * 3 + 2];
            // cyan color with alpha
            lineColors[lineIdx * 6] = 0;
            lineColors[lineIdx * 6 + 1] = 0.94 * alpha;
            lineColors[lineIdx * 6 + 2] = 1.0 * alpha;
            lineColors[lineIdx * 6 + 3] = 0;
            lineColors[lineIdx * 6 + 4] = 0.94 * alpha;
            lineColors[lineIdx * 6 + 5] = 1.0 * alpha;
            lineIdx++;
          }
        }
      }
      // Zero out unused lines
      for (let i = lineIdx; i < maxLines; i++) {
        linePositions[i * 6] = 0;
        linePositions[i * 6 + 1] = 0;
        linePositions[i * 6 + 2] = 0;
        linePositions[i * 6 + 3] = 0;
        linePositions[i * 6 + 4] = 0;
        linePositions[i * 6 + 5] = 0;
      }

      const lineGeo = linesRef.current.geometry;
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main wireframe icosahedron */}
      <mesh
        ref={wireRef}
        material={wireMaterial}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <icosahedronGeometry args={[1.2, 1]} />
      </mesh>

      {/* Inner solid */}
      <mesh ref={innerRef} material={innerMaterial}>
        <icosahedronGeometry args={[1.15, 1]} />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef} material={glowMaterial}>
        <sphereGeometry args={[1.2, 32, 32]} />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ringRef1} material={ringMaterial}>
        <torusGeometry args={[1.9, 0.005, 8, 64]} />
      </mesh>
      <mesh ref={ringRef2} material={ringMaterial} rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[2.4, 0.005, 8, 64]} />
      </mesh>
      <mesh ref={ringRef3} material={ringMaterial} rotation={[0.6, 1.0, 0.3]}>
        <torusGeometry args={[2.9, 0.005, 8, 64]} />
      </mesh>

      {/* Orbiting particles */}
      <points ref={particlesRef} material={particleMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particleData.positions}
            itemSize={3}
          />
        </bufferGeometry>
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={maxLines * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={1} />
      </lineSegments>
    </group>
  );
}

export function NeuralCore() {
  return (
    <div className="h-[500px] w-[500px] md:h-[620px] md:w-[620px] lg:h-[720px] lg:w-[720px]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <CoreMesh />
      </Canvas>
    </div>
  );
}
