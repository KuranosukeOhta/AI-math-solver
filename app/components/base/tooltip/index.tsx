'use client'
import type { FC } from 'react'
import React from 'react'
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type TooltipProps = {
  selector: string
  content?: string
  htmlContent?: React.ReactNode
  className?: string
  position?: 'top' | 'right' | 'bottom' | 'left'
  clickable?: boolean
  children: React.ReactNode
}

const Tooltip: FC<TooltipProps> = ({
  selector,
  content,
  position = 'top',
  children,
  htmlContent,
  className,
}) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>
        <TooltipContent side={position as "top" | "right" | "bottom" | "left"} className={cn(className)}>
          {content || htmlContent}
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  )
}

export default Tooltip
