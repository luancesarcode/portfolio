import { publicPath } from '../utils/paths'

export const profile = {
  name: 'Luan César de Souza Nascimento',
  shortName: 'Luan César',
  role: 'Estudante de Engenharia de Controle e Automação na UFPE',
  location: 'Recife, Pernambuco',
  graduation: 'Dezembro de 2027',
  email: 'luancesar.code@gmail.com',
  github: 'https://github.com/luancesarcode',
  linkedin: 'https://www.linkedin.com/in/luan-c%C3%A9sar-395b9b418',
  curriculum: publicPath('curriculo-luan-cesar.pdf'),
  photo: publicPath('assets/luan-cesar.webp'),
  whatsapp: '',
}

export const professionalExperience = {
  company: 'RAD Instruments',
  role: 'Estagiário em Instrumentação e Automação',
  period: 'Julho de 2025 — Setembro de 2026',
  context: 'Startup do PoloTec/UFPE · Tecnologia nuclear',
  activities: [
    'Desenvolvimento e manutenção do site da empresa.',
    'Implementação de automações para otimizar processos de gestão interna.',
    'Desenvolvimento de sistemas gráficos em Java e apoio a soluções de monitoramento de radiação ionizante.',
    'Montagem, soldagem e integração de componentes eletrônicos em equipamentos de dosimetria.',
  ],
}

export const applications = [
  {
    slug: 'monitoramento-radiacao',
    code: 'SENS/RAD',
    title: 'Monitoramento de radiação ionizante',
    context: 'Aplicação em tecnologia nuclear e equipamentos de dosimetria na RAD Instruments.',
    contribution: 'Apoio ao desenvolvimento de sistemas gráficos em Java e à integração de componentes eletrônicos para monitoramento.',
    technologies: ['Java', 'Instrumentação', 'Eletrônica', 'Dosimetria'],
    diagram: 'radiation',
  },
  {
    slug: 'mercosul-anpr',
    code: 'CV/ANPR',
    title: 'Mercosul ANPR',
    context: 'Leitura e identificação de placas brasileiras em imagens, vídeos e câmera ao vivo.',
    contribution: 'Desenvolvimento de uma solução de OCR para identificação de placas em tempo real, com resultados claros e acompanhamento pela interface do sistema.',
    technologies: ['OCR', 'Identificação de placas', 'Tempo real', 'Imagens e vídeos'],
    diagram: 'anpr',
    repository: 'https://github.com/luancesarcode/mercosul-anpr',
  },
  {
    slug: 'interfaces-scada',
    code: 'SCADA/UI',
    title: 'Interfaces SCADA e sistemas supervisórios',
    context: 'Formação complementar em monitoramento e controle de processos.',
    contribution: 'Desenvolvimento de interfaces com tags, alarmes, históricos, drivers, scripts, telas, relatórios e gráficos.',
    technologies: ['SCADA', 'Tags', 'Alarmes', 'Drivers'],
    diagram: 'scada',
  },
  {
    slug: 'automacao-clps',
    code: 'CLP/AUTO',
    title: 'Automação industrial e programação de CLPs',
    context: 'Formação complementar na UFPE voltada à automação e ao controle de sistemas industriais.',
    contribution: 'Programação de CLPs, integração com inversores de frequência e instrumentação industrial, com aplicação em partidas seguras e controle de fornos e caldeiras a gás natural conforme as normas NBR 12313 e NFPA 85.',
    technologies: ['CLPs', 'TIA Portal', 'Inversores', 'Instrumentação'],
    diagram: 'combustion',
  },
  {
    slug: 'desenvolvimento-web-rad',
    code: 'WEB/AUTO',
    title: 'Desenvolvimento web e automações internas',
    context: 'Aplicação direta nos processos digitais da RAD Instruments.',
    contribution: 'Desenvolvimento e manutenção do site da empresa, além de automações para processos de gestão interna.',
    technologies: ['JavaScript', 'HTML/CSS', 'WordPress', 'Automação'],
    diagram: 'web',
  },
  {
    slug: 'projeto-ecase',
    code: 'ECAS/EDU',
    title: 'Capacitação em elétrica e automação',
    context: 'Projeto Ecase — UFPE, de maio de 2025 a março de 2026.',
    contribution: 'Desenvolvimento e ministração de cursos para a comunidade acadêmica e o público em geral.',
    technologies: ['Elétrica', 'Automação', 'Ensino', 'Comunidade'],
    diagram: 'education',
  },
] as const

const mercosulAnprMediaBase = 'https://raw.githubusercontent.com/luancesarcode/mercosul-anpr/main/docs/media/images'

export const mercosulAnprGallery = [
  {
    src: `${mercosulAnprMediaBase}/interface-resultado.webp`,
    alt: 'Resultado consolidado de placa reconhecida no Mercosul ANPR',
    caption: 'Resultado consolidado após detecção, OCR e voto temporal.',
  },
  {
    src: `${mercosulAnprMediaBase}/banner.webp`,
    alt: 'Banner do projeto Mercosul ANPR',
    caption: 'Visão geral do sistema de reconhecimento de placas Mercosul ANPR.',
  },
  {
    src: `${mercosulAnprMediaBase}/interface-upload.webp`,
    alt: 'Interface de envio de arquivo do Mercosul ANPR',
    caption: 'Envio de imagens e vídeos para processamento local.',
  },
  {
    src: `${mercosulAnprMediaBase}/camera-tempo-real.webp`,
    alt: 'Interface de câmera em tempo real do Mercosul ANPR',
    caption: 'Análise de placas por câmera em tempo real.',
  },
] as const

export const radiationGallery = [
  {
    src: publicPath('assets/irdp-monitor/interface-sistema.webp'),
    alt: 'Interface do sistema IRDP exibindo curvas de taxa de dose dos sensores',
    caption: 'Interface de leitura com curvas de taxa de dose dos sensores.',
  },
  {
    src: publicPath('assets/irdp-monitor/equipamentos-transporte.webp'),
    alt: 'Equipamentos azuis de monitoramento acondicionados em caixa de transporte',
    caption: 'Equipamentos IRDP acondicionados para transporte em campo.',
  },
  {
    src: publicPath('assets/irdp-monitor/instalacao-portuaria.webp'),
    alt: 'Equipe posicionando um equipamento de monitoramento em área portuária',
    caption: 'Montagem de equipamento de monitoramento em área portuária.',
  },
  {
    src: publicPath('assets/irdp-monitor/portal-monitoramento.webp'),
    alt: 'Representação de um portal de monitoramento ao redor de um veículo de carga',
    caption: 'Representação do portal de monitoramento ao redor de um veículo de carga.',
  },
  {
    src: publicPath('assets/irdp-monitor/estacao-operacao.webp'),
    alt: 'Estação de operação com monitores, câmeras e gráficos de sinais',
    caption: 'Estação de operação com câmeras, tabelas e sinais monitorados.',
  },
] as const

export const ecaseGallery = [
  {
    src: publicPath('assets/ecase/apresentacao-curso.jpeg'),
    alt: 'Luan César ministrando uma apresentação em sala de aula pelo Projeto ECASE',
    caption: 'Apresentação de conteúdo técnico para participantes do Projeto ECASE.',
  },
  {
    src: publicPath('assets/ecase/pratica-instalacoes-eletricas.jpeg'),
    alt: 'Atividade prática com componentes e ligações elétricas durante curso do Projeto ECASE',
    caption: 'Atividade prática de montagem e ligações elétricas.',
  },
  {
    src: publicPath('assets/ecase/oficina-eletrica-automacao.jpeg'),
    alt: 'Participantes realizando montagem elétrica em oficina do Projeto ECASE',
    caption: 'Oficina prática de elétrica e automação com a comunidade.',
  },
] as const

export const complementaryEducation = [
  {
    title: 'Automação de Sistemas de Combustão Industrial',
    institution: 'UFPE',
    description: 'Programação de CLPs, partida segura e controle de fornos e caldeiras, inversores de frequência, instrumentação industrial e interpretação das normas NBR 12313 e NFPA 85.',
  },
  {
    title: 'Sistemas Supervisórios I',
    institution: 'UFPE',
    description: 'Interfaces SCADA, tags, alarmes, históricos, drivers de comunicação, scripts, telas, relatórios e gráficos para monitoramento e controle de processos.',
  },
]
