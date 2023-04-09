import { MeshStandardMaterial } from "three";
import { Selections } from "./hooks/useSelections";

export interface CustomizerOption {
  value: string;
  price: number;
  id: string;
  label: string;
}

export interface Customizer {
  label: string;
  targetIndex: number;
  options: CustomizerOption[];
  type: "color" | "material";
}

export interface RenderableCustomizerOption {
  label: string;
  select: () => void;
  isSelected: boolean;
  value: string;
}

export interface RenderableCustomizer {
  label: string;
  options: RenderableCustomizerOption[];
  type: "color" | "material";
}

export interface AppliableEffect {
  targetIndex: number;
  material?: MeshStandardMaterial;
  color?: string;
}

export interface ConfiguratorOptions {
  customizers: { [targetIndex: number]: { color: Customizer; material: Customizer } | undefined };
  initialCameraPosition?: [number, number, number];
  initialSelections?: Selections;
}

export interface Configurator {
  id?: number;
  options: ConfiguratorOptions;
  model_url: string;
}

export type AssetType = "model" | "material";

export interface Asset {
  id?: number;
  type: AssetType;
  url: string;
}
