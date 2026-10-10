/**
 * WCAG 2.1 Relative Luminance and Contrast Ratio Calculators
 * Implements W3C specifications for automated accessibility checks.
 */

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface ContrastResult {
  fg: string;
  bg: string;
  ratio: number;
  ratioFormatted: string;
  wcagAA: boolean;
  wcagAALarge: boolean;
  wcagAAA: boolean;
  wcagAAALarge: boolean;
}

export function parseHex(hex: string): RgbColor {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (cleanHex.length !== 6) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
}

function sRgbToLinear(c: number): number {
  const cNormalized = c / 255;
  return cNormalized <= 0.04045
    ? cNormalized / 12.92
    : Math.pow((cNormalized + 0.055) / 1.055, 2.4);
}

export function getLuminance(hex: string): number {
  const { r, g, b } = parseHex(hex);
  const rLin = sRgbToLinear(r);
  const gLin = sRgbToLinear(g);
  const bLin = sRgbToLinear(b);
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

export function getContrastRatio(fgHex: string, bgHex: string): number {
  const l1 = getLuminance(fgHex);
  const l2 = getLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

export function evaluateContrast(
  fgHex: string,
  bgHex: string,
  pairName?: string
): ContrastResult {
  const ratio = getContrastRatio(fgHex, bgHex);
  return {
    fg: fgHex,
    bg: bgHex,
    ratio,
    ratioFormatted: `${ratio.toFixed(2)}:1`,
    wcagAA: ratio >= 4.5,
    wcagAALarge: ratio >= 3.0,
    wcagAAA: ratio >= 7.0,
    wcagAAALarge: ratio >= 4.5,
  };
}

/**
 * Standard token pairs used across InvoiceKit components
 */
export const defaultComponentTokenPairs = [
  // Primary Buttons & Badges
  { name: 'Button Primary (White on Indigo-600)', fg: '#FFFFFF', bg: '#4F46E5', isLarge: false },
  { name: 'Button Danger (White on Red-600)', fg: '#FFFFFF', bg: '#DC2626', isLarge: false },
  
  // Default Body & Headings
  { name: 'Body Text (Slate-900 on White)', fg: '#0F172A', bg: '#FFFFFF', isLarge: false },
  { name: 'Secondary Text (Slate-600 on White)', fg: '#475569', bg: '#FFFFFF', isLarge: false },
  { name: 'Muted Table Header (Slate-700 on Slate-50)', fg: '#334155', bg: '#F8FAFC', isLarge: false },
  
  // Badges (Text on Tinted Backgrounds)
  { name: 'Badge Paid (Emerald-800 on Emerald-100)', fg: '#065F46', bg: '#D1FAE5', isLarge: false },
  { name: 'Badge Pending (Amber-900 on Amber-100)', fg: '#78350F', bg: '#FEF3C7', isLarge: false },
  { name: 'Badge Overdue (Red-800 on Red-100)', fg: '#991B1B', bg: '#FEE2E2', isLarge: false },
  { name: 'Badge Draft/Info (Sky-800 on Sky-100)', fg: '#075985', bg: '#E0F2FE', isLarge: false },
  
  // Cards & Inputs
  { name: 'Input Text (Slate-900 on White)', fg: '#0F172A', bg: '#FFFFFF', isLarge: false },
  { name: 'Card Surface Text (Slate-800 on Slate-50)', fg: '#1E293B', bg: '#F8FAFC', isLarge: false },
];
