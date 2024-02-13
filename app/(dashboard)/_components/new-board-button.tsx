'use client'

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export default function NewBoardButton({ orgId, disabled }: NewBoardButtonProps) {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  
  const onClick = () => {
    mutate({
      title: 'Untitled',
      orgId
    }).then((id) => {
      toast.success('Board created');
      router.push(`/board/${id}`);
    }).catch(() => {
      toast.error('Failed to create board');
    })
  };

  return (
    <button disabled={pending || disabled} onClick={onClick} className={
      cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
        (pending || disabled) && 'opacity-75 bg-blue-600 cursor-not-allowed'
      )
    }>
      { 
        pending ? (
        <span className='flex gap-2 text-white align-items-center'>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Please wait</span>
        </span>
        ) : (
          <>
            <></>
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-white text-sm font-light">New Board</p>
          </>
        )
      }
    </button>
  )
}