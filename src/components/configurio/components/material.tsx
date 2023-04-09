import React, { FunctionComponent, Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera, useProgress } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import { useCameraPosition } from "../hooks/useCameraPosition";
import { useModel } from "../hooks/useModel";

interface MaterialProps {
  url: string;
  onLoad?: (model: ReturnType<typeof useModel>) => void;
  fillPercentage: number;
}

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center style={{ color: "white", whiteSpace: "nowrap" }}>
      {progress.toFixed(0)} % loaded
    </Html>
  );
};

const Material: FunctionComponent<MaterialProps> = ({ url, onLoad = () => {}, fillPercentage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const model = useModel({ url });
  const {
    cameraPosition,
    containerRef,
    cameraTarget: target,
  } = useCameraPosition({
    ...model,
    fillPercentage,
  });

  useEffect(() => {
    onLoad(model);
  }, [model]);

  return (
    <div ref={containerRef as any} style={{ width: "100%", height: "100%" }}>
      <ErrorBoundary fallback={<div>Can not render</div>}>
        <Canvas gl={{ preserveDrawingBuffer: true }} ref={canvasRef}>
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={1} />
            <directionalLight intensity={0.5} position={[1, 1, 1]} />
            <directionalLight intensity={0.5} position={[-1, -1, -1]} />
            <PerspectiveCamera makeDefault position={cameraPosition}></PerspectiveCamera>;
            <primitive object={model.scene}></primitive>
            <OrbitControls target={target} zoomSpeed={5}></OrbitControls>
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default Material;
