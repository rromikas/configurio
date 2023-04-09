import { useMemo } from "react";
import { useConfigurator } from "./useConfigurator";
import { useSelections } from "./useSelections";
import { useMaterials } from "./useMaterials";
import { useModelJsx } from "./useModelJsx";

export const useConfigurio = (configuratorId: string) => {
  const configurator = useConfigurator(configuratorId);
  const customizers = configurator?.options.customizers;
  const { selections, options } = useSelections(configurator);
  const { materials, materialsJsx } = useMaterials({ selections, customizers });
  const modelViewer = useModelJsx({
    materialsJsx,
    url: configurator?.model_url ?? "",
    materials,
    disableHover: true,
    initialCameraPosition: configurator?.options.initialCameraPosition,
  });

  const returnObj = useMemo(() => {
    return { modelViewer, options, selections };
  }, [modelViewer, options, selections]);

  return returnObj;
};
