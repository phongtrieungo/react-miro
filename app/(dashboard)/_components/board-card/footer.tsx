import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

interface BoardCardFooterProps {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function BoardCardFooter({ authorLabel, createdAtLabel, disabled, isFavorite, onClick, title }: BoardCardFooterProps) {
  return (
    <section className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button 
        disabled={disabled} 
        onClick={onClick} 
        className={cn('opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground text-blue-600', disabled && 'cursor-not-allowed opacity-75')}>
        <Star className={cn('h-4 w-4', isFavorite && 'fill-blue-600 text-blue-600')} />
      </button>
    </section>
  )
}