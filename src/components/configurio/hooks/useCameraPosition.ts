import { useEffect, useState } from "react";
import useMeasure from "react-use/lib/useMeasure";
import { Box3, Group, Vector3 } from "three";
import { calculateCameraPosition, getCameraTarget } from "../utils/camera";
import { Configurator } from "../types";

export interface UseCameraPositionProps {
  scene: Group;
  fillPercentage: number;
  initialCameraPosition: Configurator["options"]["initialCameraPosition"];
}

export const useCameraPosition = ({ scene, fillPercentage, initialCameraPosition }: UseCameraPositionProps) => {
  const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 0, 0));
  const [cameraTarget, setCameraTarget] = useState(new Vector3(0, 0, 0));
  const [containerRef, { width, height }] = useMeasure();

  useEffect(() => {
    if (width && height && scene) {
      const boundingBox = new Box3().setFromObject(scene);
      setCameraPosition(
        initialCameraPosition
          ? new Vector3(...initialCameraPosition)
          : calculateCameraPosition(boundingBox.min, boundingBox.max, fillPercentage)
      );
      setCameraTarget(getCameraTarget(boundingBox.min, boundingBox.max));
    }
  }, [scene, width, height, initialCameraPosition]);

  return { containerRef, cameraPosition, cameraTarget };
};
