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

export const navigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Projetos e aplicações', href: '#aplicacoes' },
  { label: 'Competências', href: '#competencias' },
  { label: 'Formação', href: '#formacao' },
  { label: 'Contato', href: '#contato' },
]

export const professionalExperience = {
  company: 'RAD Instruments',
  role: 'Estagiário em Instrumentação e Automação',
  period: 'Julho de 2025 — abril de 2026',
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
    code: 'SENS/RAD',
    title: 'Monitoramento de radiação ionizante',
    context: 'Aplicação em tecnologia nuclear e equipamentos de dosimetria na RAD Instruments.',
    contribution: 'Apoio ao desenvolvimento de sistemas gráficos em Java e à integração de componentes eletrônicos para monitoramento.',
    technologies: ['Java', 'Instrumentação', 'Eletrônica', 'Dosimetria'],
    diagram: 'radiation',
  },
  {
    code: 'SCADA/UI',
    title: 'Interfaces SCADA e sistemas supervisórios',
    context: 'Formação complementar em monitoramento e controle de processos.',
    contribution: 'Desenvolvimento de interfaces com tags, alarmes, históricos, drivers, scripts, telas, relatórios e gráficos.',
    technologies: ['SCADA', 'Tags', 'Alarmes', 'Drivers'],
    diagram: 'scada',
  },
  {
    code: 'CLP/AUTO',
    title: 'Automação industrial e programação de CLPs',
    context: 'Formação complementar na UFPE voltada à automação e ao controle de sistemas industriais.',
    contribution: 'Programação de CLPs, integração com inversores de frequência e instrumentação industrial, com aplicação em partidas seguras e controle de fornos e caldeiras a gás natural conforme as normas NBR 12313 e NFPA 85.',
    technologies: ['CLPs', 'TIA Portal', 'Inversores', 'Instrumentação'],
    diagram: 'combustion',
  },
  {
    code: 'WEB/AUTO',
    title: 'Desenvolvimento web e automações internas',
    context: 'Aplicação direta nos processos digitais da RAD Instruments.',
    contribution: 'Desenvolvimento e manutenção do site da empresa, além de automações para processos de gestão interna.',
    technologies: ['JavaScript', 'HTML/CSS', 'WordPress', 'Automação'],
    diagram: 'web',
  },
  {
    code: 'ECAS/EDU',
    title: 'Capacitação em elétrica e automação',
    context: 'Projeto Ecase — UFPE, de maio de 2025 a março de 2026.',
    contribution: 'Desenvolvimento e ministração de cursos para a comunidade acadêmica e o público em geral.',
    technologies: ['Elétrica', 'Automação', 'Ensino', 'Comunidade'],
    diagram: 'education',
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

export const academicExperience = [
  {
    organization: 'Diretório Acadêmico de Engenharia Elétrica — DADEE',
    roles: [
      'Diretor de TI · abril de 2025 a março de 2026',
      'Membro da equipe de marketing · março de 2025 até o presente',
    ],
    details: ['Gestão de recursos tecnológicos e suporte aos processos operacionais.', 'Organização de eventos, coordenação de projetos, criação de conteúdo e estratégias de engajamento.'],
  },
  {
    organization: 'Projeto Ecase — UFPE',
    roles: ['Maio de 2025 a março de 2026'],
    details: ['Desenvolvimento e ministração de cursos de elétrica e automação para a comunidade.'],
  },
]

export const skillGroups = [
  {
    label: 'Automação e controle',
    code: 'CTRL',
    items: ['CLPs', 'Instrumentação', 'Microcontroladores', 'Sistemas supervisórios', 'MATLAB', 'Simulink', 'TIA Portal', 'Elipse E3 Studio'],
  },
  {
    label: 'Programação e web',
    code: 'CODE',
    items: ['Python', 'C++', 'JavaScript', 'HTML e CSS', 'SQL', 'WordPress'],
  },
  {
    label: 'Ferramentas e infraestrutura',
    code: 'TOOL',
    items: ['Git e GitHub', 'Linux', 'Redes de computadores', 'Pacote Office', 'Agentes de IA'],
  },
  {
    label: 'Idiomas',
    code: 'LANG',
    items: ['Português · nativo', 'Inglês · básico'],
  },
]
