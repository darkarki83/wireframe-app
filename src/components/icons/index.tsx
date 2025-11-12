// Duotone Icons Component Library

type IconProps = {
    readonly size?: number
    readonly className?: string
}

// User Icon - Duotone
export function UserIcon({ size = 40, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <circle cx="20" cy="15" r="6" fill="#E9E7FF" opacity="0.3" />
            <circle cx="20" cy="15" r="6" stroke="#6C63FF" strokeWidth="1.5" fill="none" />
            <path d="M10 32c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="32" cy="10" r="1.5" fill="#6C63FF" />
        </svg>
    )
}

// File Icon - Duotone
export function FileIcon({ size = 40, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
            <rect x="8" y="5" width="24" height="30" rx="3" fill="#E9E7FF" opacity="0.3" />
            <path d="M12 5h16a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" stroke="#6C63FF" strokeWidth="1.5" fill="none" />
            <path d="M14 15h12M14 20h12M14 25h8" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

// Upload Icon - Duotone
export function UploadIcon({ size = 48, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
            <rect x="12" y="16" width="24" height="20" rx="2" fill="#6C63FF" opacity="0.2" />
            <path d="M24 10v18M18 16l6-6 6 6" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 30h20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" stroke="#6C63FF" strokeWidth="2" fill="none" />
            <circle cx="38" cy="12" r="2" fill="#6C63FF" />
            <circle cx="10" cy="14" r="1.5" fill="#E9E7FF" />
        </svg>
    )
}

// Back Arrow Icon
export function BackIcon({ size = 20, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
            <path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Plus Icon
export function PlusIcon({ size = 16, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

// Close/X Icon
export function CloseIcon({ size = 20, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

// Download Icon
export function DownloadIcon({ size = 20, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
            <path d="M10 3v10M15 8l-5 5-5-5" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// User Profile Icon (small)
export function UserProfileIcon({ size = 16, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
            <circle cx="8" cy="6" r="3" stroke="#6C63FF" strokeWidth="1.5" fill="none" />
            <path d="M3 14c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
    )
}

// Email Icon
export function EmailIcon({ size = 16, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
            <rect x="3" y="4" width="10" height="9" rx="1" stroke="#6C63FF" strokeWidth="1.5" fill="none" />
            <path d="M3 7l5 3 5-3" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Clock Icon
export function ClockIcon({ size = 20, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="#6C63FF" strokeWidth="1.5" fill="none" />
            <path d="M10 6v4l2 2" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

// Attachment Icon
export function AttachmentIcon({ size = 16, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
            <path d="M14 7.5L7.5 14a4 4 0 01-5.656-5.656L8.5 1.688a2.667 2.667 0 013.771 3.771L5.621 12.11a1.333 1.333 0 01-1.885-1.885L9.5 4.5" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Dollar Coin Icon (for Offers navigation)
export function DollarCoinIcon({ size = 24, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M12 6v12M9 8h4.5a1.5 1.5 0 010 3H9m4.5 2H9a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}
