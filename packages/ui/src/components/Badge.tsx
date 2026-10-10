import React from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  style,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, { bg: string; color: string; dotColor: string; border: string }> = {
    success: {
      bg: colors.success[100],
      color: colors.success[800],
      dotColor: colors.success[600],
      border: colors.success[200],
    },
    warning: {
      bg: colors.warning[100],
      color: colors.warning[900],
      dotColor: colors.warning[600],
      border: colors.warning[200],
    },
    danger: {
      bg: colors.danger[100],
      color: colors.danger[800],
      dotColor: colors.danger[600],
      border: colors.danger[200],
    },
    info: {
      bg: colors.info[100],
      color: colors.info[800],
      dotColor: colors.info[600],
      border: colors.info[200],
    },
    neutral: {
      bg: colors.neutral[100],
      color: colors.neutral[800],
      dotColor: colors.neutral[500],
      border: colors.neutral[200],
    },
  };

  const isSmall = size === 'sm';
  const { bg, color, dotColor, border } = variantStyles[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[1.5],
        padding: isSmall ? `${spacing[0.5]} ${spacing[2]}` : `${spacing[1]} ${spacing[2.5]}`,
        borderRadius: radii.full,
        fontSize: isSmall ? typography.fontSize.xs : typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        backgroundColor: bg,
        color: color,
        border: `1px solid ${border}`,
        lineHeight: 1,
        fontFamily: typography.fontFamily.sans,
        ...style,
      }}
      {...props}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: dotColor,
            display: 'inline-block',
          }}
        />
      )}
      {children}
    </span>
  );
};
