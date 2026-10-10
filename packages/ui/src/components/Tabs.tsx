import React, { createContext, useContext } from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (val: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, value, onValueChange, children }) => {
  const [internalTab, setInternalTab] = React.useState(defaultValue);
  const activeTab = value !== undefined ? value : internalTab;

  const setActiveTab = (val: string) => {
    if (value === undefined) setInternalTab(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style, children, ...props }) => (
  <div
    role="tablist"
    style={{
      display: 'inline-flex',
      backgroundColor: colors.neutral[100],
      padding: spacing[1],
      borderRadius: radii.lg,
      gap: spacing[1],
      width: 'fit-content',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, icon, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => context.setActiveTab(value)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing[2],
        padding: `${spacing[2]} ${spacing[4]}`,
        borderRadius: radii.md,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        fontFamily: typography.fontFamily.sans,
        border: 'none',
        cursor: 'pointer',
        backgroundColor: isActive ? colors.white : 'transparent',
        color: isActive ? colors.neutral[900] : colors.neutral[600],
        boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 120ms ease',
      }}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return <div role="tabpanel" style={{ marginTop: spacing[4], width: '100%' }}>{children}</div>;
};
