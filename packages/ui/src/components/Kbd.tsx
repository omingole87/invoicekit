import React from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export const Kbd: React.FC<KbdProps> = ({ children, style, ...props }) => {
  return (
    <kbd
      style={{
        display: 'inline-block',
        padding: `${spacing[0.5]} ${spacing[1.5]}`,
        fontSize: typography.fontSize.xs,
        fontFamily: typography.fontFamily.mono,
        fontWeight: typography.fontWeight.medium,
        color: colors.neutral[700],
        backgroundColor: colors.neutral[100],
        border: `1px solid ${colors.neutral[300]}`,
        borderRadius: radii.sm,
        boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
        lineHeight: 1,
        ...style,
      }}
      {...props}
    >
      {children}
    </kbd>
  );
};
