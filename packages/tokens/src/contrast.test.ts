import { describe, it, expect } from 'vitest';
import { evaluateContrast, defaultComponentTokenPairs } from './contrast';

describe('WCAG AA Accessibility Contrast Compliance', () => {
  it('should verify all default token pairs meet WCAG AA normal text contrast (>= 4.5:1)', () => {
    for (const pair of defaultComponentTokenPairs) {
      const result = evaluateContrast(pair.fg, pair.bg, pair.name);
      
      expect(
        result.wcagAA,
        `Expected pair "${pair.name}" (${pair.fg} on ${pair.bg}) to meet WCAG AA (>= 4.5:1), got ${result.ratioFormatted}`
      ).toBe(true);
    }
  });

  it('calculates correct contrast ratio for pure black on pure white (21:1)', () => {
    const result = evaluateContrast('#000000', '#FFFFFF');
    expect(result.ratio).toBe(21);
    expect(result.wcagAAA).toBe(true);
  });

  it('rejects failing contrast pairs (< 4.5:1)', () => {
    // Light gray text on white background should fail
    const result = evaluateContrast('#94A3B8', '#FFFFFF');
    expect(result.wcagAA).toBe(false);
  });
});
