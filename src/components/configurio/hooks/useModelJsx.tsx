import Model from "../model";
import React, { ComponentProps, ReactElement, useMemo, useRef } from "react";

interface ModelOptions extends Omit<ComponentProps<typeof Model>, "url"> {
  materialsJsx: ReactElement;
  url: string | undefined;
}

export const useModelJsx = ({ materialsJsx, url, ...modelProps }: ModelOptions) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const results = useMemo(() => {
    return {
      modelViewer: !url ? null : (
        <>
          <div style={{ display: "none" }}>{materialsJsx}</div>
          <Model ref={canvasRef} url={url} {...modelProps}></Model>
        </>
      ),
      canvasRef,
    };
  }, [materialsJsx, url, modelProps]);

  return results;
};
