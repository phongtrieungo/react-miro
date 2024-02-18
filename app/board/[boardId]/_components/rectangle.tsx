import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export default function Rectangle({ id, layer, onLayerPointerDown, selectionColor }: RectangleProps) {
  const { fill, height, type, width, x, y, value } = layer;

  return (
    <rect className="drop-shadow-md"
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
      height={height}
      width={width}
      x={0}
      y={0}
      stroke="transparent"
      strokeWidth={1}
      fill="#000"
      onPointerDown={(e) => onLayerPointerDown(e, id)}
       />
  )
}
