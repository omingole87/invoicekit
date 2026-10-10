import React, { forwardRef } from 'react';
import { colors, radii, spacing, typography, shadows } from '@invoicekit/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Size styles
    const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
      sm: {
        padding: `${spacing[1.5]} ${spacing[3]}`,
        fontSize: typography.fontSize.xs,
        height: '32px',
        gap: spacing[1.5],
      },
      md: {
        padding: `${spacing[2]} ${spacing[4]}`,
        fontSize: typography.fontSize.sm,
        height: '40px',
        gap: spacing[2],
      },
      lg: {
        padding: `${spacing[3]} ${spacing[6]}`,
        fontSize: typography.fontSize.base,
        height: '48px',
        gap: spacing[2.5],
      },
    };

    // Variant styles
    const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
      primary: {
        backgroundColor: isDisabled ? colors.neutral[300] : colors.primary[600],
        color: isDisabled ? colors.neutral[600] : colors.white,
        border: '1px solid transparent',
        boxShadow: isDisabled ? shadows.none : shadows.sm,
      },
      secondary: {
        backgroundColor: isDisabled ? colors.neutral[100] : colors.neutral[100],
        color: isDisabled ? colors.neutral[400] : colors.neutral[800],
        border: `1px solid ${colors.neutral[300]}`,
        boxShadow: shadows.none,
      },
      outline: {
        backgroundColor: 'transparent',
        color: isDisabled ? colors.neutral[400] : colors.primary[600],
        border: `1px solid ${isDisabled ? colors.neutral[200] : colors.primary[600]}`,
        boxShadow: shadows.none,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: isDisabled ? colors.neutral[400] : colors.neutral[700],
        border: '1px solid transparent',
        boxShadow: shadows.none,
      },
      danger: {
        backgroundColor: isDisabled ? colors.neutral[300] : colors.danger[600],
        color: isDisabled ? colors.neutral[600] : colors.white,
        border: '1px solid transparent',
        boxShadow: isDisabled ? shadows.none : shadows.sm,
      },
    };

    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radii.md,
      fontFamily: typography.fontFamily.sans,
      fontWeight: typography.fontWeight.medium,
      lineHeight: 1,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      width: fullWidth ? '100%' : 'auto',
      outline: 'none',
      userSelect: 'none',
      position: 'relative',
      textDecoration: 'none',
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={baseStyle}
        {...props}
      >
        {isLoading && (
          <span
            style={{
              width: '14px',
              height: '14px',
              border: `2px solid currentColor`,
              borderRightColor: 'transparent',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin 0.75s linear infinite',
            }}
          />
        )}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
