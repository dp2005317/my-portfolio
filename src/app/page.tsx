import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, ExternalLink, Mail, Github, Linkedin, 
  Instagram, Terminal, Rocket, PenTool, Layout, 
  Lightbulb, Zap, Star, ChevronRight, Briefcase
} from 'lucide-react';

// --- GLOBAL STYLES & FONTS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

    :root {
      --primary: #2563EB; /* Premium Blue */
      --primary-dark: #1D4ED8;
      --surface: #FFFFFF;
      --background: #F8FAFC; /* Slate 50 */
      --text-main: #0F172A; /* Slate 900 */
      --text-muted: #64748B; /* Slate 500 */
      --border: #E2E8F0; /* Slate 200 */
    }

    * {
      box-sizing: border-box;
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--background);
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      margin: 0;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    .font-display { font-family: 'Space Grotesk', sans-serif; }

    /* Modern Utility Classes */
    .glass-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    
    .premium-shadow {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.025);
      transition: all 0.3s ease;
    }
    
    .premium-shadow:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      transform: translateY(-4px);
    }

    /* Marquee Animation */
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 30s linear infinite;
    }

    ::selection {
      background: var(--primary);
      color: #FFFFFF;
    }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--background); }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
  `}</style>
);

// --- REUSABLE COMPONENTS ---

const PremiumButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "font-medium px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 active:scale-95";
  
  const variants = {
    primary: "bg-[var(--primary)] text-white shadow-md hover:shadow-lg hover:bg-[var(--primary-dark)]",
    secondary: "bg-white text-[var(--text-main)] border border-[var(--border)] shadow-sm hover:border-[var(--text-muted)] hover:shadow-md",
    outline: "bg-transparent text-[var(--text-main)] border border-[var(--border)] hover:bg-slate-50"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const GlassBadge = ({ children, className = "", icon }) => (
  <div className={`absolute bg-white/90 backdrop-blur-md border border-[var(--border)] text-[var(--text-main)] font-medium px-4 py-2.5 rounded-full shadow-lg z-20 flex items-center gap-2 ${className}`}>
    {icon && <span className="text-[var(--primary)]">{icon}</span>}
    {children}
  </div>
);

// --- SECTIONS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
    <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-6 py-3 rounded-full border border-[var(--border)] shadow-sm">
      <div className="pointer-events-auto flex items-center gap-2">
        <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center text-white font-bold font-display">
          D
        </div>
        <span className="font-display font-bold text-lg tracking-tight">Diganta Pal.</span>
      </div>
      <div className="pointer-events-auto hidden md:flex items-center gap-8">
        {['About', 'Work', 'Journey'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
            {item}
          </a>
        ))}
      </div>
      <div className="pointer-events-auto">
        <a href="#contact" className="text-sm font-medium bg-[var(--text-main)] text-white px-5 py-2.5 rounded-full hover:bg-[var(--primary)] transition-colors">
          Contact Me
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] pt-32 pb-20 overflow-hidden flex items-center">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-[var(--primary)] font-medium px-4 py-1.5 rounded-full border border-blue-100 mb-8 text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
            Information Technology Student & Founder
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight text-[var(--text-main)] mb-6 font-bold"
          >
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-indigo-500">
              Digital Excellence.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed font-medium"
          >
            I architect AI products, scale modern web applications, and craft premium digital experiences while pursuing my B.E. in Information Technology.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <PremiumButton variant="primary" onClick={() => document.getElementById('work').scrollIntoView()}>
              Explore Portfolio <ArrowRight size={18} />
            </PremiumButton>
            <PremiumButton variant="secondary" onClick={() => document.getElementById('journey').scrollIntoView()}>
              My Journey
            </PremiumButton>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Professional Image & Floating Elements */}
        <div className="lg:col-span-5 relative h-[450px] lg:h-[600px] w-full mt-12 lg:mt-0 flex justify-center lg:justify-end items-center">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full max-w-md aspect-[4/5]"
          >
            {/* Elegant Image Container */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-[var(--border)] bg-white p-3 shadow-xl transform rotate-2 transition-transform hover:rotate-0 duration-500">
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-slate-100">
                <img 
                  src="https://avatars.githubusercontent.com/u/88098413?v=4" 
                  alt="Diganta Pal" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Floating Glass Badges */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <GlassBadge className="top-12 -left-8 md:-left-16" icon={<Briefcase size={16} />}>
                Founder at HONEST.
              </GlassBadge>
            </motion.div>
            
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              <GlassBadge className="bottom-24 -right-4 md:-right-12" icon={<Terminal size={16} />}>
                AI & Web Architect
              </GlassBadge>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustMarquee = () => {
  const words = [
    "B.E. INFORMATION TECHNOLOGY", "•", 
    "STARTUP FOUNDER", "•", 
    "AI SOLUTIONS ARCHITECT", "•", 
    "UI/UX STRATEGIST", "•", 
    "FULL STACK ENGINEER", "•", 
  ];
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="border-y border-[var(--border)] bg-white py-6 overflow-hidden relative z-20">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
      <div className="animate-marquee flex items-center font-display text-sm font-semibold tracking-widest text-[var(--text-muted)] whitespace-nowrap uppercase">
        {repeatedWords.map((word, index) => (
          <span key={index} className={`mx-8 ${word === '•' ? 'text-[var(--border)]' : ''}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-main)] mb-6 leading-tight tracking-tight">
            Bridging the gap between <br className="hidden md:block" />
            <span className="text-[var(--primary)]">academic theory</span> and <br className="hidden md:block" />
            <span className="text-[var(--primary)]">industry reality.</span>
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6 text-lg text-[var(--text-muted)] leading-relaxed"
        >
          <p>
            I am currently an Information Technology student at <strong className="text-[var(--text-main)] font-semibold">UIT Burdwan</strong>. However, my true education happens beyond the syllabus.
          </p>
          <p>
            While pursuing my degree, I am actively building scalable web applications, integrating AI into modern digital products, and running my own creative studio—<strong className="text-[var(--text-main)] font-semibold">HONEST.</strong>
          </p>
          <p>
            I specialize in translating complex engineering problems into clean, user-centric, and highly performant digital experiences. My goal is to build products that not only work flawlessly but feel premium.
          </p>
          
          <div className="pt-6">
            <a href="#contact" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:gap-4 transition-all">
              Let's collaborate <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "AI Integration", desc: "Implementing intelligent automation and AI models into existing workflows.", icon: <Terminal size={24} />, bg: "bg-blue-50 text-blue-600" },
    { title: "Full-Stack Web", desc: "Architecting robust, scalable applications using React, Next.js, and Node.", icon: <Layout size={24} />, bg: "bg-indigo-50 text-indigo-600" },
    { title: "UI/UX Design", desc: "Crafting intuitive, minimalist, and conversion-focused design systems.", icon: <PenTool size={24} />, bg: "bg-violet-50 text-violet-600" },
    { title: "Agency Leadership", desc: "Directing projects, client relations, and strategy at HONEST. Studio.", icon: <Rocket size={24} />, bg: "bg-slate-100 text-slate-700" },
    { title: "Brand Identity", desc: "Developing premium visual identities for modern startups and businesses.", icon: <Star size={24} />, bg: "bg-emerald-50 text-emerald-600" },
    { title: "Technical Consulting", desc: "Providing architectural guidance for complex digital transformations.", icon: <Lightbulb size={24} />, bg: "bg-orange-50 text-orange-600" },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Core Competencies.</h2>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl">A comprehensive suite of technical and creative skills tailored for modern product development.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-[var(--border)] p-8 rounded-2xl premium-shadow flex flex-col group"
            >
              <div className={`mb-6 w-12 h-12 rounded-xl flex items-center justify-center ${service.bg}`}>
                {service.icon}
              </div>
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">{service.title}</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HonestSection = () => {
  return (
    <section className="py-32 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/40 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8">
            <Star size={14} className="text-yellow-400" fill="currentColor" /> Digital Agency
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Building <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">HONEST.</span>
          </h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
            HONEST. is a premium creative digital studio I founded to help ambitious businesses scale through raw, authentic, and highly-performant digital experiences.
          </p>
          
          <ul className="space-y-4 mb-10">
            {[
              "Enterprise-grade Web Applications",
              "Strategic UI/UX Design",
              "Brand & Visual Identity Systems",
              "AI-driven Business Solutions"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <CheckIcon />
                </div>
                {item}
              </li>
            ))}
          </ul>
          
          <PremiumButton variant="primary" className="bg-white text-slate-900 hover:bg-slate-100">
            Visit HONEST. Studio <ExternalLink size={16} />
          </PremiumButton>
        </div>
        
        <div className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-lg aspect-square bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden relative"
          >
            {/* Minimalist Dashboard Mockup representation */}
            <div className="w-full h-12 bg-slate-900 border-b border-slate-700 flex items-center px-6 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="p-8">
              <div className="w-1/3 h-8 bg-slate-700 rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="w-full h-32 bg-slate-700/50 rounded-xl"></div>
                <div className="flex gap-4">
                  <div className="w-1/2 h-40 bg-blue-900/30 border border-blue-800/50 rounded-xl"></div>
                  <div className="w-1/2 h-40 bg-slate-700/50 rounded-xl"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Minimalist Check Icon
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const Projects = () => {
  const projects = [
    { id: "01", title: "HONEST. Studio", desc: "Premium landing page for a creative digital agency.", tech: ["Next.js", "Tailwind CSS", "Framer Motion"], img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop" },
    { id: "02", title: "R.J Enterprise", desc: "Corporate platform for security infrastructure solutions.", tech: ["React", "TypeScript", "Node.js"], img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop" },
    { id: "03", title: "Lakshyavedh", desc: "High-energy interactive website for a modern gymnasium.", tech: ["Three.js", "GSAP", "React"], img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" },
    { id: "04", title: "Cafebucks", desc: "Elegant digital storefront for a premium coffee roastery.", tech: ["Next.js", "Stripe", "Tailwind"], img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop" },
  ];

  return (
    <section id="work" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Works.</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl">A curated selection of digital products, platforms, and experiences I've engineered.</p>
          </div>
          <PremiumButton variant="outline">View Complete Archive</PremiumButton>
        </div>
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group rounded-[2rem] bg-slate-50 border border-[var(--border)] overflow-hidden flex flex-col md:flex-row hover:border-slate-300 transition-colors"
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative overflow-hidden bg-slate-200">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                <span className="text-sm font-semibold text-[var(--primary)] mb-4 tracking-wider uppercase">Project {project.id}</span>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[var(--text-main)]">{project.title}</h3>
                <p className="text-lg text-[var(--text-muted)] mb-8 leading-relaxed">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a href="#" className="inline-flex items-center gap-2 font-semibold text-[var(--text-main)] hover:text-[var(--primary)] transition-colors mt-auto">
                  View Case Study <ChevronRight size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "Firebase", 
    "Three.js", "GSAP", "Tailwind CSS", "Python", 
    "AI Architecture", "Figma", "C++"
  ];
  
  return (
    <section className="py-32 bg-[var(--background)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 tracking-tight">Technical Arsenal</h2>
        
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -2 }}
              className="px-6 py-3 bg-white border border-[var(--border)] rounded-full text-slate-700 font-medium shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Journey = () => {
  const timeline = [
    { year: "2019", text: "Initiated self-taught programming journey focusing on core fundamentals." },
    { year: "2022", text: "Commenced freelance career, delivering commercial digital projects." },
    { year: "2024", text: "Enrolled in B.E. Information Technology to solidify engineering principles." },
    { year: "2025", text: "Founded HONEST., scaling from individual freelancer to agency operations." },
    { year: "Future", text: "Architecting scalable AI products and continuing entrepreneurial growth.", isAccent: true },
  ];

  return (
    <section id="journey" className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 tracking-tight text-center">Professional Timeline.</h2>
        
        <div className="relative border-l border-slate-200 ml-4 md:ml-8 space-y-12">
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full outline outline-4 outline-white ${
                item.isAccent ? 'bg-[var(--primary)] shadow-[0_0_0_4px_rgba(37,99,235,0.2)]' : 'bg-slate-300'
              }`}></div>
              
              <h3 className={`text-xl font-bold mb-2 font-display ${item.isAccent ? 'text-[var(--primary)]' : 'text-[var(--text-main)]'}`}>
                {item.year}
              </h3>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FunFacts = () => {
  const facts = [
    { num: "20+", label: "Projects Delivered" },
    { num: "100+", label: "Design Systems" },
    { num: "1000+", label: "Engineering Hours" },
    { num: "1", label: "Creative Agency" },
  ];

  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {facts.map((fact, i) => (
            <div key={i} className="text-center">
              <h3 className="font-display text-4xl md:text-5xl font-bold text-[var(--primary)] mb-2">{fact.num}</h3>
              <p className="font-medium text-[var(--text-muted)] uppercase tracking-wider text-sm">{fact.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-slate-50 border border-[var(--border)] rounded-[3rem] p-12 md:p-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Ready to build the <br/>
            <span className="text-[var(--primary)]">next big thing?</span>
          </h2>
          <p className="text-xl text-[var(--text-muted)] mb-10">
            Open for freelance opportunities, strategic partnerships, and coffee chats. Let's engineer something exceptional.
          </p>
          
          <PremiumButton variant="primary" className="text-lg px-10 py-5 mb-16 w-full sm:w-auto">
            <Mail size={20} /> dp2005317@gmail.com
          </PremiumButton>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://linkedin.com/in/digantapal" target="_blank" rel="noreferrer" className="bg-[var(--light)] p-4 brutalist-border brutalist-shadow-sm hover:bg-[var(--primary)] hover:text-white transition-colors">
              <Linkedin size={32} />
            </a>
            <a href="https://github.com/dp2005317" target="_blank" rel="noreferrer" className="bg-[var(--light)] p-4 brutalist-border brutalist-shadow-sm hover:bg-[var(--dark)] hover:text-white transition-colors">
              <Github size={32} />
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Footer text */}
      <div className="mt-24 text-center text-slate-400 font-medium text-sm">
        © {new Date().getFullYear()} Diganta Pal. All rights reserved.
      </div>
    </section>
  );
};

// --- MAIN APP ENTRY ---
export default function PortfolioApp() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <About />
        <Services />
        <HonestSection />
        <Projects />
        <Skills />
        <Journey />
        <FunFacts />
        <Contact />
      </main>
    </>
  );
}