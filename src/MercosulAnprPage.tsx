import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ShieldCheck,
} from 'lucide-react'
import { Header } from './components/Header'
import { SiteFooter } from './components/SiteFooter'
import { publicPath } from './utils/paths'

gsap.registerPlugin(ScrollTrigger)

const media = {
  detector: publicPath('assets/mercosul-anpr/detector-resultado.webp'),
  realDataset: publicPath('assets/mercosul-anpr/dataset-real-galeria.jpeg'),
  bboxNight: publicPath('assets/mercosul-anpr/bbox-noturno.jpg'),
  syntheticDataset: publicPath('assets/mercosul-anpr/dataset-sintetico.jpeg'),
  syntheticPlate: publicPath('assets/mercosul-anpr/placa-sintetica.png'),
  upload: publicPath('assets/mercosul-anpr/interface-upload.webp'),
  realtime: publicPath('assets/mercosul-anpr/camera-tempo-real.webp'),
  result: publicPath('assets/mercosul-anpr/interface-resultado.webp'),
}

const inferenceFlow = [
  {
    tag: '01 / INPUT',
    title: 'Imagem, vídeo ou câmera',
    text: 'A mesma camada de aplicação recebe arquivos e frames ao vivo, mantendo o processamento local.',
  },
  {
    tag: '02 / DETECÇÃO',
    title: 'Veículo e placa com YOLO',
    text: 'Um detector localiza veículos; outro busca a placa no ROI e conserva fallback para placa isolada.',
  },
  {
    tag: '03 / PREPARO',
    title: 'Recorte e normalização',
    text: 'OpenCV aplica upscale controlado, CLAHE, binarização e correção de inclinação antes da leitura.',
  },
  {
    tag: '04 / OCR',
    title: 'Leitura e regras brasileiras',
    text: 'PaddleOCR avalia variantes e o formato LLLNLNN orienta correções contextuais rastreáveis.',
  },
  {
    tag: '05 / CONSENSO',
    title: 'Tracking e voto temporal',
    text: 'A associação por IoU acompanha o veículo e consolida leituras repetidas ao longo dos frames.',
  },
  {
    tag: '06 / OUTPUT',
    title: 'Overlay, JSON e CSV',
    text: 'O resultado final reúne imagem anotada, placa, confiança, track e artefatos estruturados.',
  },
]

const technologies = [
  ['Python 3.10 / 3.11', 'Base do fluxo de execução, CLI, API e automações de dataset.'],
  ['YOLO + Ultralytics', 'Detecção de veículos e placas com pesos locais.'],
  ['PyTorch + CUDA', 'Inferência dos detectores em CPU ou GPU NVIDIA.'],
  ['OpenCV + NumPy', 'Geometria, recorte, contraste, binarização e composição sintética.'],
  ['PaddleOCR', 'Reconhecimento dos caracteres em múltiplas variantes da placa.'],
  ['FastAPI + Uvicorn', 'API local, jobs assíncronos e sessões de câmera em tempo real.'],
]

const repositories = [
  {
    index: 'R/01',
    name: 'mercosul-anpr',
    description: 'Aplicação final: detecção, OCR, tracking, API, CLI e interface web local.',
    href: 'https://github.com/luancesarcode/mercosul-anpr',
  },
  {
    index: 'R/02',
    name: 'visualizador-bbox-yolo',
    description: 'Ferramenta gráfica para revisar imagens, labels e bounding boxes no formato YOLO.',
    href: 'https://github.com/luancesarcode/visualizador-bbox-yolo',
  },
  {
    index: 'R/03',
    name: 'gerador-sintetico-placas-mercosul-yolo',
    description: 'Geração de placas sintéticas, cenários variados e anotações de placa e caractere.',
    href: 'https://github.com/luancesarcode/gerador-sintetico-placas-mercosul-yolo',
  },
]

export default function MercosulAnprPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (reduceMotion) return

      gsap.from('[data-anpr-intro] > *', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      })
      gsap.from('[data-anpr-media]', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power3.inOut',
        delay: 0.12,
      })
      gsap.utils.toArray<HTMLElement>('[data-anpr-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 28,
          opacity: 0,
          duration: 0.58,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            once: true,
          },
        })
      })
    }, page)

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250)
    return () => {
      window.clearTimeout(refreshTimer)
      context.revert()
    }
  }, [])

  return (
    <div ref={pageRef} className="anpr-page">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header currentPage="projects" />

      <main id="conteudo">
        <section className="anpr-hero" aria-labelledby="anpr-title">
          <div className="anpr-shell">
            <a className="anpr-back" href={publicPath('projetos.html#mercosul-anpr')}>
              <ArrowLeft aria-hidden="true" /> Voltar para projetos
            </a>

            <div className="anpr-hero-grid">
              <div className="anpr-hero-copy" data-anpr-intro>
                <p className="anpr-kicker">CASE STUDY / VISÃO COMPUTACIONAL</p>
                <h1 id="anpr-title">Mercosul <span>ANPR</span></h1>
                <p className="anpr-lead">
                  Sistema de visão computacional para detecção de veículos e reconhecimento de placas brasileiras em imagens, vídeos e câmera ao vivo.
                </p>
                <div className="anpr-actions">
                  <a className="anpr-primary-link" href="https://github.com/luancesarcode/mercosul-anpr" target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden="true" /> Ver código <ArrowUpRight aria-hidden="true" />
                  </a>
                  <a className="anpr-text-link" href="#metodo">Entender o fluxo ↓</a>
                </div>
                <ul className="anpr-status-list" aria-label="Informações do projeto">
                  <li><span>STATUS</span> Alpha / v0.1.0</li>
                  <li><span>EXECUÇÃO</span> Local-first</li>
                  <li><span>LICENÇA</span> MIT</li>
                </ul>
              </div>

              <figure className="anpr-hero-media" data-anpr-media>
                <img src={media.detector} alt="Veículo com caixas de detecção sobre o carro e a placa Mercosul reconhecida como GGC8H75" width="636" height="418" fetchPriority="high" />
                <span className="anpr-scan-line" aria-hidden="true" />
                <span className="anpr-frame-corner anpr-frame-corner-a" aria-hidden="true" />
                <span className="anpr-frame-corner anpr-frame-corner-b" aria-hidden="true" />
                <span className="anpr-frame-corner anpr-frame-corner-c" aria-hidden="true" />
                <span className="anpr-frame-corner anpr-frame-corner-d" aria-hidden="true" />
                <figcaption>
                  <span><i /> INFERÊNCIA CONCLUÍDA</span>
                  <span>PLACA 0.97</span>
                </figcaption>
              </figure>
            </div>


          </div>
        </section>

        <section className="anpr-intro-section anpr-section" aria-labelledby="visao-geral-title">
          <div className="anpr-shell anpr-intro-grid">
            <div data-anpr-reveal>
              <p className="anpr-section-tag">O PROBLEMA</p>
              <h2 id="visao-geral-title">Ler uma placa é acompanhar uma sequência, não apenas recortar uma imagem.</h2>
            </div>
            <div className="anpr-intro-copy" data-anpr-reveal>
              <p>Distância, baixa luz, reflexos, perspectiva, movimento e caracteres visualmente parecidos tornam a leitura instável. O sistema foi desenhado para separar essas dificuldades em etapas observáveis e testáveis.</p>
              <p>A mesma arquitetura atende imagem, vídeo e câmera. Os modelos permanecem carregados; cada fonte recebe tracking e voto temporal próprios, sem enviar frames para serviços externos.</p>
            </div>
          </div>
        </section>

        <section className="anpr-dataset-section anpr-section" id="dados" aria-labelledby="dataset-title">
          <div className="anpr-shell">
            <header className="anpr-section-heading" data-anpr-reveal>
              <p className="anpr-section-tag">DADOS DE TREINAMENTO</p>
              <h2 id="dataset-title">30 mil imagens para aproximar o modelo das condições reais.</h2>
              <p>O conjunto combinou registros reais com geração sintética controlada. O dataset permanece privado e não é distribuído nos repositórios.</p>
            </header>

            <div className="anpr-dataset-ledger">
              <article className="anpr-dataset-card anpr-dataset-real" data-anpr-reveal>
                <figure>
                  <img src={media.realDataset} alt="Galeria do conjunto real com imagens noturnas de caminhões" width="1102" height="742" loading="lazy" decoding="async" />
                  <figcaption>AMOSTRAS REAIS / REVISÃO VISUAL</figcaption>
                </figure>
                <div>
                  <strong>10.000</strong>
                  <h3>imagens reais</h3>
                  <p>Cenas com variação de distância, enquadramento, iluminação e qualidade de captura, incluindo registros noturnos e veículos pesados.</p>
                </div>
              </article>

              <span className="anpr-dataset-plus" aria-hidden="true">+</span>

              <article className="anpr-dataset-card anpr-dataset-synthetic" data-anpr-reveal>
                <figure>
                  <img src={media.syntheticDataset} alt="Placa Mercosul sintética anotada em uma cena urbana com neve" width="1100" height="633" loading="lazy" decoding="async" />
                  <figcaption>AMOSTRAS SINTÉTICAS / LABELS YOLO</figcaption>
                </figure>
                <div>
                  <strong>20.000</strong>
                  <h3>imagens sintéticas</h3>
                  <p>Placas no formato AAA0A00 inseridas em cenários variados, com caixas para placa e caracteres exportadas diretamente no padrão YOLO.</p>
                </div>
              </article>
            </div>


          </div>
        </section>

        <section className="anpr-training-section anpr-section" aria-labelledby="training-title">
          <div className="anpr-shell">
            <div className="anpr-training-top-grid" data-anpr-reveal>
              <div>
                <p className="anpr-section-tag">MÉTODO DE TREINAMENTO</p>
                <h2 id="training-title">Gerar, anotar, inspecionar, treinar e medir.</h2>
              </div>
              <figure className="anpr-training-figure">
                <img src={media.bboxNight} alt="Visualizador de bounding boxes mostrando uma placa detectada em caminhão durante a noite" width="1102" height="792" loading="lazy" decoding="async" />
                <figcaption><span>QA / BBOX</span> Ferramenta própria de inspeção das anotações antes do treinamento.</figcaption>
              </figure>
            </div>

            <ol className="anpr-training-list">
              <li data-anpr-reveal>
                <span>01</span>
                <div>
                  <strong>Preparação do conjunto</strong>
                  <p>Separação em treino, validação e teste, preservando labels YOLO correspondentes às imagens.</p>
                </div>
              </li>
              <li data-anpr-reveal>
                <span>02</span>
                <div>
                  <strong>Geração sintética</strong>
                  <p>Variações geométricas, ópticas e ambientais ampliam a diversidade sem alterar a rastreabilidade dos rótulos.</p>
                </div>
              </li>
              <li data-anpr-reveal>
                <span>03</span>
                <div>
                  <strong>Inspeção das caixas</strong>
                  <p>O visualizador próprio percorre imagens e labels para detectar anotações deslocadas ou inconsistentes.</p>
                </div>
              </li>
              <li data-anpr-reveal>
                <span>04</span>
                <div>
                  <strong>Treino e avaliação</strong>
                  <p>O detector é ajustado sobre o conjunto combinado e validado por acerto de placa, caracteres, falsos positivos e latência.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="anpr-pipeline-section anpr-section" id="metodo" aria-labelledby="pipeline-title">
          <div className="anpr-shell">
            <header className="anpr-section-heading anpr-section-heading-inverse" data-anpr-reveal>
              <p className="anpr-section-tag">FLUXO DE INFERÊNCIA</p>
              <h2 id="pipeline-title">Do frame bruto à leitura consolidada.</h2>
            </header>
            <ol className="anpr-pipeline-list">
              {inferenceFlow.map((step) => (
                <li key={step.tag} data-anpr-reveal>
                  <span>{step.tag}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="anpr-ocr-section anpr-section" aria-labelledby="ocr-title">
          <div className="anpr-shell anpr-ocr-grid">
            <figure className="anpr-plate-figure" data-anpr-reveal>
              <img src={media.syntheticPlate} alt="Exemplo de placa brasileira Mercosul com caracteres HT2R13" width="2000" height="646" loading="lazy" decoding="async" />
              <figcaption>PADRÃO VISUAL / LLLNLNN</figcaption>
            </figure>
            <div className="anpr-ocr-copy" data-anpr-reveal>
              <p className="anpr-section-tag">OCR E PÓS-PROCESSAMENTO</p>
              <h2 id="ocr-title">Mais de uma leitura. Um resultado rastreável.</h2>
              <p>PaddleOCR recebe versões preparadas do mesmo recorte. O sistema compara hipóteses e evita transformar confiança bruta em certeza artificial.</p>
            </div>
          </div>
        </section>

        <section className="anpr-product-section anpr-section" aria-labelledby="product-title">
          <div className="anpr-shell">
            <header className="anpr-section-heading" data-anpr-reveal>
              <p className="anpr-section-tag">PRODUTO FINAL</p>
              <h2 id="product-title">Uma aplicação local para arquivo e câmera.</h2>
              <p>CLI, API REST e interface web reutilizam o mesmo serviço e os mesmos modelos carregados.</p>
            </header>
            <div className="anpr-product-mosaic">
              <figure className="anpr-product-feature" data-anpr-reveal>
                <img src={media.result} alt="Interface do Mercosul ANPR com resultado consolidado, confiança e imagem anotada" width="640" height="480" loading="lazy" decoding="async" />
              </figure>
              <figure data-anpr-reveal>
                <img src={media.realtime} alt="Interface de câmera em tempo real do Mercosul ANPR" width="640" height="480" loading="lazy" decoding="async" />
              </figure>
              <figure data-anpr-reveal>
                <img src={media.upload} alt="Interface de envio de imagem ou vídeo do Mercosul ANPR" width="640" height="480" loading="lazy" decoding="async" />
              </figure>
            </div>
          </div>
        </section>

        <section className="anpr-tech-section anpr-section" aria-labelledby="tech-title">
          <div className="anpr-shell anpr-tech-grid">
            <header data-anpr-reveal>
              <p className="anpr-section-tag">FERRAMENTAS</p>
              <h2 id="tech-title">Tecnologia usada em cada camada.</h2>
            </header>
            <dl className="anpr-tech-list">
              {technologies.map(([name, description], index) => (
                <div key={name} data-anpr-reveal>
                  <dt><span>{String(index + 1).padStart(2, '0')}</span>{name}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="anpr-repo-section anpr-section" aria-labelledby="repo-title">
          <div className="anpr-shell">
            <header className="anpr-section-heading anpr-section-heading-inverse" data-anpr-reveal>
              <p className="anpr-section-tag">CÓDIGO ABERTO</p>
              <h2 id="repo-title">Repositórios do projeto.</h2>
            </header>
            <div className="anpr-repo-list">
              {repositories.map((repository) => (
                <a key={repository.name} href={repository.href} target="_blank" rel="noopener noreferrer" data-anpr-reveal>
                  <span>{repository.index}</span>
                  <div><h3>{repository.name}</h3><p>{repository.description}</p></div>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
            <aside className="anpr-privacy-note" data-anpr-reveal>
              <ShieldCheck aria-hidden="true" />
              <p><strong>Privacidade por projeto.</strong> O código processa entradas localmente. Datasets e imagens de placas exigem autorização, revisão de privacidade e retenção mínima.</p>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter homeHref={publicPath('')} />
    </div>
  )
}
