import React from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft' | 'cancelled';

export interface StatusPillProps {
  status: InvoiceStatus;
  label?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, label }) => {
  const config: Record<InvoiceStatus, { text: string; bg: string; color: string; dot: string }> = {
    paid: {
      text: 'Paid',
      bg: colors.success[50],
      color: colors.success[800],
      dot: colors.success[600],
    },
    pending: {
      text: 'Pending',
      bg: colors.warning[50],
      color: colors.warning[900],
      dot: colors.warning[600],
    },
    overdue: {
      text: 'Overdue',
      bg: colors.danger[50],
      color: colors.danger[800],
      dot: colors.danger[600],
    },
    draft: {
      text: 'Draft',
      bg: colors.neutral[100],
      color: colors.neutral[700],
      dot: colors.neutral[500],
    },
    cancelled: {
      text: 'Cancelled',
      bg: colors.neutral[100],
      color: colors.neutral[600],
      dot: colors.neutral[400],
    },
  };

  const item = config[status] || config.draft;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[2],
        padding: `${spacing[1]} ${spacing[3]}`,
        borderRadius: radii.full,
        backgroundColor: item.bg,
        color: item.color,
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold,
        textTransform: 'capitalize',
        fontFamily: typography.fontFamily.sans,
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: item.dot,
        }}
      />
      {label || item.text}
    </span>
  );
};
