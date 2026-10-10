import React, { forwardRef } from 'react';
import { Input, InputProps } from './Input';

export interface DatePickerProps extends Omit<InputProps, 'type' | 'prefix'> {
  icon?: React.ReactNode;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ icon = '📅', ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="date"
        prefix={<span style={{ fontSize: '0.875rem' }}>{icon}</span>}
        {...props}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';
