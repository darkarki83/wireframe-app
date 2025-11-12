// Design Tokens - Version 3: Light Fintech Style
// Style: Insurance/Banking UI - Rounded cards, duotone icons, soft purple palette
// Mobile (390×844), Minimalist, Spacious, Premium feel

export const colors = {
  // Base colors
  base: {
    background: '#F7F7FC',
    surface: '#FFFFFF',
    border: '#EEF0F4',
  },

  // Text colors
  text: {
    default: '#000000',
    primary: '#000000',
    secondary: '#6B7280',
    inverse: '#FFFFFF',
  },

  // Primary accent
  primary: {
    main: '#6C63FF',
    hover: '#5850E6',
    light: '#E9E7FF',
    subtle: 'rgba(108, 99, 255, 0.1)',
  },

  // Status colors
  status: {
    success: '#22C55E',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
  },

  // State colors (for pills/badges)
  state: {
    draft: { bg: '#F3F4F6', text: '#6B7280' },
    active: { bg: '#E9E7FF', text: '#6C63FF' },
    inReview: { bg: '#FEF3C7', text: '#D97706' },
    approved: { bg: '#D1FAE5', text: '#059669' },
    funded: { bg: '#DBEAFE', text: '#2563EB' },
    completed: { bg: '#D1FAE5', text: '#10B981' },
    pending: { bg: '#FEF3C7', text: '#F59E0B' },
    dispute: { bg: '#FEE2E2', text: '#DC2626' },
  },
}

export const typography = {
  // Font families - SF Pro / Inter
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Roboto", "Segoe UI", sans-serif',
  },

  // Font sizes - 4 sizes only (senior requirement)
  fontSize: {
    h1: '24px', // Large headings
    h2: '18px', // Section headers
    body: '15px', // Main text, buttons
    caption: '13px', // Small text, labels
  },

  // Font weights - SF Pro / Inter style
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    normal: 1.45,
  },
}

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxxl: '48px',
}

export const borderRadius = {
  sm: '10px', // Inputs
  md: '12px', // Buttons, chips
  lg: '16px', // Cards
  xl: '24px', // Large hero cards/banners
  full: '9999px', // Pills, circular
}

export const shadows = {
  none: 'none',
  sm: '0 2px 8px rgba(17, 24, 39, 0.04)', // Very soft
  base: '0 4px 12px rgba(17, 24, 39, 0.06)', // Card shadow (like examples)
  md: '0 8px 24px rgba(17, 24, 39, 0.08)', // Elevated cards
  lg: '0 12px 32px rgba(17, 24, 39, 0.10)', // Hero/modal
  focus: '0 0 0 4px rgba(108, 99, 255, 0.1)', // Focus ring
}

export const components = {
  button: {
    primary: {
      background: colors.primary.main,
      color: colors.text.inverse,
      border: 'none',
      borderRadius: borderRadius.md,
      height: '48px',
      fontWeight: typography.fontWeight.semibold,
      boxShadow: 'none',
    },
    secondary: {
      background: colors.primary.light,
      color: colors.primary.main,
      border: 'none',
      borderRadius: borderRadius.md,
      height: '48px',
      fontWeight: typography.fontWeight.semibold,
      boxShadow: 'none',
    },
  },

  card: {
    background: colors.base.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    boxShadow: shadows.base,
    padding: spacing.lg,
    boxSizing: 'border-box' as const,
  },

  hero: {
    background: colors.base.surface,
    border: 'none',
    borderRadius: borderRadius.xl,
    boxShadow: shadows.base,
    padding: spacing.xl,
  },

  input: {
    background: colors.base.surface,
    border: `1px solid ${colors.base.border}`,
    borderRadius: borderRadius.sm,
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.fontSize.body,
    color: colors.text.primary,
    boxSizing: 'border-box' as const,
  },
}
