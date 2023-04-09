import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//Hook returns scene which could be rendered multiple times on the screen

type Nodes = { [key: number]: Mesh };

export const useModel = ({ url }: { url: string }) => {
  const model = useLoader(GLTFLoader, url);
  const scene = useMemo(() => model.scene.clone(), [model]);
  const { nodes, clonedNodes } = useMemo(() => {
    let nodes: Nodes = {};
    let clonedNodes: Nodes = {};
    scene.traverse((obj) => {
      if (obj.type === "Mesh") {
        nodes[obj.id] = obj as Mesh;
        clonedNodes[obj.id] = (obj as Mesh).clone(true);
      }
    });
    return { nodes, clonedNodes };
  }, [scene]);

  const returnObj = useMemo(() => ({ scene, nodes, clonedNodes, materials: model.materials }), [scene]);

  return returnObj;
};
