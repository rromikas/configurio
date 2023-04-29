import React, { FunctionComponent, Suspense, forwardRef, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera, useProgress } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import { Color, ColorRepresentation, Mesh, MeshStandardMaterial } from "three";
import { useCameraPosition } from "./hooks/useCameraPosition";
import { useModel } from "./hooks/useModel";
import { AppliableEffect, Configurator } from "./types";

interface ModelProps {
  url: string;
  onLoad?: (model: ReturnType<typeof useModel>) => void;
  highlightIndex?: number;
  onSelect?: (index: number | undefined) => void;
  materials?: AppliableEffect[];
  disableHover?: boolean;
  initialCameraPosition: Configurator["options"]["initialCameraPosition"];
}

const Loader = () => {
  const { progress } = useProgress();

  return <Html center>{progress.toFixed(0)} % loaded</Html>;
};

const Model = forwardRef<HTMLCanvasElement, ModelProps>(
  ({ url, onLoad, onSelect, materials, highlightIndex, disableHover = false, initialCameraPosition }, ref) => {
    const model = useModel({ url });
    const {
      cameraPosition,
      cameraTarget: target,
      containerRef,
    } = useCameraPosition({
      ...model,
      fillPercentage: 70,
      initialCameraPosition,
    });
    const [localHighlightIndex, setLocalHighlightIndex] = useState<number>();

    useEffect(() => {
      if (!materials) return;
      Object.values(model.nodes).forEach((node, i) => {
        const clonedNode = Object.values(model.clonedNodes)[i];
        const selectedMaterial = materials.find((m) => m.targetIndexes.includes(i));
        const newMaterial = selectedMaterial?.material?.clone() ?? (clonedNode.material as MeshStandardMaterial).clone();
        newMaterial.color = selectedMaterial?.color
          ? new Color(selectedMaterial.color as ColorRepresentation)
          : (clonedNode.material as MeshStandardMaterial).color;
        node.material = newMaterial;
      });
    }, [model.scene, materials]);

    useEffect(() => {
      if (onLoad) {
        onLoad(model);
      }
    }, [model]);

    useEffect(() => {
      Object.values(model.nodes).map((node, i) => {
        if (node.type === "Mesh") {
          const meshObj = node as Mesh;
          if (highlightIndex === i || localHighlightIndex === i) {
            let newMaterial = (meshObj.material as MeshStandardMaterial).clone();
            newMaterial.emissive = new Color("rgb(100,100,100)");
            meshObj.material = newMaterial;
          } else {
            meshObj.material = model.clonedNodes[node.id].material;
          }
        }
      });
    }, [highlightIndex, model, localHighlightIndex]);

    const getIndexById = (id: number) => {
      const index = Object.values(model.nodes).findIndex((n) => n.id === id);
      return index === -1 ? undefined : index;
    };

    return (
      <div ref={containerRef as any} style={{ width: "100%", height: "100%" }}>
        <ErrorBoundary fallback={<div style={{ padding: 8 }}>Can not render</div>}>
          <Suspense fallback={<Loader />}>
            <Canvas gl={{ preserveDrawingBuffer: true }} ref={ref}>
              <ambientLight intensity={1} />
              <directionalLight intensity={0.5} position={[1, 1, 1]} />
              <directionalLight intensity={0.5} position={[-1, -1, -1]} />
              <PerspectiveCamera makeDefault position={cameraPosition}></PerspectiveCamera>;
              <group
                onPointerMissed={() => {
                  if (onSelect) {
                    onSelect(undefined);
                  }
                }}
                onClick={(e) => {
                  if (onSelect) {
                    const index = getIndexById(e.intersections[0].object.id);
                    onSelect(index);
                  }
                }}
                onPointerLeave={() => {
                  if (disableHover) return;
                  setLocalHighlightIndex(undefined);
                }}
                onPointerMove={(e) => {
                  if (disableHover) return;
                  setLocalHighlightIndex(getIndexById(e.intersections[0].object.id));
                }}
              >
                <primitive object={model.scene}></primitive>
              </group>
              <OrbitControls target={target}></OrbitControls>
            </Canvas>
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
);

export default Model;
