import React, { forwardRef } from 'react';
import { Input, InputProps } from './Input';
import { colors } from '@invoicekit/tokens';

export interface CurrencyInputProps extends Omit<InputProps, 'prefix' | 'type'> {
  currencySymbol?: string;
  currencyCode?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ currencySymbol = '₹', currencyCode = 'INR', style, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="number"
        step="0.01"
        min="0"
        prefix={
          <span style={{ fontWeight: 600, color: colors.neutral[700], fontSize: '0.9375rem' }}>
            {currencySymbol}
          </span>
        }
        suffix={
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.primary[700] }}>
            {currencyCode}
          </span>
        }
        style={{
          fontFamily: 'ui-monospace, monospace',
          textAlign: 'right',
          ...style,
        }}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
