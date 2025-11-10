import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onValueChange, min, max, step = 1, disabled = false, className }, ref) => {
    return (
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className={cn(
          'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
      />
    );
  }
);
Slider.displayName = 'Slider';
