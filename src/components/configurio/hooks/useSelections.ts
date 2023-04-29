import { startTransition, useEffect, useMemo, useState } from "react";
import { Configurator, RenderableCustomizer, Selection } from "../types";

export const useSelections = (configurator?: Configurator) => {
  const customizers = configurator?.options.customizers;
  const groups = configurator?.options.groups;
  const [selections, setSelections] = useState<Selection[]>([]);
  const initialSelections = configurator?.options.initialSelections;

  useEffect(() => {
    if (initialSelections) {
      setSelections(initialSelections);
    }
  }, [initialSelections]);

  const select = (id: string, type: "color" | "material", optionIndex: number | undefined) => {
    startTransition(() => {
      setSelections((prev) => {
        let arr = [...prev];
        const index = arr.findIndex((x) => x.id === id);
        if (index !== -1) {
          arr[index][type] = optionIndex;
        } else {
          arr.push({ id, [type]: optionIndex });
        }
        return arr;
      });
    });
  };

  const options = useMemo(() => {
    if (!customizers || !groups) return [];
    let allCustomizerNodes = [...customizers, ...groups];
    return allCustomizerNodes
      .map((customizerNode) => {
        let arr: RenderableCustomizer[] = [];
        const colorCustomizer = customizerNode.color;
        if (colorCustomizer?.options.length) {
          arr.push({
            ...colorCustomizer,
            type: "color",
            options: colorCustomizer.options.map((option, i) => {
              const isSelected = i === selections.find((x) => x.id === customizerNode.id)?.color;
              return {
                ...option,
                isSelected,
                select: () => select(customizerNode.id, "color", !isSelected ? i : undefined),
              };
            }),
          });
        }
        const materialCustomizer = customizerNode.material;
        if (materialCustomizer?.options.length) {
          arr.push({
            ...materialCustomizer,
            type: "material",
            options: materialCustomizer.options.map((option, i) => {
              const isSelected = i === selections.find((x) => x.id === customizerNode.id)?.material;
              return {
                ...option,
                isSelected,
                select: () => {
                  select(customizerNode.id, "material", !isSelected ? i : undefined);
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
