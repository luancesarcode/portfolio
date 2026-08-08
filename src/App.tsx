import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react'
import { Header } from './components/Header'
import { HomeProjects } from './components/HomeProjects'
import DotField from './components/DotField'
import { SectionHeading } from './components/SectionHeading'
import { SiteFooter } from './components/SiteFooter'
import { publicPath } from './utils/paths'
import { professionalExperience, profile } from './data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const pageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const useLightReveals = window.matchMedia('(max-width: 860px), (pointer: coarse)').matches
    const context = gsap.context(() => {
      if (reduceMotion) return

      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTimeline
        .from('.site-header', { opacity: 0, duration: 0.35 })
        .from('.hero-reveal', { y: 24, opacity: 0, duration: 0.55, stagger: 0.05 }, '-=0.2')
        .from('.portrait-panel', { x: 28, opacity: 0, duration: 0.65 }, '-=0.5')

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: useLightReveals ? 12 : 20,
            opacity: useLightReveals ? 1 : 0.68,
          },
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

    return () => {
      window.clearTimeout(refreshTimer)
      context.revert()
    }
  }, [])

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />

      <main id="conteudo" className="page-shell">
        <section id="inicio" className="hero site-container" aria-labelledby="hero-title">
          <div className="hero-binary-field" aria-hidden="true">
            <DotField
              fontSize={10}
              glyphSpacing={18}
              cursorRadius={280}
              bulgeStrength={24}
              glowRadius={180}
              gradientFrom="rgba(20, 63, 54, 0.26)"
              gradientTo="rgba(119, 201, 194, 0.34)"
              glowColor="rgba(119, 201, 194, 0.24)"
            />
          </div>

          <div className="hero-copy">

            <h1 id="hero-title" className="hero-reveal">
              Entre <em>circuitos</em>, códigos e soluções.
            </h1>
            <p className="hero-intro hero-reveal">
              Desenvolvo soluções unindo automação industrial, instrumentação, eletrônica e programação.
            </p>

            <div className="hero-actions hero-reveal">
              <a className="button button-primary" href="#experiencia">
                Ver minha trajetória <ArrowDown aria-hidden="true" />
              </a>
              <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" /> Acessar GitHub
              </a>
              <a className="text-link" href={profile.curriculum} download="curriculo-luan-cesar.pdf">
                <Download aria-hidden="true" /> Baixar currículo
              </a>
            </div>

            <dl className="quick-data hero-reveal">
              <div>
                <dt>BASE</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>FORMAÇÃO</dt>
                <dd>Previsão · {profile.graduation}</dd>
              </div>
              <div>
                <dt>FOCO</dt>
                <dd>Automação · Controle · Instrumentação</dd>
              </div>
            </dl>
          </div>

          <div className="portrait-panel">
            <div className="portrait-stack">
              <div className="portrait-frame">
                <span className="corner corner-a" aria-hidden="true" />
                <span className="corner corner-b" aria-hidden="true" />
                <span className="corner corner-c" aria-hidden="true" />
                <span className="corner corner-d" aria-hidden="true" />
                <img
                  src={profile.photo}
                  alt="Retrato de Luan César"
                  width="600"
                  height="600"
                  fetchPriority="high"
                />
                <div className="portrait-caption">
                  <strong>{profile.name}</strong>
                  <span>{profile.role}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="about-section section-pad">
          <div className="site-container about-grid">
            <div data-reveal>
              <p className="about-lead">
                Sou estudante de Engenharia de Controle e Automação na Universidade Federal de Pernambuco, com experiência prática em instrumentação, automação, eletrônica e desenvolvimento de software.
              </p>
              <p className="about-support">
                Tenho interesse em criar soluções que aproximem sistemas físicos, programação e monitoramento de processos.
              </p>
            </div>

            <div id="formacao" className="degree-block" data-reveal>
              <div className="degree-symbol">
                <img src={publicPath('assets/brasao-ufpe-sem-texto.png')} alt="Brasão da Universidade Federal de Pernambuco" />
              </div>
              <div>
                <p className="mono-label">MAIO.2022 — ATUAL</p>
                <h3>Engenharia de Controle e Automação</h3>
                <p className="degree-institution">Universidade Federal de Pernambuco</p>
                <p>Previsão de conclusão: dezembro de 2027</p>
              </div>
              <ul className="degree-areas">
                <li>Automação industrial</li>
                <li>Instrumentação</li>
                <li>Eletrônica</li>
                <li>Programação</li>
                <li>Sistemas de controle</li>
                <li>Sistemas digitais</li>
                <li>Eletrônica de potência</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="experiencia" className="experience-section section-pad">
          <div className="site-container">
            <SectionHeading
               code=""
              title="Experiência profissional"
              intro="Uma passagem pela tecnologia nuclear em que software, instrumentação e bancada fizeram parte do mesmo processo."
              inverse
            />

            <article className="experience-record" data-reveal>
              <div className="experience-meta">
                <span className="record-status">
                  <span aria-hidden="true" />
                  Experiência concluída
                </span>
                <dl className="experience-details">
                  <div>
                    <dt>Período</dt>
                    <dd>{professionalExperience.period}</dd>
                  </div>
                  <div>
                    <dt>Contexto</dt>
                    <dd>{professionalExperience.context}</dd>
                  </div>
                </dl>
              </div>
              <div className="experience-main">
                <div className="experience-company">
                  <span className="company-index" aria-hidden="true">
                    <img src={publicPath('assets/rad-trefoil.svg')} alt="" />
                  </span>
                  <div>
                    <h3>{professionalExperience.company}</h3>
                    <p className="experience-role">{professionalExperience.role}</p>
                  </div>
                </div>
                <div className="experience-activities">
                  <p className="experience-activities-label">Principais atividades</p>
                  <ul className="technical-list">
                    {professionalExperience.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

        <HomeProjects />

        <section id="contato" className="contact-section section-pad">
          <div className="site-container contact-grid">
            <div data-reveal>
              <h2>Vamos transformar uma ideia em um sistema que funcione?</h2>
            </div>
            <div className="contact-panel" data-reveal>
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" />
                <span><small>E-MAIL</small>{profile.email}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" />
                <span><small>GITHUB</small>@luancesarcode</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin aria-hidden="true" />
                <span><small>LINKEDIN</small>Luan César</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <p><MapPin aria-hidden="true" /> {profile.location}</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
