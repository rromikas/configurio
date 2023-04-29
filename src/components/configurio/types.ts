import { MeshStandardMaterial } from "three";

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
  targetIndexes: number[];
  material?: MeshStandardMaterial;
  color?: string;
}

export interface NodeCustomizer {
  id: string;
  name: string;
  color: Customizer;
  material: Customizer;
  targetIndexes: number[];
}

export interface ConfiguratorOptions {
  customizers: NodeCustomizer[];
  groups: NodeCustomizer[];
  initialCameraPosition?: [number, number, number];
  initialSelections?: Selection[];
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

export interface Selection {
  id: string;
  color?: number;
  material?: number;
}
