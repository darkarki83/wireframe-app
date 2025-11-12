/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                base: {
                    background: '#F7F7FC',
                    surface: '#FFFFFF',
                    border: '#EEF0F4',
                },
                text: {
                    DEFAULT: '#000000',
                    primary: '#000000',
                    secondary: '#6B7280',
                    inverse: '#FFFFFF',
                },
                primary: {
                    main: '#6C63FF',
                    hover: '#5850E6',
                    light: '#E9E7FF',
                    subtle: 'rgba(108, 99, 255, 0.08)',
                },
                status: {
                    success: '#10B981',
                    successLight: '#D1FAE5',
                    warning: '#F59E0B',
                    error: '#EF4444',
                    errorLight: '#FEE2E2',
                    info: '#3B82F6',
                },
                state: {
                    draft: {
                        bg: '#F3F4F6',
                        text: '#6B7280',
                    },
                    active: {
                        bg: '#DBEAFE',
                        text: '#1E40AF',
                    },
                    inReview: {
                        bg: '#FEF3C7',
                        text: '#92400E',
                    },
                    approved: {
                        bg: '#D1FAE5',
                        text: '#065F46',
                    },
                    funded: {
                        bg: '#E0E7FF',
                        text: '#3730A3',
                    },
                    completed: {
                        bg: '#D1FAE5',
                        text: '#065F46',
                    },
                    pending: {
                        bg: '#FEF3C7',
                        text: '#92400E',
                    },
                    dispute: {
                        bg: '#FEE2E2',
                        text: '#991B1B',
                    },
                },
            },
            spacing: {
                xs: '4px',
                sm: '8px',
                md: '16px',
                lg: '24px',
                xl: '32px',
                xxxl: '48px',
            },
            fontSize: {
                h1: '28px',
                h2: '18px',
                body: '15px',
                caption: '13px',
            },
            fontWeight: {
                regular: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
            },
            borderRadius: {
                sm: '8px',
                md: '12px',
                lg: '16px',
                full: '9999px',
            },
            boxShadow: {
                base: '0 2px 8px rgba(0, 0, 0, 0.04)',
                sm: '0 1px 4px rgba(0, 0, 0, 0.04)',
                md: '0 4px 12px rgba(0, 0, 0, 0.08)',
                lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
            },
        },
    },
    plugins: [],
}
