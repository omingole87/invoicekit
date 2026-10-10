import React, { useState, useRef, useEffect } from 'react';
import { colors, radii, spacing, typography, shadows } from '@invoicekit/tokens';

export interface DropdownMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: 'left' | 'right';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: '100%',
            [align === 'right' ? 'right' : 'left']: 0,
            marginTop: spacing[1],
            minWidth: '180px',
            backgroundColor: colors.white,
            borderRadius: radii.lg,
            border: `1px solid ${colors.neutral[200]}`,
            boxShadow: shadows.lg,
            padding: spacing[1],
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2.5],
                width: '100%',
                padding: `${spacing[2]} ${spacing[3]}`,
                border: 'none',
                backgroundColor: 'transparent',
                borderRadius: radii.md,
                fontSize: typography.fontSize.sm,
                color: item.danger ? colors.danger[700] : colors.neutral[700],
                fontFamily: typography.fontFamily.sans,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                opacity: item.disabled ? 0.5 : 1,
                transition: 'background-color 100ms ease',
              }}
              onMouseEnter={(e) => {
                if (!item.disabled) {
                  e.currentTarget.style.backgroundColor = item.danger ? colors.danger[50] : colors.neutral[100];
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {item.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
