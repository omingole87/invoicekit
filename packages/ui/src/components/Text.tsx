import React from 'react';
import { colors, typography } from '@invoicekit/tokens';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-sm' | 'caption' | 'mono';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  as?: React.ElementType;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  weight = 'normal',
  color = colors.neutral[900],
  as,
  style,
  children,
  ...props
}) => {
  const variantMap: Record<TextVariant, { tag: React.ElementType; size: string; defaultWeight: TextWeight; lineHeight: number }> = {
    h1: { tag: 'h1', size: typography.fontSize['4xl'], defaultWeight: 'bold', lineHeight: typography.lineHeight.tight },
    h2: { tag: 'h2', size: typography.fontSize['2xl'], defaultWeight: 'bold', lineHeight: typography.lineHeight.tight },
    h3: { tag: 'h3', size: typography.fontSize.xl, defaultWeight: 'semibold', lineHeight: typography.lineHeight.snug },
    h4: { tag: 'h4', size: typography.fontSize.lg, defaultWeight: 'semibold', lineHeight: typography.lineHeight.snug },
    body: { tag: 'p', size: typography.fontSize.base, defaultWeight: 'normal', lineHeight: typography.lineHeight.normal },
    'body-sm': { tag: 'p', size: typography.fontSize.sm, defaultWeight: 'normal', lineHeight: typography.lineHeight.normal },
    caption: { tag: 'span', size: typography.fontSize.xs, defaultWeight: 'normal', lineHeight: typography.lineHeight.normal },
    mono: { tag: 'code', size: typography.fontSize.sm, defaultWeight: 'normal', lineHeight: typography.lineHeight.normal },
  };

  const config = variantMap[variant];
  const Component = as || config.tag;
  const isMono = variant === 'mono';

  return (
    <Component
      style={{
        margin: 0,
        fontSize: config.size,
        fontWeight: typography.fontWeight[weight || config.defaultWeight],
        lineHeight: config.lineHeight,
        color,
        fontFamily: isMono ? typography.fontFamily.mono : typography.fontFamily.sans,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
