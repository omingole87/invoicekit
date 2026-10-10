export * from './tokens';
export * from './contrast';

/**
 * Generates CSS root variables for seamless token consumption in plain CSS / stylesheets
 */
export function generateCssVariables(): string {
  return `
:root {
  --ik-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --ik-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  
  --ik-color-white: #FFFFFF;
  --ik-color-black: #000000;
  
  --ik-neutral-50: #F8FAFC;
  --ik-neutral-100: #F1F5F9;
  --ik-neutral-200: #E2E8F0;
  --ik-neutral-300: #CBD5E1;
  --ik-neutral-400: #94A3B8;
  --ik-neutral-500: #64748B;
  --ik-neutral-600: #475569;
  --ik-neutral-700: #334155;
  --ik-neutral-800: #1E293B;
  --ik-neutral-900: #0F172A;

  --ik-primary-50: #EEF2FF;
  --ik-primary-100: #E0E7FF;
  --ik-primary-500: #6366F1;
  --ik-primary-600: #4F46E5;
  --ik-primary-700: #4338CA;

  --ik-success-50: #ECFDF5;
  --ik-success-100: #D1FAE5;
  --ik-success-600: #059669;
  --ik-success-800: #065F46;

  --ik-warning-50: #FFFBEB;
  --ik-warning-100: #FEF3C7;
  --ik-warning-700: #B45309;
  --ik-warning-800: #92400E;

  --ik-danger-50: #FEF2F2;
  --ik-danger-100: #FEE2E2;
  --ik-danger-600: #DC2626;
  --ik-danger-800: #991B1B;

  --ik-info-50: #F0F9FF;
  --ik-info-100: #E0F2FE;
  --ik-info-700: #0369A1;
  --ik-info-800: #075985;
  
  --ik-radius-sm: 4px;
  --ik-radius-md: 6px;
  --ik-radius-lg: 8px;
  --ik-radius-xl: 12px;
  --ik-radius-full: 9999px;
}
  `.trim();
}
