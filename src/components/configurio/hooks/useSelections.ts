import { startTransition, useEffect, useMemo, useState } from "react";
import { Configurator, RenderableCustomizer } from "../types";

export type Selections = {
  [targetIndex: number]: { color?: number; material?: number } | undefined;
};

export const useSelections = (configurator?: Configurator) => {
  const customizers = configurator?.options.customizers;
  const [selections, setSelections] = useState<Selections>({});
  const initialSelections = configurator?.options.initialSelections;

  useEffect(() => {
    if (initialSelections) {
      setSelections(initialSelections);
    }
  }, [initialSelections]);

  const select = (targetIndex: number, type: "color" | "material", optionIndex: number | undefined) => {
    startTransition(() => {
      setSelections((prev) => {
        return { ...prev, [targetIndex]: { ...(prev[targetIndex] ?? {}), [type]: optionIndex } };
      });
    });
  };

  const options = useMemo(() => {
    if (!customizers) return [];
    return Object.keys(customizers)
      .map((key) => {
        let arr: RenderableCustomizer[] = [];
        const targetIndex = +key;
        const colorCustomizer = customizers[targetIndex]?.color;
        if (colorCustomizer?.options.length) {
          arr.push({
            ...colorCustomizer,
            type: "color",
            options: colorCustomizer.options.map((option, i) => {
              const isSelected = i === selections[targetIndex]?.color;
              return {
                ...option,
                isSelected,
                select: () => select(targetIndex, "color", !isSelected ? i : undefined),
              };
            }),
          });
        }
        const materialCustomizer = customizers[targetIndex]?.material;
        if (materialCustomizer?.options.length) {
          arr.push({
            ...materialCustomizer,
            type: "material",
            options: materialCustomizer.options.map((option, i) => {
              const isSelected = i === selections[targetIndex]?.material;
              return {
                ...option,
                isSelected,
                select: () => {
                  select(targetIndex, "material", !isSelected ? i : undefined);
                },
              };
            }),
          });
        }
        return arr;
      })
      .reduce((a, b) => [...a, ...b], [] as RenderableCustomizer[]);
  }, [selections, customizers]);

  return { select, selections, options };
};
