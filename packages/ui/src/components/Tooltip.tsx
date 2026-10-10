import React, { useState } from 'react';
import { colors, radii, spacing, typography, shadows } from '@invoicekit/tokens';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-6px)',
            backgroundColor: colors.neutral[900],
            color: colors.white,
            padding: `${spacing[1]} ${spacing[2.5]}`,
            borderRadius: radii.md,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
            fontFamily: typography.fontFamily.sans,
            whiteSpace: 'nowrap',
            boxShadow: shadows.md,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
