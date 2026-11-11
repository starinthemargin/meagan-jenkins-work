import { useEffect, useState } from 'react'

// Tiny hash router (#/work, #/about, ...). Works on any static host with no redirect rules.
export type Page = 'home' | 'work' | 'tech-stack' | 'about'

const aliases: Record<string, { page: Page; tab?: string }> = {
  '': { page: 'home' },
  work: { page: 'work' },
  'program-design': { page: 'work', tab: 'cases' },
  elearning: { page: 'work', tab: 'elearning' },
  'instructional-videos': { page: 'work', tab: 'videos' },
  'instructional-guides': { page: 'work', tab: 'guides' },
  'help-center': { page: 'work', tab: 'help-center' },
  'tech-stack': { page: 'tech-stack' },
  about: { page: 'about' },
  'about-7': { page: 'about' },
}

function parse() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [path, query = ''] = raw.split('?')
  const hit = aliases[path.replace(/\/$/, '')] ?? aliases['']
  const tab = new URLSearchParams(query).get('tab') ?? hit.tab
  return { page: hit.page, tab: tab ?? undefined, open: new URLSearchParams(query).get('open') ?? undefined }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onChange = () => {
      setRoute(parse())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
