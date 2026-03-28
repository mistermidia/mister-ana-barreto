export interface Service {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'videomaker' | 'social-media';
  imageUrl: string;
  videoUrl?: string;
}
