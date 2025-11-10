// Design Tokens - Crypto/Web3 Premium Dark Style
// Style: Coinbase Pro, Binance, Phantom Wallet - Deep, Secure, Technological
// Mobile (390×844), Dark gradient with depth, Premium feel

export const colors = {
  // Base colors - Deep dark background with depth
  base: {
    background: '#0E121A', // Main dark background
    backgroundGradient: 'linear-gradient(180deg, #0C0F14 0%, #111722 100%)', // Subtle vertical gradient
    surface: '#151A23', // Cards, elevated surfaces
    surfaceHover: '#1A1F2B', // Hover state for cards
    border: '#1E2633', // Subtle borders
    divider: '#1E2633', // Divider lines
  },

  // Text colors - White and cool grays
  text: {
    primary: '#FFFFFF', // Pure white for main text
    secondary: '#94A3B8', // Cool gray for secondary text
    tertiary: '#64748B', // Lighter gray for hints
    disabled: '#475569', // Disabled state
    inverse: '#0E121A', // Dark text on light backgrounds
  },

  // Primary accent - Professional blue (used sparingly)
  primary: {
    main: '#3B82F6', // Professional blue - main actions
    hover: '#2563EB', // Darker on hover
    light: '#1E3A8A', // Dark blue for backgrounds
    subtle: 'rgba(59, 130, 246, 0.1)', // Very subtle blue background
  },

  // Secondary accent - Purple/Cosmic (minimal use)
  secondary: {
    main: '#6366F1', // Indigo for special highlights
    hover: '#4F46E5',
    light: '#312E81',
    subtle: 'rgba(99, 102, 241, 0.1)',
  },

  // Status colors - Balanced, not acidic
  status: {
    success: '#22C55E', // Clean green
    successLight: 'rgba(34, 197, 94, 0.1)',
    warning: '#F59E0B', // Amber
    warningLight: 'rgba(245, 158, 11, 0.1)',
    error: '#EF4444', // Strong red
    errorLight: 'rgba(239, 68, 68, 0.1)',
    info: '#3B82F6',
    infoLight: 'rgba(59, 130, 246, 0.1)',
  },

  // State colors (for pills/badges) - Crypto style
  state: {
    draft: { bg: '#1E293B', text: '#94A3B8' },
    sent: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA' },
    inReview: { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24' },
    approved: { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ADE80' },
    funded: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA' },
    released: { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ADE80' },
    dispute: { bg: 'rgba(239, 68, 68, 0.15)', text: '#F87171' },
    active: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA' },
    completed: { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ADE80' },
    pending: { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24' },
  },
}

export const typography = {
  // Font families - System fonts
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

  // Font weights - Medium predominance
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
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
  md: '12px',
  lg: '16px',
  full: '9999px',
}

export const shadows = {
  none: 'none',
  sm: '0 2px 8px rgba(0, 0, 0, 0.3)', // Subtle depth
  base: '0 4px 12px rgba(0, 0, 0, 0.4)', // Medium depth
  md: '0 8px 16px rgba(0, 0, 0, 0.5)', // More prominent
  glow: '0 0 20px rgba(59, 130, 246, 0.15)', // Subtle blue glow
  border: '0 0 0 1px rgba(59, 130, 246, 0.3)', // Focus state
}

// Component styles - Crypto premium style
export const components = {
  // Button variants - Dark style
  button: {
    primary: {
      background: colors.primary.main,
      color: colors.text.primary,
      border: 'none',
      boxShadow: shadows.sm,
    },
    secondary: {
      background: 'transparent',
      color: colors.primary.main,
      border: `1px solid ${colors.primary.main}`,
      boxShadow: 'none',
    },
    tertiary: {
      background: colors.base.surface,
      color: colors.text.primary,
      border: `1px solid ${colors.base.border}`,
      boxShadow: 'none',
    },
  },

  // Card styles - Dark cards with depth
  card: {
    background: colors.base.surface,
    border: `1px solid ${colors.base.border}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.none,
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
