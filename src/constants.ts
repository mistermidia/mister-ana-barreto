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
    role: 'Valéria Velloso Casa de Beleza',
    content: 'Estratégia impecável. O engajamento da nossa marca cresceu 40% em apenas dois meses.'
  },
  {
    name: 'Marcos Silva',
    role: 'Mundo dos Colecionavéis',
    content: 'A Ana entende exatamente o que o público quer ver. Recomendo de olhos fechados!'
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Campanha de Verão',
    category: 'videomaker',
    imageUrl: 'https://picsum.photos/seed/video1/800/600'
  },
  {
    id: '2',
    title: 'Estratégia de Conteúdo',
    category: 'social-media',
    imageUrl: 'https://picsum.photos/seed/social1/800/600'
  },
  {
    id: '3',
    title: 'Vídeo Institucional',
    category: 'videomaker',
    imageUrl: 'https://picsum.photos/seed/video2/800/600'
  },
  {
    id: '4',
    title: 'Gestão de Marca Pessoal',
    category: 'social-media',
    imageUrl: 'https://picsum.photos/seed/social2/800/600'
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
