import { Loader } from "lucide-react";
import Info from "./info";
import Participant from "./participants";
import Toolbar from "./toolbar";

export default function CanvasLoading() {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participant.Skeleton />
      <Toolbar.Skeleton />
		</main>
  )
}