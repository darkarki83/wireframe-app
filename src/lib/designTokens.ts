// Design Tokens - Fintech Premium Minimalism
// Style: Stripe, Revolut, Mercury Bank - Clean, Expensive, Precise
// Mobile (390×844), Maximum whitespace, Subtle accents

export const colors = {
  // Base colors - Pure white background
  base: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceHover: '#F9FAFB',
    border: '#E5E7EB',
    divider: '#E5E7EB',
  },
  
  // Text colors - Dark, precise, expensive
  text: {
    primary: '#0B0F19',
    secondary: '#475467',
    tertiary: '#6B7280',
    disabled: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  
  // Primary accent - Calm deep blue (no gradients)
  primary: {
    main: '#2563EB',      // Primary blue - main actions
    hover: '#1D4ED8',     // Darker on hover
    light: '#DBEAFE',     // Light background for pills
    dark: '#0052CC',      // Alternative darker blue
  },
  
  // Status colors - Subdued, professional
  status: {
    success: '#16A34A',
    successLight: '#DCFCE7',
    warning: '#D97706',
    warningLight: '#FEF3C7',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    info: '#2563EB',
    infoLight: '#DBEAFE',
  },
  
  // State colors (for pills/badges) - Clean, subtle
  state: {
    draft: { bg: '#F3F4F6', text: '#374151' },
    sent: { bg: '#DBEAFE', text: '#1E40AF' },
    inReview: { bg: '#FEF3C7', text: '#92400E' },
    approved: { bg: '#DCFCE7', text: '#166534' },
    funded: { bg: '#DBEAFE', text: '#1D4ED8' },
    released: { bg: '#D1FAE5', text: '#065F46' },
    dispute: { bg: '#FEE2E2', text: '#991B1B' },
    active: { bg: '#DBEAFE', text: '#1D4ED8' },
    completed: { bg: '#DCFCE7', text: '#16A34A' },
    pending: { bg: '#FEF3C7', text: '#D97706' },
  },
};

export const typography = {
  // Font families - System fonts for premium feel
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Roboto", "Segoe UI", sans-serif',
  },
  
  // Font sizes - Clear hierarchy
  fontSize: {
    h1: '28px',       // Page titles
    h2: '20px',       // Section headers
    h3: '16px',       // Card titles
    body: '15px',     // Main text
    caption: '13px',  // Secondary text
    tiny: '11px',     // Labels, badges
  },
  
  // Font weights - Subtle, not too bold
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
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
};

export const borderRadius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',           // Very subtle
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.06)',          // Minimal shadow
  md: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',            // Slightly more
  border: '0 0 0 1px rgba(0, 0, 0, 0.06)',          // Focus state
};

// Component styles - Clean, minimal, premium
export const components = {
  // Button variants - Fintech style
  button: {
    primary: {
      background: colors.primary.main,
      color: colors.text.inverse,
      border: 'none',
      boxShadow: shadows.sm,
    },
    secondary: {
      background: colors.base.surface,
      color: colors.primary.main,
      border: `1px solid ${colors.base.border}`,
      boxShadow: shadows.none,
    },
    tertiary: {
      background: 'transparent',
      color: colors.primary.main,
      border: 'none',
      boxShadow: 'none',
    },
  },
  
  // Card styles - Minimal borders, lots of whitespace
  card: {
    background: colors.base.surface,
    border: `1px solid ${colors.base.border}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.none,
    padding: spacing.lg,
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
  
  // Tab styles - Minimal, clean
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
};

// Utility functions
export const getStatusStyle = (status: string) => {
  const statusKey = status.toLowerCase().replace(/[_\s]/g, '') as keyof typeof colors.state;
  return colors.state[statusKey] || colors.state.draft;
};

export const getPrimaryButton = () => ({
  background: colors.primary.main,
  color: colors.text.inverse,
  border: 'none',
  boxShadow: shadows.sm,
  fontWeight: typography.fontWeight.semibold,
});

export const getCardStyle = () => ({
  background: colors.base.surface,
  border: `1px solid ${colors.base.border}`,
  borderRadius: borderRadius.md,
  boxShadow: shadows.none,
});
