"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Group } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

// Lazy load countries data
const loadCountriesData = async () => {
  const { default: countries } = await import("@/data/globe.json");
  return countries;
};

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Group | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [countriesData, setCountriesData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const defaultProps = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    }),
    [globeConfig],
  );

  // Load countries data
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const countries = await loadCountriesData();
        if (isMounted) {
          setCountriesData(countries);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load countries data:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current && countriesData) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current as any).add(globeRef.current);
      setIsInitialized(true);
    }
  }, [countriesData]);

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
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Memoize filtered points calculation
  const filteredPoints = useMemo(() => {
    if (!data || !isInitialized) return [];

    const points = [];
    for (let i = 0; i < data.length; i++) {
      const arc = data[i];
      points.push(
        {
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.startLat,
          lng: arc.startLng,
        },
        {
          size: defaultProps.pointSize,
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
  }, [data, defaultProps.pointSize, isInitialized]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data || !countriesData) return;

    globeRef.current
      .hexPolygonsData(countriesData.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings);
  }, [
    isInitialized,
    data,
    countriesData,
    filteredPoints,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Optimized rings animation with requestAnimationFrame
  const updateRings = useCallback(() => {
    if (!globeRef.current || !data) return;

    const newNumbersOfRings = genRandomNumbers(0, data.length, Math.floor((data.length * 4) / 5));
    const ringsData = data
      .filter((d, i) => newNumbersOfRings.includes(i))
      .map((d) => ({
        lat: d.startLat,
        lng: d.startLng,
        color: d.color,
      }));

    globeRef.current.ringsData(ringsData);
  }, [data]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

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
  }, [isInitialized, data, updateRings]);

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

  if (isLoading) {
    return (
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[100, 32, 32]} />
          <meshBasicMaterial color="#1d072e" opacity={0.3} transparent />
        </mesh>
      </group>
    );
  }

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    // Limit pixel ratio to prevent performance issues on high-DPI displays
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    gl.setPixelRatio(pixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);

    // Enable performance optimizations
    (gl as any).powerPreference = "high-performance";
    // Note: antialias and alpha are set in Canvas gl prop
  }, [gl, size.width, size.height]);

  return null;
}

// Loading fallback component
function GlobeLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-500"></div>
    </div>
  );
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = useMemo(() => {
    const s = new Scene();
    s.fog = new Fog(0xffffff, 400, 2000);
    return s;
  }, []);

  const camera = useMemo(() => new PerspectiveCamera(50, aspect, 180, 1800), []);

  return (
    <Suspense fallback={<GlobeLoader />}>
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
        <Globe {...props} />
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
    </Suspense>
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
