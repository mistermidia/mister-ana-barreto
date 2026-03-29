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
  images?: string[];
  videoUrl?: string;
  videoPoster?: string;
  videoAspectRatio?: '16:9' | '9:16';
}
