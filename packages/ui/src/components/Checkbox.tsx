import React, { forwardRef, useId } from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, disabled, id, style, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
      <label
        htmlFor={checkboxId}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: spacing[2.5],
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontFamily: typography.fontFamily.sans,
          userSelect: 'none',
        }}
      >
        <input
          id={checkboxId}
          ref={ref}
          type="checkbox"
          disabled={disabled}
          style={{
            width: '16px',
            height: '16px',
            borderRadius: radii.sm,
            accentColor: colors.primary[600],
            cursor: disabled ? 'not-allowed' : 'pointer',
            ...style,
          }}
          {...props}
        />
        {label && (
          <span
            style={{
              fontSize: typography.fontSize.sm,
              color: disabled ? colors.neutral[400] : colors.neutral[800],
            }}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
