import { Service, Testimonial, PortfolioItem } from './types';

export const SERVICES: Service[] = [
  {
    title: 'Videomaker',
    description: 'Produção de vídeos profissionais que capturam a essência da sua marca.',
    icon: 'Video',
    items: [
      'Produção de vídeos profissionais',
      'Reels e vídeos estratégicos',
      'Conteúdos institucionais'
    ]
  },
  {
    title: 'Social Media',
    description: 'Gestão estratégica de redes sociais focada em crescimento e autoridade.',
    icon: 'Share2',
    items: [
      'Planejamento de conteúdo',
      'Gestão de redes sociais',
      'Crescimento orgânico'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Tati Tavares',
    role: 'Studio Tati Tavares ',
    content: 'O trabalho da Ana transformou meu Instagram. Meus vídeos agora passam muito mais profissionalismo.'
  },
  {
    name: 'Valéria Velloso',
    role: 'Valéria Velloso_Casa de Belela',
    content: 'Estratégia impecável. O engajamento da nossa marca cresceu 40% em apenas dois meses.'
  },
  {
    name: 'Mundo dos Colecionáveis',
    role: 'Mundo dos Colecionáveis',
    content: 'A Ana entende exatamente o que o público quer ver. Recomendo de olhos fechados!'
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Vídeo Institucional',
    category: 'videomaker',
    imageUrl: 'https://lh3.googleusercontent.com/d/1yfzIsVTlbCtd48O_1eKA14QI22SM6mGn',
    videoUrl: 'https://empurion.com.br/wp-content/uploads/2026/03/Institucional-AB.mp4',
    description: 'Produção de um vídeo institucional com o objetivo de apresentar a marca, seus valores, diferenciais e posicionamento no mercado. O vídeo será utilizado para fortalecer a presença digital e gerar conexão com o público-alvo. Entregas incluem: roteiro, captação de imagens, edição e versão final otimizada para redes sociais e site.'
  },
  {
    id: '2',
    title: 'Estratégia de Conteúdo',
    category: 'social-media',
    imageUrl: 'https://lh3.googleusercontent.com/d/1aYySSr9ZspN8mqToKz_z8ciyM3ux_v-l',
    images: [
      'https://lh3.googleusercontent.com/d/1aYySSr9ZspN8mqToKz_z8ciyM3ux_v-l',
      'https://lh3.googleusercontent.com/d/1NzbpVmnSy1ru6Zuf9ZNE8e4wSdKTKQsw',
      'https://lh3.googleusercontent.com/d/1GbZixCdXJESC_VcuQrbR63tiNIfQR08I',
      'https://lh3.googleusercontent.com/d/1Dq8fQG4B0F3x7yUgZ1qzZeUY8VpmJyHb'
    ],
    videoUrl: 'https://empurion.com.br/wp-content/uploads/2026/03/Estrategia-de-conteudo.mp4',
    description: 'Desenvolvimento de uma estratégia de conteúdo focada em atrair, engajar e converter o público nas redes sociais. Inclui: Definição de público-alvo, Planejamento de conteúdo (calendário mensal), Criação de temas e linhas editoriais, Sugestões de formatos (reels, posts, stories).'
  },
  {
    id: '3',
    title: 'Campanha de Verão',
    category: 'videomaker',
    imageUrl: 'https://lh3.googleusercontent.com/d/160PrKGpjXTNmpP8lXwS5XVxKsMnt13D6',
    images: [
      'https://lh3.googleusercontent.com/d/160PrKGpjXTNmpP8lXwS5XVxKsMnt13D6',
      'https://lh3.googleusercontent.com/d/1GEVad6wLznRjo5YDnozNEUwdvyzT7-ZE',
      'https://lh3.googleusercontent.com/d/1ovnpKTF5SeqKbfLzPre-LqSxGwmtxh6L',
      'https://lh3.googleusercontent.com/d/1ElxZkCF9k6zTJlrsJUImJ6j_V_xFUiPx',
      'https://lh3.googleusercontent.com/d/1zga4o8-vuQb4vxk7_mb5iWlKKt2Kpd-G'
    ],
    videoUrl: 'https://empurion.com.br/wp-content/uploads/2026/03/Verao-2.mp4',
    description: 'Criação de uma campanha sazonal voltada para aumentar o alcance e as vendas durante o período de verão. Inclui: Conceito criativo da campanha, Criação de peças visuais e copies, Planejamento de postagens, Sugestões de anúncios e promoções.'
  },
  {
    id: '4',
    title: 'Gestão de Marca Pessoal',
    category: 'social-media',
    imageUrl: 'https://lh3.googleusercontent.com/d/1s74n7AbM3pXNdRDs-mr-xPkl5n3EQMpL',
    images: [
      'https://lh3.googleusercontent.com/d/1s74n7AbM3pXNdRDs-mr-xPkl5n3EQMpL',
      'https://lh3.googleusercontent.com/d/1GvsjWiwHWxtba-xGhCbBrF8fa03cMYDw',
      'https://lh3.googleusercontent.com/d/1DMTsGUixf0o1_x_awzR4ou1k79tHZ1Wi',
      'https://lh3.googleusercontent.com/d/1yRXjrzb4NeaPOz_RcZf1PlGxmtZqUSt1'
    ],
    description: 'Construção e fortalecimento da marca pessoal, posicionando o cliente como autoridade no seu nicho. Inclui: Definição de identidade e posicionamento, Tom de voz e comunicação, Estratégia de presença digital, Direcionamento de conteúdo pessoal/profissional.'
  }
];

export const CONTACT_WHATSAPP = 'https://wa.me/5511971950431';
export const CONTACT_INSTAGRAM = 'https://www.instagram.com/barreto_anac/';
export const CONTACT_EMAIL = 'anaclecia_barreto@hotmail.com';

export const CLIENT_LOGOS = [
  'https://lh3.googleusercontent.com/d/1FFPiP8bvN3uzU7pj2X3pfCH10_UBjSwW',
  'https://lh3.googleusercontent.com/d/1GwqiNeCvd8zVc4j30rJVc9t_OIvgs4w5',
  'https://lh3.googleusercontent.com/d/1Jt94F9FZngcMhbJ8TeXR222CrfvczO1p',
  'https://lh3.googleusercontent.com/d/1DIWQxnzbG3BOoDEyVkGzPsyT7w19eyGT',
  'https://lh3.googleusercontent.com/d/191wUF5_JCh_bcPqPj2HjsDa2GbwsjmyL',
  'https://lh3.googleusercontent.com/d/10VZedXZc_mUE-8ZU91W054rOqfDFEIzd',
  'https://lh3.googleusercontent.com/d/1wTYByVlTk7P7yvvmJY7tRjUBzwrC3G3h'
];
