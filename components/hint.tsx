import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger  
} from '@/components/ui/tooltip';

export interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
}

export default function Hint({ children, label, align, alignOffset, side, sideOffset }: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          { children }
        </TooltipTrigger>
        <TooltipContent className='text-white bg-black border-black' 
          side={side} 
          align={align} 
          alignOffset={alignOffset} 
          sideOffset={sideOffset}>
          <p className='font-semibold capitalize'>{ label }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

