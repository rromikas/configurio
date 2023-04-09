import { Vector3 } from "three";

export function getCameraPosition(min: Vector3, max: Vector3, aspectRatio: number) {
  const boundingBoxCenter = new Vector3().addVectors(min, max).multiplyScalar(0.5);

  const cameraZ = Math.max(
    Math.abs(max.z - min.z) / 2,
    Math.abs(max.y - min.y) / (2 * aspectRatio),
    Math.abs(max.x - min.x) / (2 * aspectRatio)
  );

  const cameraPosition = new Vector3(boundingBoxCenter.x, boundingBoxCenter.y, cameraZ * 3);

  return cameraPosition;
}

export function getCameraTarget(min: Vector3, max: Vector3) {
  return new Vector3().addVectors(min, max).multiplyScalar(0.5);
}

export const getCameraPositionForMaterialOption = (min: Vector3, max: Vector3) => {
  const boundingBoxCenter = new Vector3().addVectors(min, max).multiplyScalar(0.5);
  const radius = Math.max(Math.abs(max.z - min.z), Math.abs(max.y - min.y), Math.abs(max.x - min.x)) / 2;

  const cameraPosition = new Vector3(boundingBoxCenter.x, boundingBoxCenter.y, boundingBoxCenter.z + radius);

  return cameraPosition;
};

export function calculateCameraPosition(min: Vector3, max: Vector3, coveragePercentage: number): Vector3 {
  const boundingBoxCenter = new Vector3().addVectors(min, max).multiplyScalar(0.5);
  const radius = Math.max(Math.abs(max.z - min.z), Math.abs(max.y - min.y), Math.abs(max.x - min.x)) / 2;
  const targetZ = (radius / Math.sin((50 * (Math.PI / 180)) / 2)) * (100 / coveragePercentage);
  const cameraPosition = new Vector3(boundingBoxCenter.x, boundingBoxCenter.y, targetZ);

  return cameraPosition;
}
