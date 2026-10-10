import React from 'react';
import { colors, spacing, typography } from '@invoicekit/tokens';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', label }) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        style={{
          width: '1px',
          alignSelf: 'stretch',
          backgroundColor: colors.neutral[200],
          margin: `0 ${spacing[2]}`,
        }}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          margin: `${spacing[4]} 0`,
        }}
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: colors.neutral[200] }} />
        <span
          style={{
            padding: `0 ${spacing[3]}`,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
            color: colors.neutral[500],
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontFamily: typography.fontFamily.sans,
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: colors.neutral[200] }} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      style={{
        width: '100%',
        height: '1px',
        backgroundColor: colors.neutral[200],
        margin: `${spacing[4]} 0`,
      }}
    />
  );
};
