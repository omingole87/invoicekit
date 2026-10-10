import React from 'react';
import { colors, radii, spacing, typography, shadows } from '@invoicekit/tokens';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'flat';
}

export const Card: React.FC<CardProps> = ({ variant = 'outlined', style, children, ...props }) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    elevated: {
      backgroundColor: colors.white,
      border: `1px solid ${colors.neutral[200]}`,
      boxShadow: shadows.md,
    },
    outlined: {
      backgroundColor: colors.white,
      border: `1px solid ${colors.neutral[200]}`,
      boxShadow: shadows.sm,
    },
    flat: {
      backgroundColor: colors.neutral[50],
      border: 'none',
      boxShadow: shadows.none,
    },
  };

  return (
    <div
      style={{
        borderRadius: radii.xl,
        overflow: 'hidden',
        fontFamily: typography.fontFamily.sans,
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style, children, ...props }) => (
  <div
    style={{
      padding: `${spacing[5]} ${spacing[6]} ${spacing[4]}`,
      borderBottom: `1px solid ${colors.neutral[100]}`,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ style, children, ...props }) => (
  <h3
    style={{
      margin: 0,
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      color: colors.neutral[900],
      ...style,
    }}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ style, children, ...props }) => (
  <p
    style={{
      margin: 0,
      fontSize: typography.fontSize.sm,
      color: colors.neutral[500],
      ...style,
    }}
    {...props}
  >
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style, children, ...props }) => (
  <div
    style={{
      padding: `${spacing[6]}`,
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style, children, ...props }) => (
  <div
    style={{
      padding: `${spacing[4]} ${spacing[6]}`,
      backgroundColor: colors.neutral[50],
      borderTop: `1px solid ${colors.neutral[100]}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: spacing[3],
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);
