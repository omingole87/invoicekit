import React, { forwardRef, useId } from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      fullWidth = true,
      disabled,
      id,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: spacing[1.5],
          width: fullWidth ? '100%' : 'auto',
          fontFamily: typography.fontFamily.sans,
        }}
      >
        {label && (
          <label
            htmlFor={selectId}
            style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: error ? colors.danger[700] : colors.neutral[700],
            }}
          >
            {label}
          </label>
        )}
        <div style={{ position: 'relative', width: '100%' }}>
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            style={{
              width: '100%',
              height: '40px',
              padding: `0 ${spacing[8]} 0 ${spacing[3]}`,
              border: `1px solid ${error ? colors.danger[600] : colors.neutral[300]}`,
              borderRadius: radii.md,
              backgroundColor: disabled ? colors.neutral[100] : colors.white,
              color: colors.neutral[900],
              fontSize: typography.fontSize.sm,
              fontFamily: typography.fontFamily.sans,
              appearance: 'none',
              outline: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              ...style,
            }}
            aria-invalid={Boolean(error)}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div
            style={{
              position: 'absolute',
              right: spacing[3],
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: colors.neutral[500],
              fontSize: typography.fontSize.xs,
            }}
          >
            ▼
          </div>
        </div>
        {error ? (
          <span style={{ fontSize: typography.fontSize.xs, color: colors.danger[700] }}>
            {error}
          </span>
        ) : helperText ? (
          <span style={{ fontSize: typography.fontSize.xs, color: colors.neutral[500] }}>
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
