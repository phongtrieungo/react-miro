import { useSelf, useStorage } from "@/liveblocks.config";
import { Layer, XYWH } from "@/types/canvas";
import { shallow } from "@liveblocks/client";

const boundBox = (layers: Layer[]): XYWH | null => {
  if (!layers.length) {
    return null;
  }

  const [first] = layers;

  let left = first.x;
  let right = left + first.width;
  let top = first.y;
  let bottom = top + first.height;

  layers.forEach(layer => {
    const { x, y, width, height } = layer;
    if (left > x) {
      left = x;
    }

    if (right < x + width) {
      right = x + width;
    }

    if (top > y) {
      top = y;
    }

    if (bottom < y + height) {
      bottom = y + height;
    }
  });

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top
  };
};

export const useSelectionBound = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useStorage((root) => {
    const selectedLayers = selection.map((layerId) => root.layers.get(layerId)!).filter(Boolean);
    return boundBox(selectedLayers)
  }, shallow);
};