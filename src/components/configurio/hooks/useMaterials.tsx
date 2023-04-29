import Material from "../components/material";
import React, { Suspense, useMemo, useState } from "react";
import { MeshStandardMaterial } from "three";
import { AppliableEffect, ConfiguratorOptions } from "../types";
import { Selection } from "../types";

export const useMaterials = ({
  selections,
  customizers,
  groups,
}: {
  selections: Selection[];
  customizers?: ConfiguratorOptions["customizers"];
  groups?: ConfiguratorOptions["groups"];
}) => {
  const [materialsMap, setMaterialsMap] = useState<{ [id: string]: MeshStandardMaterial }>({});
  const materialsArr = useMemo(() => {
    if (!customizers || !groups) return [];
    const allCustomizerNodes = [...customizers, ...groups];
    return selections
      .filter((selection) => allCustomizerNodes.find((x) => x.id === selection.id))
      .map((selection) => {
        const customizerNode = allCustomizerNodes.find((x) => x.id === selection.id)!;
        const targetIndexes = customizerNode.targetIndexes;
        const materialIndex = selection.material;
        const material = materialIndex != null ? customizerNode.material.options[materialIndex].value : undefined;
        const colorIndex = selection.color;
        const color = colorIndex != null ? customizerNode.color.options[colorIndex].value : undefined;
        return { id: selection.id, color, material, targetIndexes };
      }) as { id: string; targetIndexes: number[]; color?: string; material?: string }[];
  }, [selections, customizers, groups]);

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
                  [material.id]: Object.values(model.materials)[0] as MeshStandardMaterial,
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
        targetIndexes: m.targetIndexes,
        material: m.material ? materialsMap[m.id] : undefined,
        color: m.color,
      };
    }) as AppliableEffect[];
  }, [materialsArr, materialsMap]);

  const returnObj = useMemo(() => {
    return { materialsJsx, materials };
  }, [materials, materialsJsx]);

  return returnObj;
};
