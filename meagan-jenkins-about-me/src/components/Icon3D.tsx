// Custom soft-3D gradient icons for the Home page cards.
// Purely decorative: the card text carries the meaning, so these are hidden from screen readers.
// The 3D look comes from four layers: a darker "thickness" copy offset below each shape, a
// vertical gradient on the face, a soft shade toward the bottom edge, and white highlights on top.

type Stop = [number, string, number?]

function Grad({ id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1 }: { id: string; stops: Stop[]; x1?: number; y1?: number; x2?: number; y2?: number }) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map(([o, c, a]) => (
        <stop key={o} offset={o} stopColor={c} stopOpacity={a ?? 1} />
      ))}
    </linearGradient>
  )
}

// soft shade that darkens the lower part of a face
const shade = (id: string) => <Grad id={id} stops={[[0, '#1a0a4a', 0], [0.55, '#1a0a4a', 0], [1, '#1a0a4a', 0.28]]} />

function Shadow({ id }: { id: string }) {
  return (
    <>
      <filter id={`${id}-blur`} x="-30%" y="-100%" width="160%" height="300%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <ellipse cx="60" cy="109" rx="32" ry="4.6" fill="#14261c" opacity="0.2" filter={`url(#${id}-blur)`} />
    </>
  )
}

function ELearning() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="el-lid" x2={0.7} y2={1} stops={[[0, '#C896FF'], [0.45, '#8A55F2'], [1, '#4B22BA']]} />
        <Grad id="el-sky" stops={[[0, '#F6EFFF'], [1, '#D3F1E1']]} />
        <Grad id="el-sun" x2={1} y2={1} stops={[[0, '#FFE0A8'], [1, '#F27A22']]} />
        <Grad id="el-mtn" stops={[[0, '#5BDB98'], [1, '#14724C']]} />
        <Grad id="el-mtn2" stops={[[0, '#8AE8B5'], [1, '#33AB73']]} />
        <Grad id="el-flag" x2={1} y2={1} stops={[[0, '#FFC47A'], [1, '#EE6A1B']]} />
        <Grad id="el-base" stops={[[0, '#DCC4FF'], [1, '#8E5BF2']]} />
        {shade('el-sh')}
        <clipPath id="el-screen"><rect x="27" y="27" width="66" height="42" rx="6" /></clipPath>
      </defs>
      <Shadow id="el" />
      <path d="M12 82 H108 L104 94 Q102.5 98 98 98 H22 Q17.5 98 16 94 Z" fill="#5A2DC4" />
      <path d="M12 79 H108 L103.5 91.5 Q102 95 98 95 H22 Q18 95 16.5 91.5 Z" fill="url(#el-base)" />
      <path d="M13.5 80 H106.5" stroke="#fff" strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="46" y="80.5" width="28" height="5.5" rx="2.75" fill="#4A1FB0" opacity="0.28" />
      <rect x="20" y="24" width="80" height="56" rx="10" fill="#3A1A93" />
      <rect x="20" y="20" width="80" height="56" rx="10" fill="url(#el-lid)" />
      <rect x="20" y="20" width="80" height="56" rx="10" fill="url(#el-sh)" />
      <rect x="26" y="26" width="68" height="44" rx="7" fill="#2E1478" opacity="0.35" />
      <rect x="27" y="27" width="66" height="42" rx="6" fill="url(#el-sky)" />
      <g clipPath="url(#el-screen)">
        <circle cx="81" cy="38" r="5.5" fill="url(#el-sun)" />
        <path d="M60 70 L74 50 Q76 47 78 50 L96 70 Z" fill="url(#el-mtn2)" />
        <path d="M24 70 L45 38 Q47.5 34.5 50 38 L72 70 Z" fill="url(#el-mtn)" />
        <path d="M45 38 Q47.5 34.5 50 38 L54 44 L49 42 L46 45 L42 43 Z" fill="#fff" />
        <path d="M27 27 H70 L50 69 H27 Z" fill="#fff" opacity="0.13" />
      </g>
      <path d="M47.6 36 V23" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M47.6 23 L58.5 26.7 L47.6 30.4 Z" fill="url(#el-flag)" />
      <path d="M24 23.5 Q40 20.5 62 21.2" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="94" cy="24" r="1.6" fill="#fff" opacity="0.8" />
    </svg>
  )
}

function Videos() {
  const stripes = [28, 52, 76]
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="vd-body" x2={0.6} y2={1} stops={[[0, '#6BE8B0'], [0.5, '#2DB77A'], [1, '#13694A']]} />
        <Grad id="vd-arm" x2={0.8} y2={1} stops={[[0, '#C896FF'], [0.5, '#8650F0'], [1, '#4B22BA']]} />
        <Grad id="vd-play" x2={1} y2={1} stops={[[0, '#FFE0A8'], [0.5, '#FFA24F'], [1, '#EE6A1B']]} />
        {shade('vd-sh')}
        <clipPath id="vd-armclip"><rect x="18" y="26" width="84" height="20" rx="5" /></clipPath>
        <clipPath id="vd-stripclip"><rect x="18" y="42" width="84" height="12" rx="4" /></clipPath>
      </defs>
      <Shadow id="vd" />
      <rect x="18" y="53" width="84" height="53" rx="10" fill="#0D4F36" />
      <rect x="18" y="48" width="84" height="54" rx="10" fill="url(#vd-body)" />
      <rect x="18" y="48" width="84" height="54" rx="10" fill="url(#vd-sh)" />
      <path d="M26 54.5 Q44 52 66 53" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M50 66 L50 90 L75 78 Z" fill="#B8470C" stroke="#B8470C" strokeWidth="7" strokeLinejoin="round" transform="translate(0 2.5)" />
      <path d="M50 66 L50 90 L75 78 Z" fill="url(#vd-play)" stroke="url(#vd-play)" strokeWidth="7" strokeLinejoin="round" />
      <path d="M52.5 70 L52.5 77" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="18" y="45" width="84" height="12" rx="4" fill="#3A1A93" />
      <rect x="18" y="42" width="84" height="12" rx="4" fill="url(#vd-arm)" />
      <g clipPath="url(#vd-stripclip)">
        {stripes.map((x) => (
          <path key={x} d={`M${x + 4} 42 H${x + 16} L${x + 8} 54 H${x - 4} Z`} fill="#fff" opacity="0.95" />
        ))}
      </g>
      <g transform="rotate(-14 20 44)">
        <rect x="18" y="30" width="84" height="20" rx="5" fill="#3A1A93" />
        <rect x="18" y="26" width="84" height="20" rx="5" fill="url(#vd-arm)" />
        <g clipPath="url(#vd-armclip)">
          {stripes.map((x) => (
            <path key={x} d={`M${x} 26 H${x + 12} L${x + 4} 46 H${x - 8} Z`} fill="#fff" opacity="0.95" />
          ))}
        </g>
        <path d="M22 28.8 Q50 26.4 84 28" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </g>
      <circle cx="94" cy="58" r="1.6" fill="#fff" opacity="0.8" />
    </svg>
  )
}

function Guides() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="gd-cover" x2={0.8} y2={1} stops={[[0, '#C896FF'], [0.45, '#8A55F2'], [1, '#4B22BA']]} />
        <Grad id="gd-pageL" x2={1} y2={0.4} stops={[[0, '#FFFFFF'], [1, '#E5D8FF']]} />
        <Grad id="gd-pageR" x2={0} y2={0.4} stops={[[0, '#FFFFFF'], [1, '#EADFFF']]} />
        <Grad id="gd-mtn" stops={[[0, '#5BDB98'], [1, '#14724C']]} />
        <Grad id="gd-ribbon" stops={[[0, '#FFC47A'], [1, '#EE6A1B']]} />
      </defs>
      <Shadow id="gd" />
      <path d="M12 40 Q36 33 60 45 Q84 33 108 40 V97 Q84 91 60 103 Q36 91 12 97 Z" fill="#3A1A93" />
      <path d="M12 35 Q36 28 60 40 Q84 28 108 35 V92 Q84 86 60 98 Q36 86 12 92 Z" fill="url(#gd-cover)" />
      <path d="M19 91.5 Q39 87 58 96 V99.5 Q39 91 19 94.5 Z" fill="#D9C9FA" />
      <path d="M101 91.5 Q81 87 62 96 V99.5 Q81 91 101 94.5 Z" fill="#D9C9FA" />
      <path d="M19 38 Q39 33 58 43.5 V91 Q39 82 19 86 Z" fill="url(#gd-pageL)" />
      <path d="M101 38 Q81 33 62 43.5 V91 Q81 82 101 86 Z" fill="url(#gd-pageR)" />
      <path d="M58 43.5 Q60 42.5 62 43.5 V91 Q60 90 58 91 Z" fill="#6B3FA0" opacity="0.2" />
      <path d="M26 52 Q38 50 51 57 M26 61 Q38 59 51 66 M26 70 Q38 68 51 75" stroke="#C3B1EE" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M72 55 Q80 53 91 57" stroke="#C3B1EE" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M68 78 L78 60 Q80 57 82 60 L86 67 L89 63 Q90.5 61 92 63 L95 78 Z" fill="url(#gd-mtn)" />
      <path d="M66 34 V63 L71.5 57.5 L77 63 V34 Z" fill="url(#gd-ribbon)" />
      <path d="M66 34 V40" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M17 36.5 Q36 31 56 40.5" stroke="#fff" strokeOpacity="0.65" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="104" cy="38" r="1.6" fill="#fff" opacity="0.8" />
    </svg>
  )
}

function TechStack() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="tb-body" x2={0.6} y2={1} stops={[[0, '#6BE8B0'], [0.5, '#2DB77A'], [1, '#13694A']]} />
        <Grad id="tb-pocket" x2={0.6} y2={1} stops={[[0, '#C896FF'], [0.5, '#8650F0'], [1, '#4B22BA']]} />
        <Grad id="tb-patch" x2={1} y2={1} stops={[[0, '#FFE0A8'], [0.5, '#FFA24F'], [1, '#EE6A1B']]} />
        <Grad id="tb-strap" stops={[[0, '#2FB77A'], [1, '#0D5A3B']]} />
        {shade('tb-sh')}
      </defs>
      <Shadow id="tb" />
      <path d="M47 30 Q47 13 60 13 Q73 13 73 30" fill="none" stroke="#0A4A30" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M48.5 21 Q50 15.5 56 14.6" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      <rect x="21" y="60" width="13" height="32" rx="6.5" fill="url(#tb-strap)" />
      <rect x="86" y="60" width="13" height="32" rx="6.5" fill="url(#tb-strap)" />
      <path d="M30 60 Q30 28 60 28 Q90 28 90 60 V95 Q90 105 80 105 H40 Q30 105 30 95 Z" fill="#0D5A3B" />
      <path d="M30 56 Q30 24 60 24 Q90 24 90 56 V91 Q90 101 80 101 H40 Q30 101 30 91 Z" fill="url(#tb-body)" />
      <path d="M30 56 Q30 24 60 24 Q90 24 90 56 V91 Q90 101 80 101 H40 Q30 101 30 91 Z" fill="url(#tb-sh)" />
      <path d="M33 56 Q60 72 87 56" fill="none" stroke="#0A4A30" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="43.5" r="9" fill="#B8470C" />
      <circle cx="60" cy="42" r="9" fill="url(#tb-patch)" />
      <path d="M54.5 46.5 L60 37 L65.5 46.5 Z" fill="#fff" />
      <rect x="40" y="71" width="40" height="27" rx="10" fill="#3A1A93" />
      <rect x="40" y="68" width="40" height="27" rx="10" fill="url(#tb-pocket)" />
      <path d="M47 76 H73" stroke="#fff" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 40 Q40 31 51 28.5" stroke="#fff" strokeOpacity="0.65" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="84" cy="36" r="1.6" fill="#fff" opacity="0.8" />
    </svg>
  )
}

const ICONS = { elearning: ELearning, videos: Videos, guides: Guides, techstack: TechStack }

export function Icon3D({ name }: { name: keyof typeof ICONS }) {
  const Svg = ICONS[name]
  return (
    <span className="icon3d" aria-hidden="true">
      <Svg />
    </span>
  )
}
