import React from 'react';
import { colors, radii, spacing, typography } from '@invoicekit/tokens';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
}

export const Table: React.FC<TableProps> = ({ striped, style, children, ...props }) => (
  <div style={{ width: '100%', overflowX: 'auto', borderRadius: radii.md, border: `1px solid ${colors.neutral[200]}` }}>
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: typography.fontFamily.sans,
        fontSize: typography.fontSize.sm,
        textAlign: 'left',
        ...style,
      }}
      {...props}
    >
      {children}
    </table>
  </div>
);

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ style, children, ...props }) => (
  <thead
    style={{
      backgroundColor: colors.neutral[50],
      borderBottom: `1px solid ${colors.neutral[200]}`,
      ...style,
    }}
    {...props}
  >
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ style, children, ...props }) => (
  <tbody style={style} {...props}>
    {children}
  </tbody>
);

export const TableFooter: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ style, children, ...props }) => (
  <tfoot
    style={{
      backgroundColor: colors.neutral[50],
      borderTop: `2px solid ${colors.neutral[200]}`,
      fontWeight: typography.fontWeight.semibold,
      ...style,
    }}
    {...props}
  >
    {children}
  </tfoot>
);

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isClickable?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({ isClickable, style, children, ...props }) => (
  <tr
    style={{
      borderBottom: `1px solid ${colors.neutral[200]}`,
      cursor: isClickable ? 'pointer' : 'default',
      transition: 'background-color 120ms ease',
      ...style,
    }}
    {...props}
  >
    {children}
  </tr>
);

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
}

export const TableHead: React.FC<TableHeadProps> = ({ align = 'left', style, children, ...props }) => (
  <th
    style={{
      padding: `${spacing[3]} ${spacing[4]}`,
      fontWeight: typography.fontWeight.semibold,
      color: colors.neutral[700],
      fontSize: typography.fontSize.xs,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      textAlign: align,
      ...style,
    }}
    {...props}
  >
    {children}
  </th>
);

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  mono?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({ align = 'left', mono = false, style, children, ...props }) => (
  <td
    style={{
      padding: `${spacing[3]} ${spacing[4]}`,
      color: colors.neutral[900],
      textAlign: align,
      fontFamily: mono ? typography.fontFamily.mono : typography.fontFamily.sans,
      ...style,
    }}
    {...props}
  >
    {children}
  </td>
);
