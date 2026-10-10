import React from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${spacing[12]} ${spacing[6]}`,
        textAlign: 'center',
        borderRadius: radii.xl,
        border: `2px dashed ${colors.neutral[200]}`,
        backgroundColor: colors.neutral[50],
        fontFamily: typography.fontFamily.sans,
      }}
    >
      {icon && (
        <div
          style={{
            fontSize: '2.5rem',
            marginBottom: spacing[3],
            color: colors.neutral[400],
          }}
        >
          {icon}
        </div>
      )}
      <h4
        style={{
          margin: 0,
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: colors.neutral[900],
        }}
      >
        {title}
      </h4>
      <p
        style={{
          margin: `${spacing[1.5]} 0 ${action ? spacing[5] : 0} 0`,
          fontSize: typography.fontSize.sm,
          color: colors.neutral[500],
          maxWidth: '380px',
        }}
      >
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};
