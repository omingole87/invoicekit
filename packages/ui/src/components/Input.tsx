import React, { forwardRef, useId } from 'react';
import { colors, radii, spacing, typography, shadows } from '@invoicekit/tokens';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      prefix,
      suffix,
      fullWidth = true,
      size = 'md',
      disabled,
      id,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const sizeStyles = {
      sm: { height: '32px', fontSize: typography.fontSize.xs, padding: `0 ${spacing[2.5]}` },
      md: { height: '40px', fontSize: typography.fontSize.sm, padding: `0 ${spacing[3]}` },
      lg: { height: '48px', fontSize: typography.fontSize.base, padding: `0 ${spacing[4]}` },
    };

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: spacing[1.5],
      width: fullWidth ? '100%' : 'auto',
      fontFamily: typography.fontFamily.sans,
    };

    const inputWrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      border: `1px solid ${error ? colors.danger[600] : colors.neutral[300]}`,
      borderRadius: radii.md,
      backgroundColor: disabled ? colors.neutral[100] : colors.white,
      transition: 'border-color 150ms ease, box-shadow 150ms ease',
      overflow: 'hidden',
      ...sizeStyles[size],
    };

    const inputElementStyle: React.CSSProperties = {
      border: 'none',
      outline: 'none',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      color: colors.neutral[900],
      fontFamily: typography.fontFamily.sans,
      fontSize: 'inherit',
      cursor: disabled ? 'not-allowed' : 'text',
      ...style,
    };

    return (
      <div style={containerStyle}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: error ? colors.danger[700] : colors.neutral[700],
            }}
          >
            {label}
          </label>
        )}
        <div style={inputWrapperStyle}>
          {prefix && (
            <span style={{ marginRight: spacing[2], color: colors.neutral[500], display: 'flex', alignItems: 'center' }}>
              {prefix}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            style={inputElementStyle}
            aria-invalid={Boolean(error)}
            {...props}
          />
          {suffix && (
            <span style={{ marginLeft: spacing[2], color: colors.neutral[500], display: 'flex', alignItems: 'center' }}>
              {suffix}
            </span>
          )}
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

Input.displayName = 'Input';
