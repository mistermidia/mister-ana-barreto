import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Video, 
  Share2, 
  MessageCircle, 
  Instagram, 
  Mail, 
  ChevronRight, 
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Send,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { cn } from './lib/utils';
import { SERVICES, TESTIMONIALS, PORTFOLIO, CONTACT_WHATSAPP, CLIENT_LOGOS, CONTACT_INSTAGRAM, CONTACT_EMAIL } from './constants';
import { generateStrategyResponse, generateConceptImage } from './services/geminiService';
import Markdown from 'react-markdown';

type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

const SwipeReveal = ({ img1, img2 }: { img1: string, img2: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  
  // Smooth spring for the reveal
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  
  // Transform percentage for clipPath and slider position
  const revealPercent = useTransform(smoothMouseX, [0, 100], [100, 0]);
  const sliderPosition = useTransform(smoothMouseX, [0, 100], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    mouseX.set(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseLeave = () => {
    // Reset to 0 or leave at current position? Usually reset or stay. 
    // Let's reset to 0 for a "closed" state or stay for interactive feel.
    // mouseX.set(0); 
  };

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1 }}
      className="relative group cursor-ew-resize aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Base Photo (First Photo) */}
      <img 
        src={img1}
        alt="Ana Barreto Look 1"
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      
      {/* Reveal Photo (Second Photo) */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-10 overflow-hidden"
        style={{ clipPath: useTransform(revealPercent, (v) => `inset(0 ${v}% 0 0)`) }}
      >
        <img 
          src={img2} 
          alt="Ana Barreto Look 2" 
          className="w-full h-full object-cover"
          style={{ 
            maskImage: 'radial-gradient(circle, black 85%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle, black 85%, transparent 100%)'
          }}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Interactive Slider Line */}
      <motion.div 
        className="absolute inset-y-0 w-1 bg-white/50 backdrop-blur-sm z-20 pointer-events-none"
        style={{ left: sliderPosition }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-accent">
          <Sparkles size={16} />
        </div>
      </motion.div>

      {/* Tooltip hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-brand-text/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
        Arraste para transformar
      </div>
    </motion.div>
  );
};

const LogoMarquee = () => {
  return (
    <div className="mt-24 overflow-hidden relative">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
          <div key={i} className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <img 
              src={logo} 
              alt="Client Logo" 
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
      {/* Gradient overlays for smooth fade */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-bg to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-bg to-transparent z-10" />
    </div>
  );
};

const BackgroundIcons = () => {
  const icons = [Video, Share2, MessageCircle, Sparkles, Instagram];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] z-0">
      {[...Array(12)].map((_, i) => {
        const Icon = icons[i % icons.length];
        return (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              rotate: Math.random() * 360,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [null, (Math.random() - 0.5) * 100 + "%"],
              rotate: [null, Math.random() * 360]
            }}
            transition={{ 
              duration: Math.random() * 20 + 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute"
          >
            <Icon size={Math.random() * 40 + 40} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string, type?: 'text' | 'image' }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>("1:1");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [showHeroVideo, setShowHeroVideo] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage, type: 'text' }]);
    setIsTyping(true);

    const response = await generateStrategyResponse(userMessage);
    setChatHistory(prev => [...prev, { role: 'ai', content: response || 'Erro ao gerar resposta.', type: 'text' }]);
    setIsTyping(false);
  };

  const handleGenerateImage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: `Gerar conceito visual (${selectedAspectRatio}): ${userMessage}`, type: 'text' }]);
    setIsGeneratingImage(true);

    const imageUrl = await generateConceptImage(userMessage, selectedAspectRatio);
    if (imageUrl) {
      setChatHistory(prev => [...prev, { role: 'ai', content: imageUrl, type: 'image' }]);
    } else {
      setChatHistory(prev => [...prev, { role: 'ai', content: 'Desculpe, não consegui gerar a imagem no momento.', type: 'text' }]);
    }
    setIsGeneratingImage(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { staggerChildren: 0.2 }
  };

  return (
    <div className="min-h-screen relative bg-mesh animate-gradient">
      <BackgroundIcons />
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-detail/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter text-brand-text"
          >
            ANA BARRETO <span className="font-light">DIGITAL</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Sobre', 'Serviços', 'Portfólio', 'Depoimentos'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-brand-text/70 hover:text-brand-text transition-colors"
              >
                {item}
              </a>
            ))}
            <a href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 text-sm">
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-brand-text" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-bg border-b border-brand-detail/10 px-6 py-8 flex flex-col gap-6"
            >
              {['Sobre', 'Serviços', 'Portfólio', 'Depoimentos'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-brand-text"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary text-center">
                WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="section-padding pt-40 md:pt-52 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-brand-detail mb-4 block font-semibold">
            Videomaker & Social Media
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-text mb-6 leading-[1.1]">
            Transformando sua presença <br className="hidden md:block" />
            digital em resultados reais
          </h1>
          <p className="text-lg md:text-xl text-brand-detail max-w-2xl mx-auto mb-10 leading-relaxed">
            Vídeos estratégicos e gestão de redes sociais para marcas que querem crescer com sofisticação e estratégia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center justify-center gap-2">
              Fale comigo no WhatsApp <ChevronRight size={18} />
            </a>
            <a href="#serviços" className="px-8 py-3 rounded-full font-medium border border-brand-detail/20 hover:bg-brand-detail/5 transition-all">
              Ver serviços
            </a>
          </div>
        </motion.div>

        {/* Hero Image / Video Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl relative group"
        >
          {showHeroVideo ? (
            <div className="w-full h-full bg-black">
              <iframe 
                src="https://drive.google.com/file/d/1l9ZbqK3b-Tc7E54unXj1SIAlIRC1ChUI/preview" 
                className="w-full h-full border-none"
                allow="autoplay"
              />
            </div>
          ) : (
            <>
              <img 
                src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=2000" 
                alt="Ana Barreto Digital Workspace" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-text/20 flex items-center justify-center">
                <div 
                  onClick={() => setShowHeroVideo(true)}
                  className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 cursor-pointer hover:scale-110 transition-transform"
                >
                  <Video size={32} fill="currentColor" />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="section-padding bg-brand-secondary/30 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <SwipeReveal 
              img1="https://lh3.googleusercontent.com/d/1GQWOSqUC1Kr8uKQGatD8KhSyAjcNdyKp"
              img2="https://lh3.googleusercontent.com/d/1nLLzHKc49lG740WdgwUVMtEjsP9tOhtz"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-8 -right-8 bg-brand-accent p-8 rounded-2xl shadow-xl hidden lg:block z-40"
            >
              <p className="text-white font-serif italic text-xl">
                "Conteúdo que conecta, <br />estratégia que converte."
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre Ana Barreto</h2>
            <div className="space-y-4 text-brand-detail leading-relaxed">
              <p>
                Com anos de experiência no mercado digital, meu foco é humanizar marcas e elevar o patamar visual de pequenos e médios negócios.
              </p>
              <p>
                Acredito que cada marca tem uma história única que merece ser contada com excelência. Não entrego apenas vídeos ou posts, entrego posicionamento e autoridade.
              </p>
              <p>
                Minha abordagem une a sensibilidade estética do videomaker com a visão analítica do social media, garantindo que cada conteúdo tenha um propósito claro.
              </p>
            </div>
            <div className="mt-10 flex gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-brand-text">50+</span>
                <span className="text-xs uppercase tracking-wider text-brand-detail">Clientes Atendidos</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-brand-text">200+</span>
                <span className="text-xs uppercase tracking-wider text-brand-detail">Vídeos Produzidos</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="serviços" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviços Estratégicos</h2>
            <p className="text-brand-detail max-w-xl mx-auto">
              Soluções completas para sua marca brilhar no digital.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.title}
                variants={fadeInUp}
                className="p-10 rounded-3xl bg-white/40 border border-brand-detail/5 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
                  {service.icon === 'Video' ? <Video size={28} /> : <Share2 size={28} />}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-brand-detail mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-brand-text">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfólio Section */}
      <section id="portfólio" className="section-padding bg-brand-text text-brand-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfólio</h2>
              <p className="text-brand-bg/60 max-w-md">
                Uma amostra dos projetos que transformaram a presença digital de nossos clientes.
              </p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all">
              Ver tudo <ArrowRight size={16} />
            </button>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PORTFOLIO.map((item) => (
              <motion.div 
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                onClick={() => item.videoUrl && setActiveVideo(item.videoUrl)}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-xs uppercase tracking-widest text-brand-accent font-bold mb-2">
                    {item.category}
                  </span>
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    {item.videoUrl && <Video size={20} className="text-brand-accent" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem os clientes</h2>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((t, index) => (
              <motion.div 
                key={t.name}
                variants={fadeInUp}
                className="p-8 rounded-3xl bg-white/20 border border-brand-detail/10 relative"
              >
                <div className="text-brand-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-brand-detail italic mb-8 leading-relaxed">
                  "{t.content}"
                </p>
                <div>
                  <h4 className="font-bold text-brand-text">{t.name}</h4>
                  <p className="text-xs text-brand-detail uppercase tracking-wider">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Logo Carousel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <LogoMarquee />
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-brand-accent text-white text-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Vamos transformar <br />seu digital hoje?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Clique no botão abaixo e vamos conversar sobre como elevar o nível da sua marca.
          </p>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={CONTACT_WHATSAPP} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white text-brand-accent px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-brand-bg hover:text-brand-text transition-all inline-flex items-center gap-3"
          >
            <MessageCircle size={24} /> Quero começar agora
          </motion.a>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-text/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
              >
                <X size={24} />
              </button>
              <div className="w-full h-full bg-black">
                <iframe 
                  src={activeVideo}
                  className="w-full h-full border-none"
                  allow="autoplay"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-brand-detail/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter text-brand-text">
            ANA BARRETO <span className="font-light">DIGITAL</span>
          </div>
          
          <div className="flex gap-6">
            <a href={CONTACT_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-brand-detail hover:text-brand-accent transition-colors"><Instagram size={20} /></a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-detail hover:text-brand-accent transition-colors"><Mail size={20} /></a>
          </div>

          <p className="text-sm text-brand-detail">
            © 2026 Mister Mídia Pro. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={CONTACT_WHATSAPP} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-[60]"
      >
        <MessageCircle size={32} fill="currentColor" />
      </a>

      {/* Strategy Assistant Toggle */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 left-6 w-16 h-16 bg-brand-text text-brand-bg rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-[60]"
      >
        <Sparkles size={28} />
      </button>

      {/* Strategy Assistant Chat */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 left-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl z-[70] flex flex-col overflow-hidden border border-brand-detail/10"
          >
            <div className="p-6 bg-brand-text text-brand-bg flex justify-between items-center">
              <div>
                <h3 className="font-bold">Assistente de Estratégia</h3>
                <p className="text-xs opacity-70">Powered by Gemini AI</p>
              </div>
              <button onClick={() => setIsChatOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-bg/10">
              {chatHistory.length === 0 && (
                <div className="text-center py-10 text-brand-detail">
                  <Sparkles className="mx-auto mb-4 opacity-20" size={48} />
                  <p className="text-sm">Olá! Sou o assistente da Ana. <br />Como posso ajudar na sua estratégia hoje?</p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {['Ideias de Reels', 'Roteiro de vídeo', 'Dicas de engajamento'].map(tip => (
                      <button 
                        key={tip}
                        onClick={() => setChatInput(tip)}
                        className="text-xs px-3 py-1.5 rounded-full border border-brand-detail/20 hover:bg-brand-detail/5"
                      >
                        {tip}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={cn(
                  "flex flex-col max-w-[85%]",
                  msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm",
                    msg.role === 'user' 
                      ? "bg-brand-accent text-white rounded-tr-none" 
                      : "bg-white border border-brand-detail/10 text-brand-text rounded-tl-none shadow-sm"
                  )}>
                    {msg.type === 'image' ? (
                      <img src={msg.content} alt="Conceito Visual" className="rounded-lg w-full h-auto" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="markdown-body">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {(isTyping || isGeneratingImage) && (
                <div className="flex gap-1 p-2">
                  <div className="w-1.5 h-1.5 bg-brand-detail/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-brand-detail/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-brand-detail/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            <div className="p-4 border-t border-brand-detail/10 bg-white space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {(["1:1", "3:4", "4:3", "9:16", "16:9"] as AspectRatio[]).map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setSelectedAspectRatio(ratio)}
                    className={cn(
                      "text-[10px] px-2 py-1 rounded-md border transition-all whitespace-nowrap",
                      selectedAspectRatio === ratio 
                        ? "bg-brand-accent text-white border-brand-accent" 
                        : "border-brand-detail/20 text-brand-detail hover:bg-brand-detail/5"
                    )}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ideia ou conceito..."
                  className="flex-1 bg-brand-bg/30 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-accent outline-none"
                />
                <button 
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage || isTyping || !chatInput.trim()}
                  title="Gerar Conceito Visual"
                  className="w-10 h-10 bg-brand-detail text-white rounded-full flex items-center justify-center disabled:opacity-50"
                >
                  {isGeneratingImage ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                </button>
                <button 
                  onClick={handleSendMessage}
                  disabled={isTyping || isGeneratingImage || !chatInput.trim()}
                  className="w-10 h-10 bg-brand-accent text-white rounded-full flex items-center justify-center disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
