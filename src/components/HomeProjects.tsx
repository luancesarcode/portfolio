import { ArrowUpRight } from 'lucide-react'
import {
  applications,
  ecaseGallery,
  mercosulAnprGallery,
  radiationGallery,
} from '../data/portfolio'
import { publicPath } from '../utils/paths'

const projectCovers: Record<(typeof applications)[number]['diagram'], string> = {
  radiation: radiationGallery[0].src,
  anpr: mercosulAnprGallery[0].src,
  scada: publicPath('assets/elipse.jpeg'),
  combustion: publicPath('assets/automacao-clp-tia-portal.webp'),
  web: publicPath('assets/site-rad.jpeg'),
  education: ecaseGallery[0].src,
}

export function HomeProjects() {
  const projectsPage = publicPath('projetos.html')
  const summarizedProjects = applications

  return (
    <section id="aplicacoes" className="home-projects-section section-pad" aria-labelledby="home-projects-title">
      <div className="site-container">
        <header className="home-projects-heading" data-reveal>
          <div>
            <h2 id="home-projects-title">Projetos</h2>
          </div>
          <a className="home-projects-link" href={projectsPage}>
            Visualização completa <ArrowUpRight aria-hidden="true" />
          </a>
        </header>

        <div className="project-preview-grid">
          {summarizedProjects.map((project) => (
            <a
              className="project-preview-card"
              href={`${projectsPage}#${project.slug}`}
              key={project.slug}
              aria-label={`Abrir detalhes de ${project.title}`}
              data-reveal
            >
              <figure className="project-preview-media">
                <div className="project-preview-frame">
                  <div className="project-preview-image">
                    <img
                      src={projectCovers[project.diagram]}
                      alt=""
                      width="1040"
                      height="650"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <span className="project-preview-corner project-preview-corner-a" aria-hidden="true" />
                <span className="project-preview-corner project-preview-corner-b" aria-hidden="true" />
                <span className="project-preview-corner project-preview-corner-c" aria-hidden="true" />
                <span className="project-preview-corner project-preview-corner-d" aria-hidden="true" />
                <span className="project-preview-open" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </figure>
              <div className="project-preview-copy">
                <h3>{project.title}</h3>
                <p>{project.context}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
