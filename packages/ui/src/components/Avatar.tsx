import React from 'react';
import { colors, radii, typography } from '@invoicekit/tokens';

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'md' }) => {
  const sizeMap = {
    sm: { size: '32px', font: typography.fontSize.xs },
    md: { size: '40px', font: typography.fontSize.sm },
    lg: { size: '48px', font: typography.fontSize.base },
  };

  const { size: dim, font } = sizeMap[size];

  const getInitials = (str?: string) => {
    if (!str) return '?';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return str.slice(0, 2).toUpperCase();
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        style={{
          width: dim,
          height: dim,
          borderRadius: radii.full,
          objectFit: 'cover',
          border: `1px solid ${colors.neutral[200]}`,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: dim,
        height: dim,
        borderRadius: radii.full,
        backgroundColor: colors.primary[100],
        color: colors.primary[700],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: font,
        fontWeight: typography.fontWeight.semibold,
        fontFamily: typography.fontFamily.sans,
        userSelect: 'none',
      }}
    >
      {getInitials(name)}
    </div>
  );
};
