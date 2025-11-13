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

// Refresh Icon
export function RefreshIcon({ size = 20, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
            <path
                d="M17 10a7 7 0 11-2.05-4.95M15 3v4h-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

// Deposit Icon (Arrow up with line)
export function DepositIcon({ size = 20, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 2v20M17 7l-5-5-5 5M7 17l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Withdraw Icon (Arrow down with line)
export function WithdrawIcon({ size = 20, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 2v20M7 7l5-5 5 5M17 17l-5 5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Sign Out Icon
export function SignOutIcon({ size = 20, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Profile Tab Icon
export function ProfileTabIcon({ size = 20, className = '', isActive = false }: Readonly<IconProps & { isActive?: boolean }>) {
    const fillColor = isActive ? "rgba(255,255,255,0.2)" : "#E9E7FF"
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <circle cx="14" cy="10" r="5" fill={fillColor} />
            <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 24c0-4 3.6-7 8-7s8 3 8 7" fill={fillColor} />
            <path d="M6 24c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

// Skills Tab Icon
export function SkillsTabIcon({ size = 20, className = '', isActive = false }: Readonly<IconProps & { isActive?: boolean }>) {
    const fillColor = isActive ? "rgba(255,255,255,0.2)" : "#E9E7FF"
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <rect x="4" y="10" width="20" height="12" rx="2" fill={fillColor} />
            <path d="M9 6l5 4 5-4M4 16h20M4 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="4" y="10" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

// Portfolio Tab Icon
export function PortfolioTabIcon({ size = 20, className = '', isActive = false }: Readonly<IconProps & { isActive?: boolean }>) {
    const fillColor = isActive ? "rgba(255,255,255,0.2)" : "#E9E7FF"
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <rect x="5" y="8" width="18" height="14" rx="2" fill={fillColor} />
            <path d="M9 8V7a2 2 0 012-2h6a2 2 0 012 2v1" fill={fillColor} />
            <rect x="5" y="8" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 8V7a2 2 0 012-2h6a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

// Settings Tab Icon
export function SettingsTabIcon({ size = 20, className = '', isActive = false }: Readonly<IconProps & { isActive?: boolean }>) {
    const fillColor = isActive ? "rgba(255,255,255,0.2)" : "#E9E7FF"
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <circle cx="14" cy="14" r="3" fill={fillColor} />
            <circle cx="14" cy="14" r="8" fill={fillColor} />
            <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 6v2M14 20v2M6 14h2M20 14h2M9.2 9.2l1.4 1.4M17.4 17.4l1.4 1.4M9.2 18.8l1.4-1.4M17.4 10.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

// Dollar Icon
export function DollarIcon({ size = 14, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
    )
}

// Client Icon (User icon for contract details)
export function ClientIcon({ size = 16, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <circle cx="14" cy="10" r="4" fill="#E9E7FF" />
            <circle cx="14" cy="10" r="4" stroke="#000000" strokeWidth="1.5" />
            <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" fill="#E9E7FF" opacity="0.5" />
            <path d="M6 24v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

// Freelancer Icon (Briefcase icon)
export function FreelancerIcon({ size = 16, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <rect x="6" y="9" width="16" height="12" rx="1.5" fill="#E9E7FF" />
            <rect x="6" y="9" width="16" height="12" rx="1.5" stroke="#000000" strokeWidth="1.5" />
            <path d="M12 21V7a1.5 1.5 0 0 0-1.5-1.5h-3a1.5 1.5 0 0 0-1.5 1.5v14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

// Calendar Icon (for duration)
export function CalendarIcon({ size = 16, className = '' }: Readonly<IconProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <rect x="5" y="6" width="18" height="18" rx="2" fill="#E9E7FF" opacity="0.3" />
            <rect x="5" y="6" width="18" height="18" rx="2" stroke="#000000" strokeWidth="1.5" />
            <line x1="17" y1="3" x2="17" y2="9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="11" y1="3" x2="11" y2="9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="5" y1="12" x2="23" y2="12" stroke="#000000" strokeWidth="1.5" />
        </svg>
    )
}

// Overview Tab Icon (pie chart)
export function OverviewTabIcon({ size = 20, className = '', isActive = false }: Readonly<IconProps & { isActive?: boolean }>) {
    const fillColor1 = isActive ? "rgba(255,255,255,0.2)" : "#E9E7FF"
    const fillColor2 = isActive ? "rgba(255,255,255,0.3)" : "#E9E7FF"
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" fill={fillColor1} />
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" fill={fillColor2} />
            <path d="M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Milestones Tab Icon (clock)
export function MilestonesTabIcon({ size = 20, className = '', isActive = false }: Readonly<IconProps & { isActive?: boolean }>) {
    const fillColor = isActive ? "rgba(255,255,255,0.2)" : "#E9E7FF"
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <circle cx="14" cy="14" r="10" fill={fillColor} />
            <circle cx="14" cy="14" r="10" fill={fillColor} />
            <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
            <polyline points="14 8 14 14 18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Communication Tab Icon (chat bubble)
export function CommunicationTabIcon({ size = 20, className = '', isActive = false }: Readonly<IconProps & { isActive?: boolean }>) {
    const fillColor = isActive ? "rgba(255,255,255,0.2)" : "#E9E7FF"
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={fillColor} />
            <path d="M23 17a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

// Files Tab Icon (document)
export function FilesTabIcon({ size = 20, className = '', isActive = false }: Readonly<IconProps & { isActive?: boolean }>) {
    const fillColor = isActive ? "rgba(255,255,255,0.2)" : "#E9E7FF"
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={className}>
            <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" fill={fillColor} />
            <path d="M15 4H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="15 4 15 11 22 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
