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
import { ExpandableApplicationImage } from './components/ImageExpand'
import { Header } from './components/Header'
import { ProjectGallery } from './components/ProjectGallery'
import { SectionHeading } from './components/SectionHeading'
import {
  academicExperience,
  applications,
  complementaryEducation,
  ecaseGallery,
  professionalExperience,
  profile,
  radiationGallery,
  skillGroups,
} from './data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const pageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (reduceMotion) return

      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTimeline
        .from('.site-header', { opacity: 0, duration: 0.35 })
        .from('.hero-reveal', { y: 24, opacity: 0, duration: 0.55, stagger: 0.05 }, '-=0.2')
        .from('.portrait-panel', { x: 28, opacity: 0, duration: 0.65 }, '-=0.5')

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 86%',
            once: true,
          },
        })
      })

    }, page)

    return () => context.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />

      <main id="conteudo" className="page-shell">
        <section id="inicio" className="hero site-container" aria-labelledby="hero-title">
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
            <div className="portrait-header">
              <span>REF. LC - UFPE</span>
            </div>
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
                <span className="record-status">EXPERIÊNCIA CONCLUÍDA</span>
                <p>{professionalExperience.period}</p>
                <p>{professionalExperience.context}</p>
              </div>
              <div className="experience-main">
                <span className="company-index">RAD</span>
                <h3>{professionalExperience.company}</h3>
                <p className="experience-role">{professionalExperience.role}</p>
                <ul className="technical-list">
                  {professionalExperience.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="aplicacoes" className="applications-section section-pad">
          <div className="site-container">
            <SectionHeading
               code=""
              title="Projetos e aplicações"
              intro="Estudos de aplicação construídos somente a partir de experiências e formações verificadas — sem projetos ou resultados inventados."
            />

            <div className="applications-list">
              {applications.map((application, index) => (
                <article className={`application-study ${index === 0 ? 'application-featured' : ''}`} key={application.title} data-reveal>
                  <div className={`application-visual ${application.diagram === 'radiation' || application.diagram === 'education' ? 'application-visual-gallery' : ''}`}>
                    {application.code !== 'SCADA/UI' && application.code !== 'SENS/RAD' && application.code !== 'CLP/AUTO' && application.code !== 'ECAS/EDU' && <span className="application-code">{application.code}</span>}
                    {application.diagram === 'scada' ? (
                      <ExpandableApplicationImage src="/assets/elipse.jpeg" alt="Tela SCADA Elipse E3 Studio" />
                    ) : application.diagram === 'radiation' ? (
                      <ProjectGallery images={radiationGallery} label="Galeria do monitoramento de radiação ionizante" />
                    ) : application.diagram === 'combustion' ? (
                      <ExpandableApplicationImage src="/assets/automacao-clp-tia-portal.webp" alt="Tela do TIA Portal com blocos de programação de CLP" />
                    ) : application.diagram === 'education' ? (
                      <ProjectGallery images={ecaseGallery} label="Galeria do Projeto ECASE" />
                    ) : application.diagram === 'web' ? (
                      <a href="https://radinstruments.com.br/" target="_blank" rel="noopener noreferrer" className="application-link" aria-label="Abrir site da RAD Instruments em nova aba">
                        <img src="/assets/site-rad.jpeg" alt="Site da RAD Instruments" className="application-diagram" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
                      </a>
                    ) : null}
                  </div>
                  <div className="application-copy">
                    <h3>{application.title}</h3>
                    <p>{application.context}</p>
                    <dl>
                      <dt>PARTICIPAÇÃO</dt>
                      <dd>{application.contribution}</dd>
                    </dl>
                    <ul className="tag-list" aria-label="Tecnologias relacionadas">
                      {application.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="formacao" className="education-section section-pad">
          <div className="site-container">
            <SectionHeading
               code=""
              title="Formação"
              intro="Base acadêmica e aprofundamentos que conectam controle, supervisão e processos físicos."
            />

            <div className="degree-block" data-reveal>
              <div className="degree-symbol">
                <img src="/assets/brasao-ufpe-sem-texto.png" alt="Brasão da Universidade Federal de Pernambuco" />
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

            <div className="complementary-grid">
              <div className="complementary-intro" data-reveal>
                <span className="mono-label">FORMAÇÃO COMPLEMENTAR</span>
                <p>Do sinal de campo à tela supervisória.</p>
              </div>
              <div className="course-stack">
                {complementaryEducation.map((course) => (
                  <article key={course.title} data-reveal>
                    <div className="course-node" aria-hidden="true" />
                    <span>{course.institution}</span>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="academia" className="academic-section section-pad">
          <div className="site-container academic-grid">
            <SectionHeading
               code=""
              title="Experiência acadêmica"
              intro="Tecnologia, comunicação e formação compartilhada dentro da comunidade UFPE."
              inverse
            />
            <div className="academic-records">
              {academicExperience.map((experience) => (
                <article key={experience.organization} data-reveal>
                  <h3>{experience.organization}</h3>
                  {experience.roles.map((role) => <p className="academic-role" key={role}>{role}</p>)}
                  <ul className="technical-list">
                    {experience.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="competencias" className="skills-section section-pad">
          <div className="site-container">
            <SectionHeading
               code=""
              title="Competências"
              intro="Ferramentas organizadas por domínio, sem níveis artificiais ou porcentagens."
            />
            <div className="skills-matrix">
              {skillGroups.map((group) => (
                <article key={group.code} data-reveal>
                  <div className="skill-heading">
                    <span>{group.code}</span>
                    <h3>{group.label}</h3>
                  </div>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

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

      <footer className="site-footer">
        <div className="site-container">
          <p>© {new Date().getFullYear()} {profile.shortName}</p>
          <p>ENGENHARIA EM MALHA FECHADA</p>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
