import React from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, disabled }) => {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[2.5],
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: typography.fontFamily.sans,
        userSelect: 'none',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <div
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          width: '36px',
          height: '20px',
          backgroundColor: checked ? colors.primary[600] : colors.neutral[300],
          borderRadius: radii.full,
          position: 'relative',
          transition: 'background-color 150ms ease',
        }}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            backgroundColor: colors.white,
            borderRadius: radii.full,
            position: 'absolute',
            top: '2px',
            left: checked ? '18px' : '2px',
            transition: 'left 150ms ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        />
      </div>
      {label && (
        <span style={{ fontSize: typography.fontSize.sm, color: colors.neutral[800] }}>
          {label}
        </span>
      )}
    </label>
  );
};
