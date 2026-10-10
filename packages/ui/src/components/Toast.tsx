import React, { createContext, useContext, useState, useCallback } from 'react';
import { colors, radii, spacing, typography, shadows } from '@invoicekit/tokens';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: {
    (item: Omit<ToastItem, 'id'>): void;
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (item: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { ...item, id }]);
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const toastMethods = Object.assign(
    (item: Omit<ToastItem, 'id'>) => addToast(item),
    {
      success: (title: string, description?: string) => addToast({ type: 'success', title, description }),
      error: (title: string, description?: string) => addToast({ type: 'error', title, description }),
      warning: (title: string, description?: string) => addToast({ type: 'warning', title, description }),
      info: (title: string, description?: string) => addToast({ type: 'info', title, description }),
    }
  );

  const typeConfig: Record<ToastType, { bg: string; border: string; color: string; icon: string }> = {
    success: { bg: colors.white, border: colors.success[500], color: colors.success[800], icon: '✓' },
    error: { bg: colors.white, border: colors.danger[500], color: colors.danger[800], icon: '✕' },
    warning: { bg: colors.white, border: colors.warning[500], color: colors.warning[900], icon: '!' },
    info: { bg: colors.white, border: colors.info[500], color: colors.info[800], icon: 'ℹ' },
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: spacing[6],
          right: spacing[6],
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[2.5],
          zIndex: 10000,
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => {
          const cfg = typeConfig[t.type];
          return (
            <div
              key={t.id}
              role="alert"
              style={{
                pointerEvents: 'auto',
                backgroundColor: cfg.bg,
                borderLeft: `4px solid ${cfg.border}`,
                borderTop: `1px solid ${colors.neutral[200]}`,
                borderRight: `1px solid ${colors.neutral[200]}`,
                borderBottom: `1px solid ${colors.neutral[200]}`,
                borderRadius: radii.md,
                padding: `${spacing[3]} ${spacing[4]}`,
                boxShadow: shadows.lg,
                minWidth: '280px',
                maxWidth: '380px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing[3],
                fontFamily: typography.fontFamily.sans,
              }}
            >
              <span
                style={{
                  color: cfg.border,
                  fontWeight: 'bold',
                  fontSize: typography.fontSize.base,
                  lineHeight: 1,
                  marginTop: '2px',
                }}
              >
                {cfg.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.sm, color: colors.neutral[900] }}>
                  {t.title}
                </div>
                {t.description && (
                  <div style={{ fontSize: typography.fontSize.xs, color: colors.neutral[500], marginTop: spacing[0.5] }}>
                    {t.description}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.neutral[400],
                  fontSize: typography.fontSize.xs,
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
