import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './components/Header'
import { ProjectCatalog } from './components/ProjectCatalog'
import { SiteFooter } from './components/SiteFooter'
import { publicPath } from './utils/paths'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const useLightReveals = window.matchMedia('(max-width: 860px), (pointer: coarse)').matches
    const context = gsap.context(() => {
      if (reduceMotion) return

      gsap.from('.site-header', { opacity: 0, duration: 0.35, ease: 'power2.out' })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: useLightReveals ? 12 : 20, opacity: useLightReveals ? 1 : 0.68 },
          {
            y: 0,
            opacity: 1,
            duration: useLightReveals ? 0.32 : 0.5,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: element,
              start: 'top 96%',
              once: true,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })
    }, page)

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250)
    const hashTimer = window.setTimeout(() => {
      const targetId = decodeURIComponent(window.location.hash.slice(1))
      if (targetId) document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    }, 350)

    return () => {
      window.clearTimeout(refreshTimer)
      window.clearTimeout(hashTimer)
      context.revert()
    }
  }, [])

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header currentPage="projects" />
      <main id="conteudo" className="page-shell projects-page-shell">
        <ProjectCatalog standalone />
      </main>
      <SiteFooter homeHref={publicPath('')} />
    </div>
  )
}
