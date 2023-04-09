import Material from "../components/material";
import React, { Suspense, useMemo, useState } from "react";
import { MeshStandardMaterial } from "three";
import { AppliableEffect, ConfiguratorOptions } from "../types";
import { Selections } from "./useSelections";

export const useMaterials = ({
  selections,
  customizers,
}: {
  selections: Selections;
  customizers?: ConfiguratorOptions["customizers"];
}) => {
  const [materialsMap, setMaterialsMap] = useState<{ [targetIndex: number]: MeshStandardMaterial }>({});
  const materialsArr = useMemo(() => {
    if (!customizers) return [];
    return Object.keys(selections).map((key) => {
      const targetIndex = +key;
      const materialIndex = selections[targetIndex]?.material;
      const material = materialIndex != null ? customizers[targetIndex]?.material.options[materialIndex].value : undefined;
      const colorIndex = selections[targetIndex]?.color;
      const color = colorIndex != null ? customizers[targetIndex]?.color.options[colorIndex].value : undefined;
      return { color, material, targetIndex };
    }) as { targetIndex: number; color?: string; material?: string }[];
  }, [selections, customizers]);

  const materialsJsx = useMemo(() => {
    return (
      <Suspense>
        {materialsArr.map((material, i) =>
          !material.material ? null : (
            <Material
              key={material.material + i}
              fillPercentage={100}
              url={material.material}
              onLoad={(model) => {
                setMaterialsMap((prev) => ({
                  ...prev,
                  [material.targetIndex]: Object.values(model.materials)[0] as MeshStandardMaterial,
                }));
              }}
            />
          )
        )}
      </Suspense>
    );
  }, [materialsArr]);

  const materials = useMemo(() => {
    return materialsArr.map((m) => {
      return {
        targetIndex: m.targetIndex,
        material: m.material ? materialsMap[m.targetIndex] : undefined,
        color: m.color,
      };
    }) as AppliableEffect[];
  }, [materialsArr, materialsMap]);

  const returnObj = useMemo(() => {
    return { materialsJsx, materials };
  }, [materials, materialsJsx]);

  return returnObj;
};
