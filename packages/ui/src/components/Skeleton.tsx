import React from 'react';
import { colors, radii } from '@invoicekit/tokens';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  circle = false,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: circle ? radii.full : radii.md,
        backgroundColor: colors.neutral[200],
        animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ...style,
      }}
      {...props}
    />
  );
};
