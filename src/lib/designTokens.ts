// Design Tokens - Version 3: Light Fintech Style
// Style: Insurance/Banking UI - Rounded cards, duotone icons, soft purple palette
// Mobile (390×844), Minimalist, Spacious, Premium feel

export const colors = {
  // Base colors - Light fintech background
  base: {
    background: '#F7F7FC', // Light lavender background (like examples)
    surface: '#FFFFFF', // White cards/panels
    surfaceHover: '#F9F9FD',
    border: '#EEF0F4', // Subtle stroke
    divider: '#EEF0F4',
  },

  // Text colors - 3 colors only (senior requirement)
  text: {
    default: '#000000', // Default black text
    primary: '#000000', // Primary text (links, important)
    secondary: '#6B7280', // Secondary/muted text
    inverse: '#FFFFFF', // White on dark backgrounds
  },

  // Primary accent - Vibrant purple (main brand)
  primary: {
    main: '#6C63FF', // Main purple (like examples)
    hover: '#5850E6', // Darker on hover
    light: '#E9E7FF', // Light purple for chips/badges/highlights
    subtle: 'rgba(108, 99, 255, 0.1)', // Very subtle purple tint
    weak: '#E9E7FF', // Alias for backgrounds
  },

  // Secondary accent - Deeper purple for accents
  secondary: {
    main: '#7C3AED', // Accent purple (buttons, highlights)
    hover: '#6D28D9',
    light: '#EDE9FE',
    subtle: 'rgba(124, 58, 237, 0.1)',
  },

  // Gradient - Duotone for illustrations/icons
  gradient: {
    primary: 'linear-gradient(135deg, #6C63FF 0%, #B8A8FF 100%)', // Purple duotone
    secondary: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
  },

  // Status colors - Clean and balanced
  status: {
    success: '#22C55E', // Green
    successLight: '#D1FAE5',
    warning: '#F59E0B', // Amber/Orange
    warningLight: '#FEF3C7',
    error: '#EF4444', // Red/Danger
    errorLight: '#FEE2E2',
    info: '#3B82F6', // Blue
    infoLight: '#DBEAFE',
  },

  // State colors (for pills/badges) - Light and modern
  state: {
    draft: { bg: '#F3F4F6', text: '#6B7280' },
    sent: { bg: '#E9E7FF', text: '#6C63FF' },
    inReview: { bg: '#FEF3C7', text: '#D97706' },
    approved: { bg: '#D1FAE5', text: '#059669' },
    funded: { bg: '#DBEAFE', text: '#2563EB' },
    released: { bg: '#D1FAE5', text: '#059669' },
    dispute: { bg: '#FEE2E2', text: '#DC2626' },
    active: { bg: '#E9E7FF', text: '#6C63FF' },
    completed: { bg: '#D1FAE5', text: '#10B981' },
    pending: { bg: '#FEF3C7', text: '#F59E0B' },
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
    tight: 1.3,
    normal: 1.45,
    relaxed: 1.6,
  },
}

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px', // Between elements
  lg: '16px', // Inside cards
  xl: '24px', // Outer padding
  xxl: '32px',
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

// Component styles - Light fintech style
export const components = {
  // Button variants - Rounded, 48px height
  button: {
    primary: {
      background: colors.primary.main,
      color: colors.text.inverse,
      border: 'none',
      borderRadius: borderRadius.md, // 12px
      height: '48px',
      fontWeight: typography.fontWeight.semibold,
      boxShadow: 'none',
    },
    secondary: {
      background: colors.primary.light, // Light purple bg
      color: colors.primary.main,
      border: 'none',
      borderRadius: borderRadius.md,
      height: '48px',
      fontWeight: typography.fontWeight.semibold,
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

  // Card styles - White cards with soft shadows (like examples)
  card: {
    background: colors.base.surface, // White
    border: 'none', // No borders in examples
    borderRadius: borderRadius.lg, // 16px
    boxShadow: shadows.base, // Soft shadow
    padding: spacing.lg, // 16px inside
  },

  // Hero/Banner card - Large rounded card with illustration
  hero: {
    background: colors.base.surface,
    border: 'none',
    borderRadius: borderRadius.xl, // 24px (more rounded)
    boxShadow: shadows.base,
    padding: spacing.xl, // 24px
  },

  // Input styles
  input: {
    background: colors.base.surface,
    border: `1px solid ${colors.base.border}`,
    borderRadius: borderRadius.sm, // 10px
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
