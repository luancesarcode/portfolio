import { ArrowUpRight, Github } from 'lucide-react'
import { applications, ecaseGallery, mercosulAnprGallery, radiationGallery } from '../data/portfolio'
import { publicPath } from '../utils/paths'
import { ExpandableApplicationImage } from './ImageExpand'
import { ProjectGallery } from './ProjectGallery'
import { SectionHeading } from './SectionHeading'

type ProjectCatalogProps = {
  standalone?: boolean
}

export function ProjectCatalog({ standalone = false }: ProjectCatalogProps) {
  return (
    <section
      id="aplicacoes"
      className={`applications-section section-pad ${standalone ? 'projects-catalog-page' : ''}`}
    >
      <div className="site-container">
        <SectionHeading code="" title="Projetos e aplicações" />

        <div className="applications-list">
          {applications.map((application, index) => (
            <article
              id={application.slug}
              className={`application-study ${index === 0 ? 'application-featured' : ''}`}
              key={application.slug}
              data-reveal
            >
              <div className={`application-visual ${application.diagram === 'anpr' || application.diagram === 'radiation' || application.diagram === 'education' ? 'application-visual-gallery' : ''}`}>
                {application.code !== 'CV/ANPR' && application.code !== 'SCADA/UI' && application.code !== 'SENS/RAD' && application.code !== 'CLP/AUTO' && application.code !== 'ECAS/EDU' && <span className="application-code">{application.code}</span>}
                {application.diagram === 'anpr' ? (
                  <ProjectGallery images={mercosulAnprGallery} label="Galeria do projeto Mercosul ANPR" />
                ) : application.diagram === 'scada' ? (
                  <ExpandableApplicationImage src={publicPath('assets/elipse.jpeg')} alt="Tela SCADA Elipse E3 Studio" />
                ) : application.diagram === 'radiation' ? (
                  <ProjectGallery images={radiationGallery} label="Galeria do monitoramento de radiação ionizante" />
                ) : application.diagram === 'combustion' ? (
                  <ExpandableApplicationImage src={publicPath('assets/automacao-clp-tia-portal.webp')} alt="Tela do TIA Portal com blocos de programação de CLP" />
                ) : application.diagram === 'education' ? (
                  <ProjectGallery images={ecaseGallery} label="Galeria do Projeto ECASE" />
                ) : application.diagram === 'web' ? (
                  <a href="https://radinstruments.com.br/" target="_blank" rel="noopener noreferrer" className="application-link" aria-label="Abrir site da RAD Instruments em nova aba">
                    <img src={publicPath('assets/site-rad.jpeg')} alt="Site da RAD Instruments" className="application-diagram" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
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
                {'repository' in application && (
                  <a className="project-repository-link" href={application.repository} target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden="true" />
                    Ver repositório
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
                <ul className="tag-list" aria-label="Tecnologias relacionadas">
                  {application.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
