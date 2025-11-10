// Design Tokens - Version 3: Modern Refresh
// Style: Clean, Light, Spacious - Same structure, modern visual
// Mobile (390×844), More air, softer purple, better typography

export const colors = {
  // Base colors - Clean white
  base: {
    background: '#FFFFFF', // Pure white background
    surface: '#F8F9FB', // Light gray for cards/forms
    surfaceHover: '#F0F2F5',
    border: '#E6E8EF', // Subtle borders
    divider: '#E6E8EF',
  },

  // Text colors - Clear hierarchy
  text: {
    primary: '#0B0F19', // Dark text
    secondary: '#6B7280', // Gray secondary
    tertiary: '#9CA3AF', // Lighter gray
    disabled: '#D1D5DB',
    inverse: '#FFFFFF', // White on dark
  },

  // Primary accent - Soft purple (brand color)
  primary: {
    main: '#5A4AE3', // Softer purple - not too bright
    hover: '#4D3FD0', // Darker on hover
    light: '#EEEcF9', // Very light purple background
    subtle: 'rgba(90, 74, 227, 0.08)', // Subtle purple tint
  },

  // Secondary accent - Orange from logo (minimal use)
  secondary: {
    main: '#FF9A5A', // Orange accent
    hover: '#FF8A45',
    light: '#FFF5EF',
    subtle: 'rgba(255, 154, 90, 0.1)',
  },

  // Status colors - Clean and balanced
  status: {
    success: '#10B981', // Green
    successLight: '#D1FAE5',
    warning: '#F59E0B', // Amber
    warningLight: '#FEF3C7',
    error: '#EF4444', // Red
    errorLight: '#FEE2E2',
    info: '#3B82F6', // Blue
    infoLight: '#DBEAFE',
  },

  // State colors (for pills/badges) - Light and modern
  state: {
    draft: { bg: '#F3F4F6', text: '#6B7280' },
    sent: { bg: '#EEEcF9', text: '#5A4AE3' },
    inReview: { bg: '#FEF3C7', text: '#D97706' },
    approved: { bg: '#D1FAE5', text: '#059669' },
    funded: { bg: '#DBEAFE', text: '#2563EB' },
    released: { bg: '#D1FAE5', text: '#059669' },
    dispute: { bg: '#FEE2E2', text: '#DC2626' },
    active: { bg: '#EEEcF9', text: '#5A4AE3' },
    completed: { bg: '#D1FAE5', text: '#10B981' },
    pending: { bg: '#FEF3C7', text: '#F59E0B' },
  },
}

export const typography = {
  // Font families - Modern system fonts
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Roboto", "Segoe UI", sans-serif',
  },

  // Font sizes - Clear hierarchy
  fontSize: {
    h1: '28px', // Page titles
    h2: '20px', // Section headers
    h3: '16px', // Card titles
    body: '15px', // Main text
    caption: '13px', // Secondary text
    tiny: '11px', // Labels, badges
  },

  // Font weights - Inter/SF Pro style
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.7,
  },
}

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
}

export const borderRadius = {
  sm: '8px',
  md: '10px',
  lg: '12px',
  full: '9999px',
}

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.04)', // Very soft
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.06)', // Subtle
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.08)', // Light
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.10)', // Soft elevation
  border: '0 0 0 1px rgba(0, 0, 0, 0.06)', // Focus state
}

// Component styles - Modern and light
export const components = {
  // Button variants - Version 3 style
  button: {
    primary: {
      background: colors.primary.main,
      color: colors.text.inverse,
      border: 'none',
      borderRadius: borderRadius.md,
      height: '48px',
      fontWeight: typography.fontWeight.medium,
      boxShadow: shadows.sm,
    },
    secondary: {
      background: colors.base.surface,
      color: colors.primary.main,
      border: `1px solid ${colors.base.border}`,
      borderRadius: borderRadius.md,
      height: '48px',
      fontWeight: typography.fontWeight.medium,
      boxShadow: 'none',
    },
    tertiary: {
      background: 'transparent',
      color: colors.primary.main,
      border: 'none',
      borderRadius: borderRadius.md,
      height: '44px',
      fontWeight: typography.fontWeight.medium,
      boxShadow: 'none',
    },
  },

  // Card styles - Light with subtle borders
  card: {
    background: colors.base.surface,
    border: `1px solid ${colors.base.border}`,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.sm,
    padding: spacing.xl, // More spacious: 24px
  },

  // Input styles
  input: {
    background: colors.base.surface,
    border: `1px solid ${colors.base.border}`,
    borderRadius: borderRadius.sm,
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.fontSize.body,
    color: colors.text.primary,
  },

  // Tab styles - Dark style
  tab: {
    active: {
      background: 'transparent',
      color: colors.primary.main,
      borderBottom: `2px solid ${colors.primary.main}`,
    },
    inactive: {
      background: 'transparent',
      color: colors.text.secondary,
      borderBottom: '2px solid transparent',
    },
  },
}

// Utility functions
export const getStatusStyle = (status: string) => {
  const statusKey = status
    .toLowerCase()
    .replace(/[_\s]/g, '') as keyof typeof colors.state
  return colors.state[statusKey] || colors.state.draft
}

export const getPrimaryButton = () => ({
  background: colors.primary.main,
  color: colors.text.primary,
  border: 'none',
  boxShadow: shadows.sm,
  fontWeight: typography.fontWeight.semibold,
})

export const getCardStyle = () => ({
  background: colors.base.surface,
  border: `1px solid ${colors.base.border}`,
  borderRadius: borderRadius.md,
  boxShadow: shadows.none,
})
