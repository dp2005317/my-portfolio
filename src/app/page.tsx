"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, ExternalLink, Mail, 
  Terminal, Rocket, PenTool, Layout, 
  Lightbulb, Zap, Star, Code2, Briefcase, ChevronRight
} from 'lucide-react';

const Github = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const Linkedin = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Instagram = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

// --- GLOBAL STYLES & FONTS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800;900&family=Outfit:wght@400;500;600;700;800&family=Kalam:wght@400;700&display=swap');

    :root {
      --primary: #7C3AED; /* Violet */
      --accent: #FDE047;  /* Yellow */
      --pink: #F472B6;    /* Pink */
      --green: #4ADE80;   /* Green */
      --orange: #FB923C;  /* Orange */
      --dark: #0F172A;    /* Slate 900 */
      --light: #F8FAFC;   /* Slate 50 */
      --gray: #E2E8F0;    /* Slate 200 */
    }

    * {
      box-sizing: border-box;
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg);
      color: var(--dark);
      font-family: 'Outfit', sans-serif;
      margin: 0;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      background-image: radial-gradient(#cbd5e1 1.5px, transparent 0);
      background-size: 32px 32px;
    }

    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-handwriting { font-family: 'Kalam', cursive; }

    /* Playful Neo-Brutalist Classes */
    .neo-border {
      border: 3.5px solid var(--dark);
    }
    
    .neo-box {
      border: 3.5px solid var(--dark);
      border-radius: 1.5rem;
      box-shadow: 6px 6px 0px var(--dark);
      transition: all 0.2s ease-out;
    }
    
    .neo-box:hover {
      box-shadow: 10px 10px 0px var(--dark);
      transform: translate(-4px, -4px);
    }

    .neo-btn {
      border: 3px solid var(--dark);
      border-radius: 9999px;
      box-shadow: 4px 4px 0px var(--dark);
      transition: all 0.15s ease-out;
    }

    .neo-btn:active {
      box-shadow: 0px 0px 0px var(--dark);
      transform: translate(4px, 4px);
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

    ::selection {
      background: var(--accent);
      color: var(--dark);
    }
    
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: var(--bg); border-left: 3px solid var(--dark); }
    ::-webkit-scrollbar-thumb { background: var(--primary); border-left: 3px solid var(--dark); border-radius: 0; }
  `}</style>
);

// --- REUSABLE COMPONENTS ---

const PlayfulButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "font-display font-bold uppercase tracking-wider px-8 py-3.5 inline-flex items-center justify-center gap-3 neo-btn";
  
  const variants = {
    primary: "bg-[var(--accent)] text-[var(--dark)]",
    blue: "bg-[var(--primary)] text-[var(--light)]",
    white: "bg-[var(--light)] text-[var(--dark)]",
    dark: "bg-[var(--dark)] text-[var(--accent)]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Sticker = ({ children, className = "", color = "bg-[var(--accent)]", rotate = "-rotate-6" }) => (
  <div className={`absolute ${rotate} ${color} text-[var(--dark)] font-bold text-xs sm:text-base px-2 sm:px-4 py-1.5 sm:py-2 neo-border rounded-lg sm:rounded-xl shadow-[2px_2px_0px_rgba(15,23,42,1)] sm:shadow-[4px_4px_0px_rgba(15,23,42,1)] whitespace-nowrap z-20 hover:scale-110 transition-transform cursor-pointer flex items-center gap-1.5 sm:gap-2 ${className}`}>
    {children}
  </div>
);

const WindowDots = () => (
  <div className="flex gap-1.5 mb-4 border-b border-black/10 pb-3">
    <div className="w-3 h-3 rounded-full bg-[#FF5F56] neo-border border-[2px]"></div>
    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] neo-border border-[2px]"></div>
    <div className="w-3 h-3 rounded-full bg-[#27C93F] neo-border border-[2px]"></div>
  </div>
);

// --- SECTIONS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div className="pointer-events-auto bg-[var(--accent)] neo-border rounded-xl px-5 py-2 shadow-[4px_4px_0px_#0f172a] rotate-1 hover:rotate-0 transition-transform cursor-pointer">
          <span className="font-display font-black text-2xl tracking-tight text-[var(--dark)]">DIGANTA PAL</span>
        </div>
        
        {/* Desktop Links */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 bg-[var(--light)] neo-border rounded-full p-1 shadow-[4px_4px_0px_#0f172a]">
          {['About', 'Work', 'Journey'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2 font-bold hover:bg-slate-200 transition-colors rounded-full uppercase text-sm text-[var(--dark)]">
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Toggle & Talk Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button 
            className="md:hidden bg-[var(--light)] text-[var(--dark)] neo-border rounded-full px-4 py-3 font-bold shadow-[4px_4px_0px_#0f172a]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>
          <a href="#contact" className="hidden sm:inline-flex bg-[var(--dark)] text-[var(--accent)] neo-border rounded-full px-6 py-3 font-bold hover:bg-[var(--primary)] hover:text-[var(--light)] transition-colors uppercase shadow-[4px_4px_0px_#0f172a] items-center gap-2">
            Let's Talk <Zap size={16} className="fill-[var(--accent)] text-[var(--accent)]" />
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="pointer-events-auto md:hidden mt-4 bg-[var(--light)] neo-border rounded-xl p-4 shadow-[4px_4px_0px_#0f172a] flex flex-col gap-2 max-w-7xl mx-auto">
          {['About', 'Work', 'Journey', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 font-bold text-[var(--dark)] hover:bg-slate-200 transition-colors rounded-lg uppercase text-lg text-center"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] pt-32 pb-20 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[var(--dark)] text-[var(--accent)] font-bold font-display px-4 py-2 neo-border rounded-full mb-6 -rotate-2"
          >
            <Star size={16} className="fill-[var(--accent)]" /> FOR FUTURE BUILDERS
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-[2.5rem] sm:text-[4.5rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[0.9] text-[var(--dark)] mb-6 uppercase"
          >
            BEING HONEST. <br />
            I AM AN <br />
            <span className="relative inline-block mt-2">
              <span className="absolute inset-0 bg-[var(--accent)] neo-border rounded-2xl shadow-[6px_6px_0px_#0f172a] -rotate-1"></span>
              <span className="relative px-4 text-[var(--dark)]">ENGINEERING</span>
            </span><br />
            STUDENT.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <p className="text-xl md:text-2xl font-semibold max-w-xl mb-10 leading-relaxed bg-[var(--light)] neo-border rounded-2xl p-6 shadow-[4px_4px_0px_#0f172a]">
              I build AI products, websites, brands, and digital experiences while pursuing B.E. in Information Technology.
            </p>
            {/* Arrow Doodle */}
            <svg className="absolute -right-12 -bottom-8 text-[var(--primary)] hidden md:block w-24 h-24 rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 80 Q 40 20, 80 20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M60 10 L 85 20 L 70 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
          >
            <PlayfulButton variant="blue" onClick={() => document.getElementById('work').scrollIntoView()}>
              VIEW MY WORK <ArrowRight size={20} />
            </PlayfulButton>
            <PlayfulButton variant="white" onClick={() => document.getElementById('journey').scrollIntoView()}>
              EXPLORE JOURNEY
            </PlayfulButton>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Image & Stickers */}
        <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] lg:h-[650px] w-full mt-12 lg:mt-0">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Pill shaped image container */}
            <div className="relative w-[85%] h-[90%] bg-[var(--primary)] neo-border rounded-[4rem] shadow-[12px_12px_0px_#0f172a] overflow-hidden group">
              <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <img 
                src="https://avatars.githubusercontent.com/u/88098413?v=4" 
                alt="Diganta Pal" 
                className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 relative z-10"
              />
            </div>

            {/* Floating Stickers using Framer Motion */}
            <motion.div className="absolute top-4 sm:top-10 right-2 lg:-right-4 z-20" animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }}>
              <Sticker rotate="rotate-6" color="bg-[var(--accent)]">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[var(--dark)]" /> FOUNDER OF HONEST.
              </Sticker>
            </motion.div>
            
            <motion.div className="absolute top-1/3 -left-2 sm:left-2 lg:-left-8 z-20" animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}>
              <Sticker rotate="-rotate-12" color="bg-[var(--pink)]">
                AI BUILDER 🤖
              </Sticker>
            </motion.div>
            
            <motion.div className="absolute bottom-16 sm:bottom-24 -right-2 sm:right-2 lg:-right-6 z-20" animate={{ y: [-8, 8, -8] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}>
              <Sticker rotate="rotate-3" color="bg-[var(--green)] text-white">
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 fill-white" /> BUILD. LEARN. SHIP.
              </Sticker>
            </motion.div>
            
            <motion.div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-6 lg:-left-2 z-20" animate={{ y: [5, -5, 5] }} transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}>
              <Sticker rotate="-rotate-6" color="bg-[var(--light)]">
                <span className="font-handwriting text-sm sm:text-xl text-[var(--primary)]">2024 - 2028</span>
              </Sticker>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustMarquee = () => {
  const words = [
    "B.E. IT STUDENT", "⚡️", 
    "FOUNDER", "⚡️", 
    "AI DEVELOPER", "⚡️", 
    "UI/UX DESIGNER", "⚡️", 
    "FULL STACK DEVELOPER", "⚡️", 
    "FREELANCER", "⚡️"
  ];
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="bg-[var(--dark)] text-[var(--accent)] neo-border border-l-0 border-r-0 py-4 overflow-hidden relative rotate-2 scale-105 my-12 z-20 shadow-[0_8px_0px_rgba(36,87,255,1)]">
      <div className="animate-marquee font-display font-black text-3xl tracking-wider whitespace-nowrap uppercase">
        {repeatedWords.map((word, index) => (
          <span key={index} className={`mx-6 ${word === '⚡️' ? 'text-[var(--pink)]' : ''}`}>
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
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6"
          >
            <h2 className="font-display font-black text-[3rem] md:text-[5rem] lg:text-[6rem] leading-[0.9] text-[var(--dark)] mb-6 uppercase">
              COLLEGE GIVES <br /> ME A DEGREE. <br />
              <span className="inline-block bg-[var(--primary)] text-[var(--light)] px-4 py-2 neo-border rounded-2xl shadow-[6px_6px_0px_#0f172a] mt-4 rotate-2">
                I BUILD REAL
              </span> <br />
              THINGS.
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6"
          >
            <div className="bg-[var(--light)] neo-box p-8 md:p-10 relative">
              <WindowDots />
              
              <div className="space-y-6 text-lg md:text-xl font-medium text-slate-800">
                <p>
                  I'm an Information Technology student at <span className="bg-[var(--accent)] px-2 py-0.5 neo-border rounded-md font-bold">UIT Burdwan</span>, but my education doesn't stop at the syllabus. 
                </p>
                <p>
                  While my peers are studying theory, I'm integrating <span className="text-[var(--primary)] font-bold">AI</span> into products, building modern web applications, and running my own creative studio, <span className="font-display font-black text-2xl tracking-wider">HONEST.</span>
                </p>
                <p>
                  I bridge the gap between heavy engineering and world-class design, creating experiences that look beautiful, feel playful, and perform flawlessly.
                </p>
              </div>
              
              {/* Scribble graphic */}
              <svg className="absolute -bottom-10 -right-6 text-[var(--pink)] w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 50 Q 30 10, 50 50 T 90 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M80 40 L 95 50 L 80 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "AI Development", desc: "Building AI-powered products and intelligent systems.", icon: <Terminal size={32} />, color: "bg-[var(--pink)]" },
    { title: "Web Development", desc: "Crafting lightning-fast websites with React & Next.js.", icon: <Code2 size={32} />, color: "bg-[var(--green)]", text: "text-white" },
    { title: "UI/UX Design", desc: "Designing beautiful, intuitive, playful experiences.", icon: <PenTool size={32} />, color: "bg-[var(--accent)]" },
    { title: "Founder", desc: "Running HONEST., managing clients and a creative team.", icon: <Rocket size={32} />, color: "bg-[var(--primary)]", text: "text-white" },
    { title: "Branding", desc: "Creating bold visual identities and design systems.", icon: <Star size={32} />, color: "bg-[var(--light)]" },
    { title: "Problem Solving", desc: "Using technology to build scalable real-world solutions.", icon: <Lightbulb size={32} />, color: "bg-[var(--orange)]", text: "text-white" },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl mb-12 sm:mb-16 text-center uppercase">WHAT I <span className="text-[var(--primary)]">DO.</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${service.color} ${service.text || 'text-[var(--dark)]'} p-8 neo-box flex flex-col relative overflow-hidden group`}
            >
              <div className="mb-6 bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center neo-border">
                {service.icon}
              </div>
              <h3 className="font-display font-black text-3xl mb-3 uppercase">{service.title}</h3>
              <p className="font-medium text-lg opacity-90 leading-relaxed">{service.desc}</p>
              
              {/* Decorative hover shape */}
              <div className="absolute -right-6 -bottom-6 opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300 pointer-events-none">
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
    <section className="py-32 bg-[var(--accent)] neo-border border-l-0 border-r-0 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 2px, transparent 0)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="font-display font-black text-[3rem] sm:text-[4rem] md:text-[6rem] leading-[0.9] text-[var(--dark)] mb-8 uppercase">
            BUILDING <br />
            <span className="text-[var(--light)]" style={{ textShadow: '4px 4px 0px #0F172A' }}>HONEST.</span>
          </h2>
          <div className="bg-[var(--light)] p-8 neo-box rotate-1 max-w-xl relative">
            <WindowDots />
            <div className="absolute -top-5 -left-5 bg-[var(--pink)] text-[var(--dark)] font-handwriting font-bold px-4 py-1 -rotate-12 neo-border rounded-lg text-xl shadow-[2px_2px_0px_#0f172a]">
              My Studio! ✨
            </div>
            <p className="text-xl font-bold mb-6">
              HONEST. is a creative digital studio I founded to help businesses scale with raw, authentic digital experiences.
            </p>
            <ul className="space-y-4 font-semibold text-lg text-slate-700">
              <li className="flex items-center gap-3"><CheckIcon /> Websites & Web Apps</li>
              <li className="flex items-center gap-3"><CheckIcon /> Creative Design & UI/UX</li>
              <li className="flex items-center gap-3"><CheckIcon /> Branding Identity</li>
              <li className="flex items-center gap-3"><CheckIcon /> AI Solutions</li>
            </ul>
          </div>
        </div>
        
        <div className="relative h-[400px] lg:h-full flex items-center justify-center mt-10 lg:mt-0">
          {/* Post-it / Cards */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="absolute z-30 bg-[#FF90E8] w-64 h-64 p-6 neo-box rotate-6 right-0 lg:right-10 top-0 lg:top-10 flex flex-col"
          >
            <div className="w-16 h-6 bg-white/50 mx-auto -mt-10 mb-4 neo-border -rotate-3"></div> {/* Tape */}
            <h3 className="font-display font-black text-3xl uppercase mb-2">Client Work</h3>
            <p className="font-handwriting text-xl leading-snug">Delivering high-end projects while balancing college life.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="absolute z-20 bg-[var(--light)] w-72 p-4 neo-box -rotate-6 left-0 bottom-0 lg:bottom-10"
          >
            <div className="w-full aspect-[4/3] bg-slate-200 neo-border rounded-xl mb-4 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" alt="Studio" />
            </div>
            <p className="font-handwriting font-bold text-2xl text-center text-[var(--primary)]">Studio Vibes ⚡️</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CheckIcon = () => (
  <span className="w-6 h-6 bg-[var(--primary)] text-white flex items-center justify-center neo-border rounded-md shrink-0">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  </span>
);

const Projects = () => {
  const projects = [
    { id: "01", title: "HONEST.", desc: "Premium landing page for a creative agency.", tech: "Next.js, Tailwind", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop", color: "bg-[var(--primary)]", link: "https://github.com/dp2005317" },
    { id: "02", title: "R.J ENTERPRISE", desc: "Corporate security solutions website.", tech: "React, TypeScript", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop", color: "bg-[var(--orange)]", link: "https://github.com/dp2005317" },
    { id: "03", title: "LAKSHYAVEDH", desc: "High-energy modern gymnasium site.", tech: "Three.js, GSAP", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop", color: "bg-[var(--green)]", link: "https://github.com/dp2005317" },
    { id: "04", title: "CAFEBUCKS", desc: "Elegant e-commerce for premium roastery.", tech: "Framer Motion", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop", color: "bg-[var(--pink)]", link: "https://github.com/dp2005317" },
  ];

  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-[3rem] sm:text-[4rem] md:text-[6rem] mb-12 sm:mb-16 uppercase">THINGS I <span className="text-[var(--primary)]">BUILT.</span></h2>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group flex flex-col md:flex-row items-stretch gap-0 bg-[var(--light)] neo-box overflow-hidden"
            >
              {/* Details (Left) */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-start justify-center relative border-b-4 md:border-b-0 md:border-r-4 border-[var(--dark)]">
                
                <span className={`inline-block px-4 py-1.5 font-bold neo-border rounded-xl mb-6 text-white text-sm tracking-wide shadow-[2px_2px_0px_#0f172a] ${project.color}`}>
                  PROJECT {project.id}
                </span>
                
                <h3 className="font-display font-black text-4xl md:text-5xl mb-4 uppercase">{project.title}</h3>
                <p className="text-xl font-medium mb-8 text-slate-600">{project.desc}</p>
                
                <div className="flex items-center gap-3 mb-10">
                  <span className="font-bold text-sm bg-[var(--accent)] px-3 py-1.5 rounded-lg neo-border shadow-[2px_2px_0px_#0f172a]">STACK</span>
                  <span className="font-bold text-[var(--dark)]">{project.tech}</span>
                </div>
                
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <PlayfulButton variant="dark" className="px-6 py-3 text-sm mt-auto">
                    View Live Site <ExternalLink size={18} />
                  </PlayfulButton>
                </a>
              </div>

              {/* Image (Right) */}
              <div className="w-full md:w-1/2 relative bg-[var(--dark)] overflow-hidden aspect-[4/3] md:aspect-auto">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100"
                />
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
    "AI Integration", "Figma", "C++"
  ];
  
  return (
    <section className="py-24 bg-[var(--dark)] text-[var(--light)] neo-border border-l-0 border-r-0 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl mb-12 sm:mb-16 uppercase">MY <span className="text-[var(--accent)]">TECH STACK.</span></h2>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05, rotate: Math.random() * 6 - 3 }}
              className={`text-xl md:text-2xl font-bold font-display uppercase tracking-wide px-6 py-3 neo-border rounded-2xl cursor-pointer transition-colors shadow-[4px_4px_0px_#FFD500] hover:shadow-[6px_6px_0px_#FF90E8] ${
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
    </section>
  );
};

const Journey = () => {
  const timeline = [
    { year: "2019", text: "Started learning technology and coding basics." },
    { year: "2022", text: "Started freelancing and building real-world projects." },
    { year: "2024", text: "Joined B.E. Information Technology program." },
    { year: "2025", text: "Founded HONEST. Creative Digital Studio." },
    { year: "FUTURE", text: "Building AI startups and scaling impact." },
  ];

  return (
    <section id="journey" className="py-24 bg-white neo-border border-l-0 border-r-0 border-t-0">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl mb-16 sm:mb-20 text-center uppercase">HOW I <span className="text-[var(--primary)]">GOT HERE.</span></h2>
        
        <div className="relative border-l-[6px] border-[var(--dark)] ml-6 md:ml-12 pl-8 md:pl-16 space-y-16">
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[45px] md:-left-[77px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full neo-border flex items-center justify-center z-10 shadow-[4px_4px_0px_#0f172a] ${
                index === timeline.length - 1 ? 'bg-[var(--accent)] animate-bounce' : 'bg-[var(--light)]'
              }`}>
                {index === timeline.length - 1 && <Star size={20} className="fill-[var(--dark)]" />}
              </div>
              
              <h3 className={`font-display font-black text-3xl md:text-4xl mb-4 ${index === timeline.length - 1 ? 'text-[var(--primary)]' : 'text-[var(--dark)]'}`}>
                {item.year}
              </h3>
              <div className="bg-[var(--bg)] neo-box p-6 inline-block max-w-lg">
                <p className="text-lg md:text-xl font-bold text-slate-800">{item.text}</p>
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
    { num: "20+", label: "Projects", color: "bg-[var(--green)]" },
    { num: "100+", label: "Designs", color: "bg-[var(--pink)]" },
    { num: "1000+", label: "Hours Learning", color: "bg-[var(--primary)]" },
    { num: "FOUNDER", label: "HONEST.", color: "bg-[var(--accent)]", textColor: "text-[var(--dark)]" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {facts.map((fact, i) => (
            <div key={i} className={`${fact.color} ${fact.textColor || 'text-white'} p-8 text-center neo-box`}>
              <h3 className="font-display font-black text-4xl md:text-5xl mb-2">{fact.num}</h3>
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
    <section id="contact" className="py-32 relative overflow-hidden bg-[var(--light)] neo-border border-l-0 border-r-0 border-b-0">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="font-display font-black text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] leading-[0.9] mb-12 uppercase"
        >
          LET'S BUILD <br />
          <span className="text-[var(--primary)] relative inline-block">
            SOMETHING
            <svg className="absolute w-full h-6 -bottom-2 left-0 text-[var(--accent)]" viewBox="0 0 400 20" preserveAspectRatio="none">
              <path d="M0,10 Q200,20 400,0" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span> <br />
          AWESOME.
        </motion.h2>
        
        <PlayfulButton variant="primary" className="text-base sm:text-xl md:text-2xl px-6 sm:px-12 py-4 sm:py-6 mb-20 shadow-[8px_8px_0px_#0f172a] hover:shadow-[12px_12px_0px_#0f172a]">
          <Mail className="w-5 h-5 sm:w-7 sm:h-7" /> dp2005317@gmail.com
        </PlayfulButton>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://www.linkedin.com/in/diganta-pal" target="_blank" rel="noreferrer" className="bg-[var(--light)] p-4 neo-btn hover:bg-[var(--primary)] hover:text-white transition-colors group">
            <Linkedin size={32} className="group-hover:scale-110 transition-transform" />
          </a>
          <a href="https://github.com/dp2005317" target="_blank" rel="noreferrer" className="bg-[var(--light)] p-4 neo-btn hover:bg-[var(--dark)] hover:text-white transition-colors group">
            <Github size={32} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
      
      {/* Footer text */}
      <div className="mt-24 text-center font-bold text-sm uppercase tracking-widest text-slate-500">
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