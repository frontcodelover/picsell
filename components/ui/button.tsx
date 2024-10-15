import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/utils/utils';

type Variants = {
  variants: {
    variant: Record<string, string>;
    size: Record<string, string>;
  };
};

type VariantProps<T extends Variants> = {
  variant?: keyof T['variants']['variant'];
  size?: keyof T['variants']['size'];
};

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-white font-semibold transition duration-500',	
        secondary: 'border border-black bg-white text-black hover:bg-black hover:text-white font-semibold transition duration-500',
        linky: 'text-[#003566] bg-transparent underline-offset-2 hover:underline font-semibold transition duration-500',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold transition duration-500',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground font-semibold transition duration-500',
        ghost: 'hover:bg-accent hover:text-accent-foreground font-semibold transition duration-500',
      },
      size: {
        default: 'h-10 px-8 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
