import React from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  tone?: AlertTone;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ tone = 'info', title, children, icon }) => {
  const configs: Record<AlertTone, { bg: string; border: string; text: string; defaultIcon: string }> = {
    info: { bg: colors.info[50], border: colors.info[200], text: colors.info[800], defaultIcon: 'ℹ' },
    success: { bg: colors.success[50], border: colors.success[200], text: colors.success[800], defaultIcon: '✓' },
    warning: { bg: colors.warning[50], border: colors.warning[200], text: colors.warning[900], defaultIcon: '⚠' },
    danger: { bg: colors.danger[50], border: colors.danger[200], text: colors.danger[800], defaultIcon: '✕' },
  };

  const current = configs[tone];

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing[3],
        padding: `${spacing[3.5]} ${spacing[4]}`,
        borderRadius: radii.lg,
        backgroundColor: current.bg,
        border: `1px solid ${current.border}`,
        color: current.text,
        fontFamily: typography.fontFamily.sans,
      }}
    >
      <div style={{ fontSize: typography.fontSize.base, lineHeight: 1, marginTop: '2px' }}>
        {icon || current.defaultIcon}
      </div>
      <div style={{ flex: 1 }}>
        {title && (
          <h5 style={{ margin: `0 0 ${spacing[1]} 0`, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>
            {title}
          </h5>
        )}
        <div style={{ fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal }}>
          {children}
        </div>
      </div>
    </div>
  );
};
