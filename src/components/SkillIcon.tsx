type SkillIconName = 'control' | 'code' | 'infrastructure' | 'language'

type SkillIconProps = {
  name: SkillIconName
}

export function SkillIcon({ name }: SkillIconProps) {
  const props = {
    className: 'skill-icon',
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  }

  if (name === 'control') {
    return (
      <svg {...props}>
        <rect x="13" y="13" width="22" height="22" rx="3" />
        <path d="M4 18h9M4 30h9M35 18h9M35 30h9M18 4v9M30 4v9M18 35v9M30 35v9" />
        <path d="M17 24h4l2-5 4 10 2-5h4" />
        <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'code') {
    return (
      <svg {...props}>
        <path d="m17 11-11 13 11 13M31 11l11 13-11 13M27 7 21 41" />
        <path d="M7 43h34" />
      </svg>
    )
  }

  if (name === 'infrastructure') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="4" />
        <circle cx="36" cy="12" r="4" />
        <circle cx="12" cy="36" r="4" />
        <circle cx="36" cy="36" r="4" />
        <path d="M16 12h16M12 16v16M36 16v16M16 36h16M15 15l18 18M33 15 15 33" />
      </svg>
    )
  }

  return (
    <svg {...props}>
      <circle cx="24" cy="24" r="17" />
      <path d="M7 24h34M10 15h28M10 33h28" />
      <path d="M24 7c5 5 7 11 7 17s-2 12-7 17M24 7c-5 5-7 11-7 17s2 12 7 17" />
    </svg>
  )
}
