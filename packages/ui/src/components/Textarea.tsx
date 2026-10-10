import React, { forwardRef, useId } from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = true,
      disabled,
      id,
      style,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

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
        <textarea
          id={inputId}
          ref={ref}
          disabled={disabled}
          rows={rows}
          style={{
            border: `1px solid ${error ? colors.danger[600] : colors.neutral[300]}`,
            borderRadius: radii.md,
            backgroundColor: disabled ? colors.neutral[100] : colors.white,
            padding: `${spacing[2]} ${spacing[3]}`,
            color: colors.neutral[900],
            fontSize: typography.fontSize.sm,
            fontFamily: typography.fontFamily.sans,
            outline: 'none',
            resize: 'vertical',
            width: '100%',
            cursor: disabled ? 'not-allowed' : 'text',
            ...style,
          }}
          aria-invalid={Boolean(error)}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
