import { cn } from '@/lib/utils'
import { Toggle } from '@radix-ui/react-toggle'
import React from 'react'

interface TiptapButtonProps {
  component: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const TiptapButton: React.FC<TiptapButtonProps> = ({component, onClick, className}) => {
    
  return (
    <Toggle onClick={onClick} className={cn('px-1 py-0.5 cursor-pointer hover:bg-[hsl(120,10%,30%)] rounded-[4px]', className)}>
        {component}
    </Toggle>
  )
}

export default TiptapButton