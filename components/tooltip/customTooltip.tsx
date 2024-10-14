import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function CustomTooltip({ children, disabled, text }: { children: React.ReactNode; disabled: boolean; text: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {React.Children.only(children)}
        </TooltipTrigger>
        <TooltipContent>
          <p>{disabled && text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CustomTooltip;
