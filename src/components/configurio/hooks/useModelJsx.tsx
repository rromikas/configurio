import Model from "../model";
import React, { ComponentProps, ReactElement, useMemo } from "react";

interface ModelOptions extends Omit<ComponentProps<typeof Model>, "url"> {
  materialsJsx: ReactElement;
  url: string | undefined;
}

export const useModelJsx = ({ materialsJsx, url, ...modelProps }: ModelOptions) => {
  const modelJsx = useMemo(() => {
    return !url ? null : (
      <>
        <div style={{ display: "none" }}>{materialsJsx}</div>
        <Model url={url} {...modelProps}></Model>
      </>
    );
  }, [materialsJsx, url, modelProps]);

  return modelJsx;
};
