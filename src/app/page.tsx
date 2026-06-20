import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, ExternalLink, Mail, Github, Linkedin, 
  Instagram, Terminal, Rocket, PenTool, Layout, 
  Lightbulb, Zap, Star
} from 'lucide-react';

// --- GLOBAL STYLES & FONTS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&family=Kalam:wght@400;700&display=swap');

    :root {
      --primary: #2457FF; /* Blue */
      --accent: #FFD500;  /* Yellow */
      --dark: #111111;    /* Black */
      --light: #FFFFFF;   /* White */
      --gray: #F7F7F7;    /* Light Gray */
    }

    * {
      box-sizing: border-box;
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--gray);
      color: var(--dark);
      font-family: 'Inter', sans-serif;
      margin: 0;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      background-image: radial-gradient(#d1d5db 1px, transparent 0);
      background-size: 32px 32px;
    }

    .font-bebas { font-family: 'Bebas Neue', sans-serif; }
    .font-handwriting { font-family: 'Kalam', cursive; }

    /* Neo-Brutalist Utility Classes */
    .brutalist-border {
      border: 4px solid var(--dark);
    }
    
    .brutalist-shadow {
      box-shadow: 8px 8px 0px var(--dark);
      transition: all 0.2s ease-in-out;
    }
    
    .brutalist-shadow:hover {
      box-shadow: 12px 12px 0px var(--dark);
      transform: translate(-4px, -4px);
    }

    .brutalist-shadow-sm {
      box-shadow: 4px 4px 0px var(--dark);
    }

    /* Marquee Animation */
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 20s linear infinite;
    }

    /* Text Stroke for large numbers */
    .text-outline {
      color: transparent;
      -webkit-text-stroke: 2px var(--dark);
    }
    
    /* Custom Selection */
    ::selection {
      background: var(--accent);
      color: var(--dark);
    }
    
    ::-webkit-scrollbar { width: 12px; }
    ::-webkit-scrollbar-track { background: var(--gray); border-left: 4px solid var(--dark); }
    ::-webkit-scrollbar-thumb { background: var(--primary); border-left: 4px solid var(--dark); }
  `}</style>
);

// --- REUSABLE COMPONENTS ---

const BrutalistButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "font-bold uppercase tracking-wider px-8 py-4 brutalist-border brutalist-shadow inline-flex items-center justify-center gap-3 active:translate-x-2 active:translate-y-2 active:shadow-none transition-all";
  
  const variants = {
    primary: "bg-[var(--accent)] text-[var(--dark)]",
    secondary: "bg-[var(--light)] text-[var(--dark)]",
    blue: "bg-[var(--primary)] text-[var(--light)]",
    dark: "bg-[var(--dark)] text-[var(--accent)]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Sticker = ({ children, className = "", color = "bg-[var(--accent)]", rotate = "-rotate-6" }) => (
  <div className={`absolute ${rotate} ${color} text-[var(--dark)] font-bold px-4 py-2 brutalist-border brutalist-shadow-sm whitespace-nowrap z-20 hover:scale-110 transition-transform cursor-pointer ${className}`}>
    {children}
  </div>
);

const HandDrawnArrow = ({ className }) => (
  <svg className={className} width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 90 Q 40 10, 90 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M70 10 L 95 20 L 80 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const Scribble = ({ className }) => (
  <svg className={className} width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 20 Q 20 5, 35 25 T 65 15 T 95 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// --- SECTIONS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="pointer-events-auto bg-[var(--light)] brutalist-border brutalist-shadow-sm px-6 py-2">
        <span className="font-bebas text-3xl tracking-wide">DIGANTA PAL</span>
      </div>
      <div className="pointer-events-auto hidden md:flex items-center gap-4 bg-[var(--light)] brutalist-border brutalist-shadow-sm p-2">
        {['About', 'Work', 'Journey'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 font-bold hover:bg-[var(--accent)] transition-colors rounded-sm uppercase text-sm">
            {item}
          </a>
        ))}
      </div>
      <div className="pointer-events-auto flex gap-4">
        <a href="/CV.pdf" target="_blank" rel="noreferrer" className="bg-[var(--accent)] text-[var(--dark)] brutalist-border brutalist-shadow-sm px-6 py-3 font-bold hover:bg-[var(--light)] transition-colors uppercase hidden md:block">
          Resume
        </a>
        <a href="#contact" className="bg-[var(--primary)] text-white brutalist-border brutalist-shadow-sm px-6 py-3 font-bold hover:bg-[var(--dark)] transition-colors uppercase">
          Let's Talk
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] pt-32 pb-20 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[var(--dark)] text-[var(--accent)] font-bold px-4 py-1.5 brutalist-border mb-6 -rotate-2"
          >
            FOR FUTURE BUILDERS 🚀
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-bebas text-[5rem] sm:text-[7rem] lg:text-[9rem] leading-[0.85] text-[var(--dark)] mb-6"
          >
            NOT YOUR <br />
            TYPICAL <br />
            <span className="text-[var(--primary)] relative inline-block">
              ENGINEERING
              {/* Decorative Underline */}
              <svg className="absolute w-full h-8 -bottom-4 left-0 text-[var(--accent)]" viewBox="0 0 400 20" preserveAspectRatio="none">
                <path d="M0,10 Q200,20 400,0" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
              </svg>
            </span><br />
            STUDENT.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <p className="text-xl md:text-2xl font-semibold max-w-xl mb-10 leading-relaxed border-l-4 border-[var(--dark)] pl-6 py-2 bg-white/50 backdrop-blur-sm">
              I build AI products, websites, brands, and digital experiences while pursuing B.E. in Information Technology.
            </p>
            <HandDrawnArrow className="absolute -right-16 top-0 text-[var(--primary)] hidden md:block" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto flex-wrap"
          >
            <BrutalistButton variant="primary" onClick={() => document.getElementById('work').scrollIntoView()}>
              VIEW MY WORK <ArrowRight size={24} />
            </BrutalistButton>
            <BrutalistButton variant="secondary" onClick={() => document.getElementById('journey').scrollIntoView()}>
              EXPLORE JOURNEY
            </BrutalistButton>
            <BrutalistButton variant="dark" onClick={() => window.open('/CV.pdf', '_blank')}>
              RESUME
            </BrutalistButton>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Cutout Image & Stickers */}
        <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] w-full mt-12 lg:mt-0">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
            className="relative w-full h-full flex items-end justify-center"
          >
            {/* Background Blob/Shape */}
            <div className="absolute inset-0 bg-[var(--primary)] rounded-full brutalist-border brutalist-shadow scale-90 translate-y-12"></div>
            
            {/* Subject Image */}
            <img 
              src="https://avatars.githubusercontent.com/u/88098413?v=4" 
              alt="Diganta Pal" 
              className="relative z-10 w-[80%] h-[90%] object-cover object-top drop-shadow-2xl grayscale contrast-125 brightness-110 sepia-[.2]"
              style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
            />

            {/* Stickers */}
            <Sticker rotate="rotate-6" className="top-10 -right-4 md:-right-10" color="bg-[var(--accent)]">
              <span className="flex items-center gap-2"><Star size={16} fill="currentColor" /> FOUNDER OF HONEST.</span>
            </Sticker>
            
            <Sticker rotate="-rotate-12" className="top-40 -left-4 md:-left-12" color="bg-pink-400">
              AI BUILDER 🤖
            </Sticker>
            
            <Sticker rotate="rotate-3" className="bottom-40 -right-8 md:-right-16 text-xl" color="bg-green-400">
              BUILD. LEARN. SHIP.
            </Sticker>
            
            <Sticker rotate="-rotate-6" className="bottom-20 left-0" color="bg-[var(--light)]">
              <span className="font-handwriting text-xl text-[var(--primary)]">2024 - 2028</span>
            </Sticker>

            {/* Doodles */}
            <svg className="absolute top-0 left-0 text-[var(--accent)] w-24 h-24 -translate-x-1/2 -translate-y-1/2 z-0 animate-pulse" viewBox="0 0 100 100">
              <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="currentColor" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustMarquee = () => {
  const words = [
    "B.E. IT STUDENT", "•", 
    "FOUNDER", "•", 
    "AI DEVELOPER", "•", 
    "UI/UX DESIGNER", "•", 
    "FULL STACK DEVELOPER", "•", 
    "FREELANCER", "•"
  ];
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="bg-[var(--primary)] text-[var(--light)] brutalist-border border-l-0 border-r-0 py-4 overflow-hidden relative rotate-1 scale-105 my-12 z-20">
      <div className="animate-marquee font-bebas text-4xl tracking-widest whitespace-nowrap">
        {repeatedWords.map((word, index) => (
          <span key={index} className={`mx-6 ${word === '•' ? 'text-[var(--accent)]' : ''}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-bebas text-[4rem] sm:text-[6rem] lg:text-[8rem] leading-[0.9] text-[var(--dark)] mb-10">
            COLLEGE GIVES <br className="hidden sm:block" /> ME A DEGREE. <br />
            I BUILD <span className="inline-block bg-[var(--primary)] text-[var(--light)] px-6 py-2 -rotate-2 brutalist-border brutalist-shadow-sm mt-4 lg:mt-0">REAL THINGS.</span>
          </h2>
          
          <div className="max-w-3xl mx-auto bg-[var(--light)] brutalist-border brutalist-shadow p-8 md:p-12 text-left relative">
            {/* Tape effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-gray-200 opacity-80 rotate-2"></div>
            
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
              I'm an Information Technology student at <span className="font-bold bg-[var(--accent)] px-2">UIT Burdwan</span>, but my education doesn't stop at the syllabus. 
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              While my peers are studying theory, I'm integrating <span className="font-bold border-b-4 border-[var(--primary)]">AI</span> into products, building modern web applications, and running my own creative studio, <span className="font-bold font-bebas text-2xl tracking-wider">HONEST.</span>
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              I bridge the gap between heavy engineering and world-class design, creating experiences that look beautiful and perform flawlessly.
            </p>
            
            <Scribble className="absolute -bottom-6 right-10 text-[var(--primary)] w-32" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "AI Development", desc: "Building AI-powered products and intelligent automation systems.", icon: <Terminal size={40} />, bg: "bg-[#FF90E8]" },
    { title: "Web Development", desc: "Crafting lightning-fast, modern websites with React & Next.js.", icon: <Layout size={40} />, bg: "bg-[#23A094]", text: "text-white" },
    { title: "UI/UX Design", desc: "Designing beautiful, intuitive, and high-converting experiences.", icon: <PenTool size={40} />, bg: "bg-[var(--accent)]" },
    { title: "Founder", desc: "Running HONEST., managing clients, projects, and a creative team.", icon: <Rocket size={40} />, bg: "bg-[var(--primary)]", text: "text-white" },
    { title: "Branding", desc: "Creating bold visual identities and creative design systems.", icon: <Star size={40} />, bg: "bg-[var(--light)]" },
    { title: "Problem Solving", desc: "Using technology to build scalable solutions for real problems.", icon: <Lightbulb size={40} />, bg: "bg-[#FF5C00]", text: "text-white" },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-bebas text-6xl md:text-8xl mb-16 text-center">WHAT I <span className="text-[var(--primary)]">DO.</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${service.bg} ${service.text || 'text-[var(--dark)]'} p-8 brutalist-border brutalist-shadow flex flex-col hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group`}
            >
              <div className="mb-6 bg-white/20 w-16 h-16 rounded-full flex items-center justify-center brutalist-border">
                {service.icon}
              </div>
              <h3 className="font-bebas text-4xl mb-4 tracking-wide">{service.title}</h3>
              <p className="font-medium text-lg opacity-90">{service.desc}</p>
              
              {/* Decorative background shape */}
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-150 transition-transform duration-500 pointer-events-none">
                {service.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HonestSection = () => {
  return (
    <section className="py-32 bg-[var(--accent)] brutalist-border border-l-0 border-r-0 relative overflow-hidden">
      {/* Background doodles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="font-bebas text-7xl md:text-[8rem] leading-[0.9] text-[var(--dark)] mb-8">
            BUILDING <br />
            <span className="text-[var(--light)]" style={{ textShadow: '4px 4px 0px #111111' }}>HONEST.</span>
          </h2>
          <div className="bg-[var(--light)] p-8 brutalist-border brutalist-shadow rotate-1 max-w-xl relative">
            <div className="absolute -top-6 -left-6 bg-red-500 text-white font-handwriting px-4 py-1 rotate-[-15deg] brutalist-border text-xl">My Agency!</div>
            <p className="text-xl font-medium mb-6">
              HONEST. is a creative digital studio I founded to help businesses scale with raw, authentic digital experiences.
            </p>
            <ul className="space-y-4 font-bold text-lg">
              <li className="flex items-center gap-3"><CheckIcon /> Websites & Apps</li>
              <li className="flex items-center gap-3"><CheckIcon /> Creative Design</li>
              <li className="flex items-center gap-3"><CheckIcon /> Branding Identity</li>
              <li className="flex items-center gap-3"><CheckIcon /> Video Editing</li>
              <li className="flex items-center gap-3"><CheckIcon /> AI Solutions</li>
            </ul>
          </div>
        </div>
        
        <div className="relative h-[400px] lg:h-full flex items-center justify-center">
          {/* Stack of sticky notes/polaroids */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="absolute z-30 bg-[#FF90E8] w-64 h-64 p-6 brutalist-border brutalist-shadow-sm rotate-6 right-10 top-10 flex flex-col justify-between"
          >
            <div className="w-12 h-4 bg-gray-300 mx-auto -mt-10 mb-4 opacity-80"></div> {/* Tape */}
            <h3 className="font-bebas text-4xl">Client Work</h3>
            <p className="font-handwriting text-xl">Delivering high-end projects while balancing college.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="absolute z-20 bg-[var(--light)] w-72 h-80 p-4 brutalist-border brutalist-shadow -rotate-6 left-0 bottom-10"
          >
            <div className="w-full h-48 bg-gray-200 border-2 border-[var(--dark)] mb-4 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt="Studio" />
            </div>
            <p className="font-handwriting text-2xl text-center">Studio Vibes ⚡️</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Helper for checklist
const CheckIcon = () => (
  <span className="w-6 h-6 bg-[var(--primary)] text-white flex items-center justify-center brutalist-border shrink-0">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  </span>
);

const Projects = () => {
  const projects = [
    { id: "01", title: "HONEST.", desc: "Premium landing page for creative agency.", tech: "Next.js, Tailwind", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop", color: "bg-[#2457FF]" },
    { id: "02", title: "R.J ENTERPRISE", desc: "Corporate security solutions website.", tech: "React, TypeScript", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop", color: "bg-[#FF5C00]" },
    { id: "03", title: "LAKSHYAVEDH", desc: "High-energy modern gymnasium site.", tech: "Three.js, GSAP", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop", color: "bg-[#23A094]" },
    { id: "04", title: "CAFEBUCKS", desc: "Elegant e-commerce for premium roastery.", tech: "Framer Motion", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop", color: "bg-[#FF90E8]" },
  ];

  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-bebas text-6xl md:text-8xl mb-20">THINGS I <span className="text-[var(--primary)]">BUILT.</span></h2>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-[var(--light)] brutalist-border brutalist-shadow p-6 md:p-10 hover:bg-gray-50 transition-colors"
            >
              {/* Giant Number Background */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 font-bebas text-[15rem] md:text-[20rem] text-outline opacity-10 pointer-events-none z-0">
                {project.id}
              </div>

              {/* Details (Left) */}
              <div className="w-full md:w-1/2 relative z-10 flex flex-col items-start order-2 md:order-1">
                <span className={`inline-block px-4 py-1 font-bold brutalist-border mb-6 text-white ${project.color}`}>
                  PROJECT {project.id}
                </span>
                <h3 className="font-bebas text-5xl md:text-7xl mb-4">{project.title}</h3>
                <p className="text-xl font-medium mb-6">{project.desc}</p>
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-bold text-sm bg-gray-200 px-3 py-1 rounded-sm border-2 border-[var(--dark)]">Tech Stack</span>
                  <span className="font-medium text-[var(--dark)]">{project.tech}</span>
                </div>
                <BrutalistButton variant="dark" className="px-6 py-3 text-sm">
                  View Live Site <ExternalLink size={18} />
                </BrutalistButton>
              </div>

              {/* Image (Right) */}
              <div className="w-full md:w-1/2 relative z-10 order-1 md:order-2">
                <div className="aspect-[4/3] brutalist-border brutalist-shadow-sm overflow-hidden bg-[var(--dark)] group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-300">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Firebase", "Three.js", "GSAP", "Tailwind CSS", "Python", "AI Integration", "Figma", "C++"];
  
  return (
    <section className="py-24 bg-[var(--dark)] text-[var(--light)] brutalist-border border-l-0 border-r-0 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="font-bebas text-6xl md:text-8xl mb-16">MY <span className="text-[var(--accent)]">TECH STACK.</span></h2>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
              className={`text-xl md:text-3xl font-bebas px-6 py-3 brutalist-border cursor-pointer transition-colors ${
                i % 3 === 0 ? 'bg-[var(--primary)] text-white' : 
                i % 3 === 1 ? 'bg-[var(--accent)] text-[var(--dark)]' : 
                'bg-[var(--light)] text-[var(--dark)]'
              }`}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative large shapes behind */}
      <div className="absolute top-1/2 left-10 w-64 h-64 border-[10px] border-[#333] rounded-full -translate-y-1/2 opacity-50 pointer-events-none"></div>
      <div className="absolute top-1/4 right-20 w-32 h-32 bg-[var(--primary)] -rotate-12 opacity-20 pointer-events-none"></div>
    </section>
  );
};

const Journey = () => {
  const timeline = [
    { year: "2019", text: "Started learning technology and coding basics." },
    { year: "2022", text: "Began freelancing and building real-world projects." },
    { year: "2024", text: "Joined B.E. Information Technology program." },
    { year: "2025", text: "Founded HONEST. Creative Digital Studio." },
    { year: "FUTURE", text: "Building AI startups and scaling impact." },
  ];

  return (
    <section id="journey" className="py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-bebas text-6xl md:text-8xl mb-20 text-center">HOW I <span className="text-[var(--primary)]">GOT HERE.</span></h2>
        
        <div className="relative border-l-8 border-[var(--dark)] ml-6 md:ml-12 pl-8 md:pl-16 space-y-16">
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[44px] md:-left-[76px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full brutalist-border flex items-center justify-center z-10 ${
                index === timeline.length - 1 ? 'bg-[var(--accent)] animate-bounce' : 'bg-[var(--light)]'
              }`}>
                {index === timeline.length - 1 && <Star size={20} fill="currentColor" />}
              </div>
              
              <h3 className={`font-bebas text-4xl md:text-5xl mb-2 ${index === timeline.length - 1 ? 'text-[var(--primary)]' : 'text-[var(--dark)]'}`}>
                {item.year}
              </h3>
              <div className="bg-[var(--light)] brutalist-border brutalist-shadow-sm p-6 inline-block max-w-lg">
                <p className="text-lg md:text-xl font-bold">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FunFacts = () => {
  const facts = [
    { num: "20+", label: "Projects Built", color: "bg-[#23A094]" },
    { num: "100+", label: "Designs Created", color: "bg-[#FF90E8]" },
    { num: "1000+", label: "Hours Learning", color: "bg-[var(--primary)]" },
    { num: "FOUNDER", label: "HONEST. Studio", color: "bg-[var(--accent)]", textColor: "text-[var(--dark)]" },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {facts.map((fact, i) => (
            <div key={i} className={`${fact.color} ${fact.textColor || 'text-white'} p-8 text-center brutalist-border brutalist-shadow-sm hover:translate-x-1 hover:-translate-y-1 transition-transform`}>
              <h3 className="font-bebas text-5xl md:text-6xl mb-2">{fact.num}</h3>
              <p className="font-bold text-sm uppercase tracking-wider">{fact.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[var(--light)] brutalist-border border-l-0 border-r-0 border-b-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="font-bebas text-[5rem] sm:text-[8rem] lg:text-[10rem] leading-[0.8] mb-12"
        >
          LET'S BUILD <br />
          <span className="text-[var(--primary)]">SOMETHING</span> <br />
          AWESOME.
        </motion.h2>
        
        <BrutalistButton variant="primary" className="text-2xl px-12 py-6 mb-20 animate-pulse">
          <Mail size={32} /> dp2005317@gmail.com
        </BrutalistButton>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="bg-[var(--light)] p-4 brutalist-border brutalist-shadow-sm hover:bg-[var(--primary)] hover:text-white transition-colors">
            <Linkedin size={32} />
          </a>
          <a href="#" className="bg-[var(--light)] p-4 brutalist-border brutalist-shadow-sm hover:bg-[var(--dark)] hover:text-white transition-colors">
            <Github size={32} />
          </a>
          <a href="#" className="bg-[var(--light)] p-4 brutalist-border brutalist-shadow-sm hover:bg-[#E1306C] hover:text-white transition-colors">
            <Instagram size={32} />
          </a>
          <a href="#" className="bg-[var(--light)] p-4 brutalist-border brutalist-shadow-sm hover:bg-[#25D366] hover:text-white transition-colors font-bold font-bebas text-2xl flex items-center px-6">
            WhatsApp
          </a>
        </div>
      </div>
      
      {/* Footer text */}
      <div className="absolute bottom-6 left-0 right-0 text-center font-bold text-sm uppercase tracking-widest">
        © {new Date().getFullYear()} Diganta Pal. Built differently.
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