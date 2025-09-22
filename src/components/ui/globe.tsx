"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Group } from "three";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { globeConfig, sampleArcs } from "../utils/globe";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): any;
    };
  }
}

// Dynamic import for ThreeGlobe to avoid SSR issues
let ThreeGlobe: any = null;

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

export function Globe({ countriesData }: { countriesData: any }) {
  const globeRef = useRef<any | null>(null);
  const groupRef = useRef<Group | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isThreeGlobeLoaded, setIsThreeGlobeLoaded] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Load ThreeGlobe dynamically
  useEffect(() => {
    if (typeof window !== "undefined" && !ThreeGlobe) {
      import("three-globe").then((module) => {
        ThreeGlobe = module.default;
        extend({ ThreeGlobe });
        setIsThreeGlobeLoaded(true);
      });
    } else if (ThreeGlobe) {
      setIsThreeGlobeLoaded(true);
    }
  }, []);

  // Initialize globe only once when ThreeGlobe is loaded
  useEffect(() => {
    if (!globeRef.current && groupRef.current && ThreeGlobe && isThreeGlobeLoaded) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current as any).add(globeRef.current);
      setIsInitialized(true);
    }
  }, [isThreeGlobeLoaded]);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [isInitialized]);

  // Memoize filtered points calculation
  const filteredPoints = useMemo(() => {
    if (!isInitialized) return [];

    const points = [];
    for (let i = 0; i < sampleArcs.length; i++) {
      const arc = sampleArcs[i];
      points.push(
        {
          size: globeConfig.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.startLat,
          lng: arc.startLng,
        },
        {
          size: globeConfig.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.endLat,
          lng: arc.endLng,
        },
      );
    }

    // Remove duplicates for same lat and lng
    return points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every((k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]),
        ) === i,
    );
  }, [isInitialized]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !countriesData) return;

    globeRef.current
      .hexPolygonsData(countriesData.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(globeConfig.showAtmosphere)
      .atmosphereColor(globeConfig.atmosphereColor)
      .atmosphereAltitude(globeConfig.atmosphereAltitude)
      .hexPolygonColor(() => globeConfig.polygonColor);

    globeRef.current
      .arcsData(sampleArcs)
      .arcStartLat((d: any) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d: any) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d: any) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d: any) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e: any) => (e as { arcAlt: number }).arcAlt * 1)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(globeConfig.arcLength)
      .arcDashInitialGap((e: any) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => globeConfig.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e: any) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => globeConfig.polygonColor)
      .ringMaxRadius(globeConfig.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((globeConfig.arcTime * globeConfig.arcLength) / globeConfig.rings);
  }, [isInitialized, countriesData, filteredPoints]);

  // Optimized rings animation with requestAnimationFrame
  const updateRings = useCallback(() => {
    if (!globeRef.current) return;

    const newNumbersOfRings = genRandomNumbers(
      0,
      sampleArcs.length,
      Math.floor((sampleArcs.length * 4) / 5),
    );
    const ringsData = sampleArcs
      .filter((d, i) => newNumbersOfRings.includes(i))
      .map((d) => ({
        lat: d.startLat,
        lng: d.startLng,
        color: d.color,
      }));

    globeRef.current.ringsData(ringsData);
  }, []);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const startAnimation = () => {
      updateRings();
      animationRef.current = setTimeout(startAnimation, 2000);
    };

    startAnimation();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isInitialized, updateRings]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      // Clean up Three.js objects
      if (globeRef.current) {
        // ThreeGlobe cleanup
        if (typeof (globeRef.current as any).dispose === "function") {
          (globeRef.current as any).dispose();
        }
        globeRef.current = null;
      }
    };
  }, []);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    // Limit pixel ratio to prevent performance issues on high-DPI displays
    const pixelRatio = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;
    gl.setPixelRatio(pixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);

    // Enable performance optimizations
    (gl as any).powerPreference = "high-performance";
    // Note: antialias and alpha are set in Canvas gl prop
  }, [gl, size.width, size.height]);

  return null;
}

export function World({ countriesData }: { countriesData: any }) {
  const scene = useMemo(() => {
    const s = new Scene();
    s.fog = new Fog(0xffffff, 400, 2000);
    return s;
  }, []);

  const camera = useMemo(() => new PerspectiveCamera(50, aspect, 180, 1800), []);

  return (
    <Canvas
      scene={scene}
      camera={camera}
      dpr={[1, 2]}
      gl={{
        powerPreference: "high-performance",
        antialias: false,
        alpha: false,
        depth: true,
        stencil: false,
        preserveDrawingBuffer: false,
      }}
      frameloop="always" // Keep rendering for smooth animations
      resize={{ scroll: false }} // Disable scroll-based resizing for performance
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe countriesData={countriesData} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={globeConfig.autoRotateSpeed || 1}
        autoRotate={globeConfig.autoRotate !== false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
