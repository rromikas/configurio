import React, { FunctionComponent } from "react";
import { useConfigurio } from "./hooks/useConfigurio";
import Option from "./components/option";

interface ConfigurioProps {}

const Configurio: FunctionComponent<ConfigurioProps> = () => {
  const { modelViewer, options } = useConfigurio("6");

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", fontFamily: "Poppins" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');`}</style>
      <div style={{ flexGrow: 1 }}>{modelViewer}</div>
      <div style={{ display: "flex", padding: "28px", flexShrink: 0, overflow: "auto" }}>
        <div style={{ margin: "auto 0", padding: "0px 2px" }}>
          {options.map((c, i) => (
            <div key={`customizer-${i}`} style={{ marginBottom: i !== options.length - 1 ? 24 : 0 }}>
              <div style={{ marginBottom: 8 }}>{c.label}</div>
              <div style={{ display: "flex", margin: -4 }}>
                {c.options.map((option, j) => (
                  <div key={`cus-${i}-opt-${j}`} style={{ padding: 4 }}>
                    <Option option={option} parentOption={c} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Configurio;
