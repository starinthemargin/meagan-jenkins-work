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
        <Grad id="el-sky" stops={[[0, '#F6EFFF'], [1, '#D9EDCF']]} />
        <Grad id="el-sun" x2={1} y2={1} stops={[[0, '#FFE0A8'], [1, '#F27A22']]} />
        <Grad id="el-mtn" stops={[[0, '#80BC86'], [1, '#24623F']]} />
        <Grad id="el-mtn2" stops={[[0, '#A9D4A1'], [1, '#479462']]} />
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
        <Grad id="vd-body" x2={0.6} y2={1} stops={[[0, '#94C993'], [0.5, '#4A9664'], [1, '#215B3B']]} />
        <Grad id="vd-arm" x2={0.8} y2={1} stops={[[0, '#C896FF'], [0.5, '#8650F0'], [1, '#4B22BA']]} />
        <Grad id="vd-play" x2={1} y2={1} stops={[[0, '#FFE0A8'], [0.5, '#FFA24F'], [1, '#EE6A1B']]} />
        {shade('vd-sh')}
        <clipPath id="vd-armclip"><rect x="18" y="26" width="84" height="20" rx="5" /></clipPath>
        <clipPath id="vd-stripclip"><rect x="18" y="42" width="84" height="12" rx="4" /></clipPath>
      </defs>
      <Shadow id="vd" />
      <rect x="18" y="53" width="84" height="53" rx="10" fill="#19442E" />
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
        <Grad id="gd-mtn" stops={[[0, '#80BC86'], [1, '#24623F']]} />
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
        <Grad id="tb-body" x2={0.6} y2={1} stops={[[0, '#94C993'], [0.5, '#4A9664'], [1, '#215B3B']]} />
        <Grad id="tb-pocket" x2={0.6} y2={1} stops={[[0, '#C896FF'], [0.5, '#8650F0'], [1, '#4B22BA']]} />
        <Grad id="tb-patch" x2={1} y2={1} stops={[[0, '#FFE0A8'], [0.5, '#FFA24F'], [1, '#EE6A1B']]} />
        <Grad id="tb-strap" stops={[[0, '#4B9765'], [1, '#1C4C33']]} />
        {shade('tb-sh')}
      </defs>
      <Shadow id="tb" />
      <path d="M47 30 Q47 13 60 13 Q73 13 73 30" fill="none" stroke="#183F2B" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M48.5 21 Q50 15.5 56 14.6" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      <rect x="21" y="60" width="13" height="32" rx="6.5" fill="url(#tb-strap)" />
      <rect x="86" y="60" width="13" height="32" rx="6.5" fill="url(#tb-strap)" />
      <path d="M30 60 Q30 28 60 28 Q90 28 90 60 V95 Q90 105 80 105 H40 Q30 105 30 95 Z" fill="#1C4C33" />
      <path d="M30 56 Q30 24 60 24 Q90 24 90 56 V91 Q90 101 80 101 H40 Q30 101 30 91 Z" fill="url(#tb-body)" />
      <path d="M30 56 Q30 24 60 24 Q90 24 90 56 V91 Q90 101 80 101 H40 Q30 101 30 91 Z" fill="url(#tb-sh)" />
      <path d="M33 56 Q60 72 87 56" fill="none" stroke="#183F2B" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
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


function Compass() {
  const minor = [45, 135, 225, 315]
  const cardinals = [90, 180, 270]
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="cp-ring" x2={0.7} y2={1} stops={[[0, '#C896FF'], [0.45, '#8A55F2'], [1, '#4B22BA']]} />
        <Grad id="cp-face" x2={0.6} y2={1} stops={[[0, '#FFFFFF'], [1, '#E2D5FF']]} />
        <Grad id="cp-north" x2={1} y2={1} stops={[[0, '#FFD793'], [0.5, '#FF9B3D'], [1, '#EE6A1B']]} />
        <Grad id="cp-south" x2={1} y2={1} stops={[[0, '#8A6BE0'], [1, '#4B22BA']]} />
        {shade('cp-sh')}
      </defs>
      <Shadow id="cp" />
      <circle cx="60" cy="15" r="8.5" fill="none" stroke="#3A1A93" strokeWidth="4.5" />
      <path d="M53.5 12 Q56 8 61 7.6" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="68" r="42" fill="#3A1A93" />
      <circle cx="60" cy="63" r="42" fill="url(#cp-ring)" />
      <circle cx="60" cy="63" r="42" fill="url(#cp-sh)" />
      <circle cx="60" cy="63" r="34" fill="#2E1478" opacity="0.4" />
      <circle cx="60" cy="63" r="33" fill="url(#cp-face)" />
      <path d="M60 33 L55.5 42 H64.5 Z" fill="#EE6A1B" />
      {cardinals.map((a) => (
        <path key={a} d="M60 33 L56 41 H64 Z" fill="#6B3FA0" opacity="0.75" transform={`rotate(${a} 60 63)`} />
      ))}
      {minor.map((a) => (
        <rect key={a} x="58.8" y="35" width="2.4" height="5.5" rx="1.2" fill="#6B3FA0" opacity="0.5" transform={`rotate(${a} 60 63)`} />
      ))}
      <g transform="rotate(38 60 63)">
        <path d="M60 38 L67 63 L53 63 Z" fill="url(#cp-north)" />
        <path d="M60 88 L67 63 L53 63 Z" fill="url(#cp-south)" />
      </g>
      <circle cx="60" cy="63" r="5" fill="#fff" stroke="#6B3FA0" strokeWidth="2" />
      <path d="M24 50 Q30 34 48 26" stroke="#fff" strokeOpacity="0.7" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <circle cx="95" cy="38" r="1.8" fill="#fff" opacity="0.85" />
    </svg>
  )
}

function Robot() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="rb-head" x2={0.6} y2={1} stops={[[0, '#94C993'], [0.5, '#4A9664'], [1, '#215B3B']]} />
        <Grad id="rb-screen" x2={0.4} y2={1} stops={[[0, '#6E3FDB'], [1, '#2A1070']]} />
        <Grad id="rb-eye" stops={[[0, '#E8F5E0'], [1, '#7DBB84']]} />
        <Grad id="rb-ear" x2={1} y2={1} stops={[[0, '#C896FF'], [1, '#5A2EC8']]} />
        <Grad id="rb-ball" x2={1} y2={1} stops={[[0, '#FFE0A8'], [0.5, '#FFA24F'], [1, '#EE6A1B']]} />
        {shade('rb-sh')}
      </defs>
      <Shadow id="rb" />
      <path d="M60 28 V16" stroke="#3A1A93" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="60" cy="13" r="7" fill="url(#rb-ball)" />
      <circle cx="58" cy="11" r="2" fill="#fff" opacity="0.8" />
      <rect x="14" y="52" width="13" height="22" rx="6.5" fill="url(#rb-ear)" />
      <rect x="93" y="52" width="13" height="22" rx="6.5" fill="url(#rb-ear)" />
      <rect x="24" y="35" width="72" height="62" rx="18" fill="#1C4C33" />
      <rect x="24" y="30" width="72" height="62" rx="18" fill="url(#rb-head)" />
      <rect x="24" y="30" width="72" height="62" rx="18" fill="url(#rb-sh)" />
      <rect x="32" y="40" width="56" height="38" rx="12" fill="url(#rb-screen)" />
      <rect x="44" y="50" width="10" height="14" rx="5" fill="url(#rb-eye)" />
      <rect x="66" y="50" width="10" height="14" rx="5" fill="url(#rb-eye)" />
      <path d="M51 70 Q60 76 69 70" stroke="#AFD8A6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M36 44 Q44 41.5 56 42" stroke="#fff" strokeOpacity="0.35" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M30 36 Q44 31 60 32" stroke="#fff" strokeOpacity="0.65" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="90" cy="38" r="1.8" fill="#fff" opacity="0.85" />
    </svg>
  )
}

function Cap() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="cap-body" x2={0.7} y2={1} stops={[[0, '#9566F5'], [1, '#3F1BA6']]} />
        <Grad id="cap-board" x2={0.8} y2={1} stops={[[0, '#C896FF'], [0.5, '#8A55F2'], [1, '#4B22BA']]} />
        <Grad id="cap-tassel" x2={1} y2={1} stops={[[0, '#FFE0A8'], [0.5, '#FFA24F'], [1, '#EE6A1B']]} />
      </defs>
      <Shadow id="cap" />
      <path d="M32 56 V80 Q60 98 88 80 V56 L60 68 Z" fill="url(#cap-body)" />
      <path d="M32 56 L60 68 L88 56" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" fill="none" />
      <path d="M60 28 L108 50 L60 72 L12 50 Z" fill="#3A1A93" transform="translate(0 6)" />
      <path d="M60 28 L108 50 L60 72 L12 50 Z" fill="url(#cap-board)" strokeLinejoin="round" stroke="url(#cap-board)" strokeWidth="6" />
      <path d="M17 49 L58 31" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 50 L98 56 V76" stroke="#FFA24F" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="92" y="72" width="12" height="18" rx="4.5" fill="#B8470C" />
      <rect x="92" y="70" width="12" height="18" rx="4.5" fill="url(#cap-tassel)" />
      <circle cx="60" cy="50" r="5.5" fill="url(#cap-tassel)" />
      <circle cx="58.5" cy="48.5" r="1.6" fill="#fff" opacity="0.8" />
      <circle cx="22" cy="42" r="1.8" fill="#fff" opacity="0.85" />
    </svg>
  )
}


function Boot() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="bt-upper" x2={0.6} y2={1} stops={[[0, '#A2D19D'], [0.5, '#4A9664'], [1, '#215B3B']]} />
        <Grad id="bt-sole" stops={[[0, '#B58CFF'], [1, '#6232D4']]} />
        <Grad id="bt-cuff" x2={1} y2={1} stops={[[0, '#C896FF'], [1, '#5A2EC8']]} />
        <Grad id="bt-tab" x2={1} y2={1} stops={[[0, '#FFD08A'], [1, '#EE6A1B']]} />
        {shade('bt-sh')}
      </defs>
      <Shadow id="bt" />
      <rect x="12" y="89" width="98" height="15" rx="7.5" fill="#2A1070" />
      <path d="M30 20 H62 V46 Q62 57 76 61 Q108 67 110 88 H20 V32 Q20 20 30 20 Z" fill="url(#bt-upper)" />
      <path d="M30 20 H62 V46 Q62 57 76 61 Q108 67 110 88 H20 V32 Q20 20 30 20 Z" fill="url(#bt-sh)" />
      <rect x="12" y="84" width="98" height="14" rx="7" fill="url(#bt-sole)" />
      <rect x="26" y="14" width="40" height="13" rx="6.5" fill="#2A1070" transform="translate(0 3)" />
      <rect x="26" y="14" width="40" height="13" rx="6.5" fill="url(#bt-cuff)" />
      <rect x="14" y="34" width="9" height="16" rx="4.5" fill="url(#bt-tab)" />
      <path d="M36 36 L56 40 M36 46 L56 50 M38 56 L58 60" stroke="#fff" strokeWidth="4.6" strokeLinecap="round" />
      <path d="M28 30 Q27 52 29 76" stroke="#fff" strokeOpacity="0.6" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="98" cy="88" r="1.6" fill="#fff" opacity="0.8" />
    </svg>
  )
}

function Goggles() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="gg-strap" stops={[[0, '#8F5BF2'], [1, '#3F1BA6']]} />
        <Grad id="gg-frame" x2={0.6} y2={1} stops={[[0, '#94C993'], [0.5, '#4A9664'], [1, '#215B3B']]} />
        <Grad id="gg-lens" x2={1} y2={1} stops={[[0, '#D7ECCC'], [0.45, '#8A55F2'], [1, '#3F1BA6']]} />
        <Grad id="gg-acc" stops={[[0, '#FFD08A'], [1, '#EE6A1B']]} />
        {shade('gg-sh')}
      </defs>
      <Shadow id="gg" />
      <rect x="6" y="48" width="108" height="28" rx="14" fill="url(#gg-strap)" />
      <rect x="10" y="56" width="22" height="8" rx="4" fill="#fff" opacity="0.18" />
      <rect x="90" y="57" width="20" height="7" rx="3.5" fill="url(#gg-acc)" />
      <rect x="18" y="36" width="84" height="56" rx="24" fill="#1C4C33" />
      <rect x="18" y="30" width="84" height="56" rx="24" fill="url(#gg-frame)" />
      <rect x="18" y="30" width="84" height="56" rx="24" fill="url(#gg-sh)" />
      <rect x="27" y="39" width="66" height="38" rx="17" fill="#2A1070" opacity="0.5" />
      <rect x="28" y="40" width="64" height="36" rx="16" fill="url(#gg-lens)" />
      <path d="M36 50 Q44 44 58 45" stroke="#fff" strokeOpacity="0.8" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M70 70 Q80 68 86 60" stroke="#fff" strokeOpacity="0.4" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M26 36 Q40 30 60 31" stroke="#fff" strokeOpacity="0.6" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function Tent() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="tn-front" x2={0.5} y2={1} stops={[[0, '#94C993'], [0.5, '#4A9664'], [1, '#23603E']]} />
        <Grad id="tn-side" x2={1} y2={1} stops={[[0, '#B58CFF'], [1, '#5A2EC8']]} />
        <Grad id="tn-flap" stops={[[0, '#BADEAD'], [1, '#529D6A']]} />
        <Grad id="tn-flag" x2={1} y2={1} stops={[[0, '#FFD08A'], [1, '#EE6A1B']]} />
      </defs>
      <Shadow id="tn" />
      <rect x="8" y="90" width="104" height="11" rx="5.5" fill="#2A1070" />
      <path d="M60 22 L110 92 H66 Z" fill="url(#tn-side)" />
      <path d="M60 22 L10 92 H68 Z" fill="url(#tn-front)" />
      <path d="M52 92 L61 56 L74 92 Z" fill="#1E0C57" opacity="0.9" />
      <path d="M61 56 L50 92 H60 Z" fill="url(#tn-flap)" />
      <path d="M60 22 V8" stroke="#2A1070" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M60 8 L74 13 L60 18 Z" fill="url(#tn-flag)" />
      <path d="M57 28 L22 82" stroke="#fff" strokeOpacity="0.65" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="98" cy="86" r="1.6" fill="#fff" opacity="0.8" />
    </svg>
  )
}

function Disc() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="ds-rim" x2={0.7} y2={1} stops={[[0, '#C896FF'], [0.5, '#8A55F2'], [1, '#4B22BA']]} />
        <Grad id="ds-top" x2={0.7} y2={1} stops={[[0, '#CCE7C1'], [0.5, '#65AB77'], [1, '#297148']]} />
        <Grad id="ds-core" x2={1} y2={1} stops={[[0, '#FFD08A'], [1, '#EE6A1B']]} />
      </defs>
      <Shadow id="ds" />
      <path d="M8 90 Q32 100 58 94" stroke="#8A55F2" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M16 98 Q34 105 52 101" stroke="#8A55F2" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" fill="none" />
      <g transform="rotate(-14 62 56)">
        <ellipse cx="62" cy="68" rx="46" ry="23" fill="#2A1070" />
        <ellipse cx="62" cy="60" rx="46" ry="23" fill="url(#ds-rim)" />
        <ellipse cx="62" cy="58" rx="37" ry="17" fill="url(#ds-top)" />
        <ellipse cx="62" cy="58" rx="24" ry="10" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="3" />
        <ellipse cx="62" cy="58" rx="11" ry="4.6" fill="url(#ds-core)" />
        <path d="M24 52 Q34 40 54 38" stroke="#fff" strokeOpacity="0.8" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      </g>
      <circle cx="102" cy="34" r="1.8" fill="#fff" opacity="0.85" />
    </svg>
  )
}

function Pumpkin() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="pk-body" x2={0.7} y2={1} stops={[[0, '#D2A8FF'], [0.45, '#9A63F5'], [1, '#4B22BA']]} />
        <Grad id="pk-side" x2={0.7} y2={1} stops={[[0, '#B88AFF'], [1, '#3F1BA6']]} />
        <Grad id="pk-stem" x2={1} y2={1} stops={[[0, '#7DBB84'], [1, '#215B3B']]} />
        <Grad id="pk-glow" stops={[[0, '#FFF0B8'], [0.5, '#FFB44D'], [1, '#FF7A22']]} />
        {shade('pk-sh')}
      </defs>
      <Shadow id="pk" />
      <ellipse cx="34" cy="68" rx="26" ry="32" fill="url(#pk-side)" />
      <ellipse cx="86" cy="68" rx="26" ry="32" fill="url(#pk-side)" />
      <ellipse cx="60" cy="68" rx="25" ry="35" fill="url(#pk-body)" />
      <ellipse cx="60" cy="68" rx="25" ry="35" fill="url(#pk-sh)" />
      <path d="M54 34 Q54 18 68 14 L72 22 Q64 24 64 34 Z" fill="url(#pk-stem)" />
      <path d="M41 58 L53 58 L47 70 Z" fill="url(#pk-glow)" />
      <path d="M67 58 L79 58 L73 70 Z" fill="url(#pk-glow)" />
      <path d="M42 80 Q60 96 78 80 L73 77 L68 84 L60 78 L52 84 L47 77 Z" fill="#1E0C57" />
      <path d="M47.5 80.5 Q60 92 72.5 80.5 L68 83.5 L60 78.5 L52 83.5 Z" fill="url(#pk-glow)" />
      <path d="M24 52 Q30 36 46 32" stroke="#fff" strokeOpacity="0.65" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="44" r="1.8" fill="#fff" opacity="0.85" />
    </svg>
  )
}

function Dog() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="dg-head" x2={0.6} y2={1} stops={[[0, '#D2A8FF'], [0.5, '#9A63F5'], [1, '#5A2EC8']]} />
        <Grad id="dg-acc" x2={1} y2={1} stops={[[0, '#FFD08A'], [1, '#EE6A1B']]} />
        <Grad id="dg-collar" stops={[[0, '#94C993'], [1, '#215B3B']]} />
        <Grad id="dg-ear" x2={1} y2={1} stops={[[0, '#6E3FDB'], [1, '#2A1070']]} />
        <Grad id="dg-snout" stops={[[0, '#FFF7EA'], [1, '#FFE0B8']]} />
        {shade('dg-sh')}
      </defs>
      <Shadow id="dg" />
      <path d="M26 34 Q8 52 18 84 Q36 80 40 52 Z" fill="url(#dg-ear)" />
      <path d="M94 34 Q112 52 102 84 Q84 80 80 52 Z" fill="url(#dg-ear)" />
      <ellipse cx="60" cy="62" rx="38" ry="38" fill="#2A1070" transform="translate(0 4)" />
      <ellipse cx="60" cy="58" rx="38" ry="38" fill="url(#dg-head)" />
      <ellipse cx="60" cy="58" rx="38" ry="38" fill="url(#dg-sh)" />
      <path d="M32 90 Q60 106 88 90 L86 98 Q60 112 34 98 Z" fill="url(#dg-collar)" />
      <circle cx="60" cy="104" r="5.5" fill="url(#dg-acc)" />
      <ellipse cx="60" cy="74" rx="21" ry="16" fill="url(#dg-snout)" />
      <circle cx="46" cy="52" r="5.4" fill="#2A1070" />
      <circle cx="74" cy="52" r="5.4" fill="#2A1070" />
      <circle cx="44.4" cy="50.4" r="1.8" fill="#fff" />
      <circle cx="72.4" cy="50.4" r="1.8" fill="#fff" />
      <path d="M52 76 Q60 94 68 76 Q60 80 52 76 Z" fill="url(#dg-acc)" />
      <path d="M60 70 V76 M60 76 Q54 82 48 78 M60 76 Q66 82 72 78" stroke="#2A1070" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="67" rx="9" ry="6.4" fill="#2A1070" />
      <ellipse cx="57" cy="65" rx="3" ry="1.8" fill="#fff" opacity="0.6" />
      <path d="M30 40 Q38 26 54 22" stroke="#fff" strokeOpacity="0.6" strokeWidth="3.4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function Flame() {
  return (
    <svg viewBox="0 0 120 120" focusable="false">
      <defs>
        <Grad id="fl-out" stops={[[0, '#D2A8FF'], [0.45, '#8A55F2'], [1, '#4B22BA']]} />
        <Grad id="fl-in" stops={[[0, '#FFF3C2'], [0.5, '#FFC247'], [1, '#FF8A2A']]} />
        <Grad id="fl-log" stops={[[0, '#94C993'], [1, '#215B3B']]} />
      </defs>
      <Shadow id="fl" />
      <rect x="16" y="98" width="88" height="13" rx="6.5" fill="url(#fl-log)" transform="rotate(-7 60 104)" />
      <rect x="16" y="98" width="88" height="13" rx="6.5" fill="url(#fl-log)" transform="rotate(7 60 104)" />
      <circle cx="104" cy="104" r="0" fill="none" />
      <path d="M60 6 C71 28 95 40 95 70 C95 91 80 103 60 103 C40 103 25 91 25 70 C25 54 34 46 42 38 C43 51 49 56 54 56 C51 38 53 22 60 6 Z" fill="url(#fl-out)" />
      <path d="M60 48 C67 60 79 66 79 82 C79 94 71 100 60 100 C49 100 41 94 41 82 C41 71 49 67 54 59 C57 67 61 67 61 67 C58 60 58 54 60 48 Z" fill="url(#fl-in)" />
      <path d="M34 62 Q36 50 44 42" stroke="#fff" strokeOpacity="0.6" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="90" cy="46" r="1.8" fill="#fff" opacity="0.85" />
    </svg>
  )
}

const ICONS = { elearning: ELearning, videos: Videos, guides: Guides, techstack: TechStack, compass: Compass, robot: Robot, cap: Cap, boot: Boot, goggles: Goggles, tent: Tent, disc: Disc, pumpkin: Pumpkin, dog: Dog, flame: Flame }

export type IconName = keyof typeof ICONS

export function Icon3D({ name, size }: { name: IconName; size?: 'sm' | 'xs' }) {
  const Svg = ICONS[name]
  return (
    <span className={`icon3d${size ? ` icon3d--${size}` : ''}`} aria-hidden="true">
      <Svg />
    </span>
  )
}
