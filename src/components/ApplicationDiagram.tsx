type DiagramType = 'radiation' | 'scada' | 'combustion' | 'web' | 'education'

export function ApplicationDiagram({ type }: { type: DiagramType }) {
  return (
    <svg className="application-diagram" viewBox="0 0 360 180" aria-hidden="true">
      {type === 'radiation' && (
        <>
          <circle className="diagram-thin" cx="86" cy="90" r="49" />
          <circle className="diagram-thin" cx="86" cy="90" r="31" />
          <circle className="diagram-fill-cyan" cx="86" cy="90" r="7" />
          <path className="diagram-line" d="M136 90h54l18-24 20 48 19-24h67" />
          <rect className="diagram-box" x="268" y="65" width="48" height="50" />
          <text x="268" y="52">DET.</text>
        </>
      )}
      {type === 'scada' && (
        <>
          <rect className="diagram-box" x="30" y="26" width="300" height="126" />
          <path className="diagram-thin" d="M30 58h300M130 58v94" />
          <path className="diagram-line" d="M154 122l35-28 28 11 33-45 47 32" />
          <circle className="diagram-fill-copper" cx="250" cy="60" r="6" />
          <path className="diagram-thin" d="M54 82h52M54 101h38M54 120h45" />
          <text x="50" y="48">SCADA</text>
        </>
      )}
      {type === 'combustion' && (
        <>
          <path className="diagram-box" d="M222 35h88v110h-88z" />
          <path className="diagram-line" d="M32 92h52l15-17 17 34 18-34 17 17h71" />
          <path className="diagram-copper" d="M247 116c-17-21 12-29 8-53 24 16 31 39 12 59-7 7-15 9-20-6z" />
          <circle className="diagram-fill-cyan" cx="116" cy="92" r="6" />
          <text x="32" y="74">CLP</text>
          <text x="236" y="52">FORNO</text>
        </>
      )}
      {type === 'web' && (
        <>
          <rect className="diagram-box" x="36" y="34" width="116" height="90" />
          <rect className="diagram-box" x="208" y="56" width="116" height="90" />
          <path className="diagram-line" d="M152 78h34v23h22" />
          <path className="diagram-thin" d="M36 57h116M208 79h116M58 80h55M58 99h34M230 103h62M230 121h44" />
          <circle className="diagram-fill-copper" cx="186" cy="101" r="7" />
          <text x="48" y="50">WEB</text>
          <text x="220" y="72">FLUXO</text>
        </>
      )}
      {type === 'education' && (
        <>
          <circle className="diagram-box" cx="180" cy="90" r="34" />
          <circle className="diagram-fill-cyan" cx="180" cy="90" r="8" />
          <circle className="diagram-box" cx="74" cy="52" r="20" />
          <circle className="diagram-box" cx="286" cy="52" r="20" />
          <circle className="diagram-box" cx="74" cy="138" r="20" />
          <circle className="diagram-box" cx="286" cy="138" r="20" />
          <path className="diagram-thin" d="M94 59l54 20M266 59l-54 20M94 131l54-20M266 131l-54-20" />
          <text x="160" y="137">ECASE</text>
        </>
      )}
    </svg>
  )
}
