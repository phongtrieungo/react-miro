import Canvas from "./_components/canvas";

interface BoardIdPageProps {
  params: {
    boardId: string
  };
}

export default function BoardIdPage({ params }: BoardIdPageProps) {
  return (
    <Canvas boardId={params.boardId} />
  )
}