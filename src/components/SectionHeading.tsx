type SectionHeadingProps = {
  code: string
  title: string
  intro?: string
  inverse?: boolean
}

export function SectionHeading({ code, title, intro, inverse = false }: SectionHeadingProps) {
  return (
    <div
      className={`section-heading ${!code ? 'section-heading-without-code' : ''} ${inverse ? 'section-heading-inverse' : ''}`}
      data-reveal
    >
      {code && <div className="section-code">
        <span className="node-dot" aria-hidden="true" />
        <span>{code}</span>
      </div>}
      <div>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  )
}
