import React from "react";
import { FunctionComponent } from "react";
import { RenderableCustomizer, RenderableCustomizerOption } from "../types";
import Material from "./material";

interface OptionProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  option: RenderableCustomizerOption;
  parentOption: RenderableCustomizer;
}

const Option: FunctionComponent<OptionProps> = ({ option, parentOption, style, onClick, ...divProps }) => {
  return (
    <div
      {...divProps}
      onClick={option.select}
      style={{
        ...style,
        width: 36,
        height: 36,
        cursor: "pointer",
        border: `2px solid transparent`,
        borderRadius: "9999px",
        boxShadow: option.isSelected ? "0px 0px 0px 2px rgb(0,0,0)" : "unset",
      }}
    >
      {parentOption.type === "color" ? (
        <div style={{ width: "100%", height: "100%", borderRadius: "9999px", backgroundColor: option.value }}></div>
      ) : (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Material url={option.value} fillPercentage={100} />
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}></div>
        </div>
      )}
    </div>
  );
};

export default Option;
