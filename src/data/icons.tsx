// Набор инлайн-SVG-иконок (stroke 1.8, 24×24) — без внешних библиотек
type IconProps = { size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

export const IconSun = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2.5M12 19.5V22M4.5 4.5l1.8 1.8M17.7 17.7l1.8 1.8M2 12h2.5M19.5 12H22M4.5 19.5l1.8-1.8M17.7 6.3l1.8-1.8" />
  </svg>
)

export const IconMoon = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
)

export const IconBot = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="4" y="8" width="16" height="11" rx="3" />
    <path d="M12 8V5m0 0a1.5 1.5 0 1 0-.01-3.01A1.5 1.5 0 0 0 12 5Z" />
    <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
    <path d="M9.5 16.5h5" />
  </svg>
)

export const IconChat = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M21 12a8 8 0 0 1-8 8H4l2.3-2.9A8 8 0 1 1 21 12Z" />
    <path d="M8.5 10.5h7M8.5 13.5h4.5" />
  </svg>
)

export const IconMax = ({ size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="max-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    {/* Outer circle with gradient */}
    <circle cx="12" cy="12" r="11" fill="url(#max-gradient)" />
    {/* White speech bubble */}
    <path
      d="M 12 4 C 7.58 4 4 7.58 4 12 C 4 13.5 4.4 14.9 5.1 16.1 L 4 20 L 8.2 18.8 C 9.4 19.6 10.7 20 12 20 C 16.42 20 20 16.42 20 12 C 20 7.58 16.42 4 12 4 Z"
      fill="white"
    />
    {/* Inner blue dot */}
    <circle cx="12" cy="12" r="3" fill="#4f46e5" />
  </svg>
)

export const IconPen = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="m14.5 4.5 5 5L8 21H3v-5L14.5 4.5Z" />
    <path d="m12.5 6.5 5 5" />
  </svg>
)

export const IconTable = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 9.5h18M9.5 9.5V20M15.5 9.5V20" />
  </svg>
)

export const IconImage = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="m4 18 5-5 3.5 3.5L16 13l4 4" />
  </svg>
)

export const IconAcademy = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="m12 4 9.5 4.5L12 13 2.5 8.5 12 4Z" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
  </svg>
)

export const IconSearch = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.8-3.8" />
  </svg>
)

export const IconMap = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 6v13l5-2 6 2 5-2V4l-5 2-6-2-5 2Z" />
    <path d="M9 4v13M15 6v13" />
  </svg>
)

export const IconRocket = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 15c-1.5-4.5.5-9.5 5.5-11.5 1 0 2 0 3 .5.5 1 .5 2 .5 3C19 12 14 14 12 15Z" transform="translate(-3 3)" />
    <path d="M9 15c-2 .5-3.5 2-4 5 3-.5 4.5-2 5-4" />
    <path d="M15 9.5a1.5 1.5 0 1 0 0-.01" />
  </svg>
)

export const IconChart = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 4v16h16" />
    <path d="m7 14 4-4 3 3 6-6" />
    <path d="M20 7v3.5M20 7h-3.5" />
  </svg>
)

export const IconMail = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const IconSend = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M21 3 10 14" />
    <path d="M21 3 14 21l-4-7-7-4 18-7Z" />
  </svg>
)

export const IconClose = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

export const IconClock = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

export const IconShield = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 11.5 2.2 2.2L15.5 9" />
  </svg>
)

export const IconCheck = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.2 2.4 2.4 4.8-5" />
  </svg>
)
