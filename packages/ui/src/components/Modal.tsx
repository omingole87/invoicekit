import React, { useEffect } from 'react';
import { colors, radii, spacing, typography, shadows } from '@invoicekit/tokens';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = '540px',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(3px)',
        padding: spacing[4],
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth,
          backgroundColor: colors.white,
          borderRadius: radii.xl,
          boxShadow: shadows.xl,
          border: `1px solid ${colors.neutral[200]}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.15s ease-out',
        }}
      >
        {(title || description) && (
          <div
            style={{
              padding: `${spacing[5]} ${spacing[6]} ${spacing[4]}`,
              borderBottom: `1px solid ${colors.neutral[100]}`,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {title && (
                <h3
                  style={{
                    margin: 0,
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.neutral[900],
                  }}
                >
                  {title}
                </h3>
              )}
              {description && (
                <p
                  style={{
                    margin: `${spacing[1]} 0 0 0`,
                    fontSize: typography.fontSize.sm,
                    color: colors.neutral[500],
                  }}
                >
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: colors.neutral[400],
                fontSize: typography.fontSize.lg,
                padding: spacing[1],
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        )}

        <div style={{ padding: `${spacing[6]}`, overflowY: 'auto', maxHeight: '75vh' }}>
          {children}
        </div>

        {footer && (
          <div
            style={{
              padding: `${spacing[4]} ${spacing[6]}`,
              backgroundColor: colors.neutral[50],
              borderTop: `1px solid ${colors.neutral[100]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: spacing[3],
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
