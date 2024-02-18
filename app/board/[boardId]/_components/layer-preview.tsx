'use client'

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { memo } from "react";
import Rectangle from "./rectangle";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

function LayerPreview({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Rectangle:
      return (
        <Rectangle 
          id={id}
          layer={layer} 
          onLayerPointerDown={onLayerPointerDown} 
          selectionColor={selectionColor} />
      )
  
    default:
      console.warn('Unknown layer type');
      
      return null;
  }
}

export default memo(LayerPreview);