"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import * as THREE from 'three';
import {
  Mail, ExternalLink, ChevronRight,
  Code, Smartphone, Palette, Box, Database, Server,
  Terminal, User, Briefcase, Zap, Download,
  Sun, Moon, Home, FileText
} from 'lucide-react';

const Linkedin = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// --- GLOBAL STYLES & THEME VARIABLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

    :root {
      /* LIGHT THEME (Default) */
      --accent: #2563EB;
      --glow-color: rgba(37, 99, 235, 0.15);
      --bg: #f8f9fa;
      --text-primary: #111827;
      --text-secondary: #4b5563;
      --text-muted: #9ca3af;
      --border-color: rgba(0, 0, 0, 0.08);
      --card-bg: rgba(255, 255, 255, 0.6);
      --solid-card-bg: #ffffff;
      --card-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
      --noise-invert: 1;
      --noise-opacity: 0.02;
    }

    html.dark, body.dark, .dark {
      /* DARK THEME */
      --accent: #00E5FF;
      --glow-color: rgba(0, 229, 255, 0.15);
      --bg: #030303;
      --text-primary: #ffffff;
      --text-secondary: #a1a1aa;
      --text-muted: #52525b;
      --border-color: rgba(255, 255, 255, 0.08);
      --card-bg: rgba(25, 25, 25, 0.2);
      --solid-card-bg: #0a0a0a;
      --card-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
      --noise-invert: 0;
      --noise-opacity: 0.04;
    }

    * {
      box-sizing: border-box;
    }

    body {
      background-color: var(--bg);
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      transition: background-color 0.5s ease, color 0.5s ease;
    }

    /* ONLY hide cursor on devices with a mouse/fine pointer */
    @media (pointer: fine) {
      body {
        cursor: none;
      }
    }

    h1, h2, h3, h4, h5, h6, .display-font {
      font-family: 'Space Grotesk', sans-serif;
    }

    /* Noise overlay */
    .bg-noise {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none;
      z-index: 40;
      opacity: var(--noise-opacity);
      filter: invert(var(--noise-invert));
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      transition: filter 0.5s ease, opacity 0.5s ease;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 4px;
    }
    @media (min-width: 768px) {
      ::-webkit-scrollbar {
        width: 6px;
      }
    }
    ::-webkit-scrollbar-track {
      background: var(--bg);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--text-muted);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent);
    }

    html {
      scroll-behavior: smooth;
    }

    /* Utilities */
    .glass-card {
      background: var(--card-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      box-shadow: var(--card-shadow);
      transition: background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
    }
    
    .box-glow {
      box-shadow: 0 0 40px var(--glow-color);
    }
  `}</style>
);

// --- DATA ---
const SKILLS = [
  { name: 'React', icon: Code }, { name: 'Next.js', icon: Server },
  { name: 'TypeScript', icon: Terminal }, { name: 'Three.js', icon: Box },
  { name: 'Tailwind CSS', icon: Palette }, { name: 'Framer Motion', icon: Zap },
  { name: 'Node.js', icon: Database }, { name: 'React Native', icon: Smartphone }
];

const PROJECTS = [
  {
    title: 'Honest.',
    category: 'Creative Agency / Video Editing',
    description: 'A modern, premium landing page for a creative agency offering professional editing, graphic design, and modern websites with honest pricing.',
    tech: ['React', 'Next.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2670&auto=format&fit=crop',
    link: 'https://honestvisions.app'
  },
  {
    title: 'Cafebucks',
    category: 'E-Commerce / Hospitality',
    description: 'An elegant digital storefront for a premium Indian roastery, blending rich coffee culture with a luxurious UI and smooth interactions.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2671&auto=format&fit=crop',
    link: 'https://cafebucks-three.vercel.app'
  },
  {
    title: 'Lakshyavedh Gymnasium',
    category: 'Fitness / Brand Website',
    description: 'A highly motivational, high-energy website for a modern gymnasium. Features bold typography, striking accents, and dynamic layout.',
    tech: ['React', 'Three.js', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop',
    link: 'https://lakshyavedh.in'
  },
  {
    title: 'R.J. Enterprise',
    category: 'Corporate / Security',
    description: 'A professional and clean corporate website for a security surveillance company offering advanced CCTV and infrastructure solutions.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2664&auto=format&fit=crop',
    link: 'https://rjenterprise.org.in'
  },
  {
    title: 'DrawArc',
    category: 'SaaS / AI Tool',
    description: 'An advanced AI-powered architecture diagram generator featuring a highly interactive, node-based drag-and-drop canvas for cloud infrastructure.',
    tech: ['React', 'Node-based UI', 'AI Integration'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop',
    link: 'https://drawarc.vercel.app'
  }
];

const EXPERIENCE = [
  {
    year: '2024 - Present',
    role: 'Freelance Web Developer',
    company: 'R.J. Enterprise & Lakshyavedh Gymnasium',
    desc: 'Designed and developed production-ready, highly interactive websites for corporate and fitness clients, focusing on modern UI/UX, responsive layouts, and seamless performance.'
  },
  {
    year: '2024 - 2026',
    role: 'Software Engineering & AI Studies',
    company: 'Continuous Learning',
    desc: 'Deepened expertise in Artificial Intelligence, advanced Full-Stack Web Development, and core Data Structures & Algorithms (DSA) using C language.'
  }
];

// --- HOOKS ---
const useTypewriter = (texts, speed = 80, pause = 2500) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const current = texts[index];

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setIndex((i) => (i + 1) % texts.length);
        }
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + 1));
        if (text.length === current.length) {
          timeout = setTimeout(() => setIsDeleting(true), pause);
        }
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, texts, speed, pause]);

  return text;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// --- COMPONENTS ---

// 1. Custom Cursor
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const checkHover = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', checkHover);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', checkHover);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[var(--accent)] rounded-full z-[9999] mix-blend-difference"
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6, scale: isHovering ? 0.5 : 1 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border rounded-full z-[9998]"
        style={{ borderColor: 'var(--accent)', opacity: 0.5 }}
        animate={{
          x: mousePosition.x - 24, y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(234, 179, 8, 0.1)' : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.2 }}
      />
    </div>
  );
};

// 2. Cinematic Loader
const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: '-100%', opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/5 via-transparent to-transparent dark:from-zinc-900/20 dark:via-[#030303] dark:to-[#030303]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-[15vw] md:text-[8vw] font-bold display-font text-[var(--text-primary)] opacity-10">
          DIGANTA
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-[var(--accent)]">
           <h1 className="text-[15vw] md:text-[8vw] font-bold display-font overflow-hidden whitespace-nowrap" style={{ width: `${progress}%`, transition: 'width 0.2s ease-out' }}>
              DIGANTA
           </h1>
        </div>
      </motion.div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="text-sm font-medium tracking-[0.4em] text-[var(--text-secondary)] text-center">INITIALIZING</div>
        <div className="w-48 h-[1px] bg-[var(--border-color)] relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[var(--accent)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <div className="text-xs font-mono text-[var(--accent)]">{progress.toString().padStart(3, '0')}%</div>
      </div>
    </motion.div>
  );
};

// 3. Liquid Glass SVG Filter
const GlassFilter = () => (
  <svg className="hidden">
    <defs>
      <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
        <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
        <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
        <feComposite in="finalBlur" in2="finalBlur" operator="over" />
      </filter>
    </defs>
  </svg>
);

// 4. Magnetic Liquid Glass Button Wrapper
const LiquidGlassButton = ({ children, className, onClick, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    // Disable magnetic effect on mobile
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 md:hover:scale-105 disabled:pointer-events-none disabled:opacity-50 text-[var(--text-primary)] hover:text-[var(--accent)] outline-none rounded-full ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="absolute top-0 left-0 z-0 h-full w-full rounded-[inherit] bg-[var(--card-bg)] shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)] transition-all" />
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-[inherit]"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
      <div className="pointer-events-none z-10 flex items-center gap-2">
        {children}
      </div>
    </motion.button>
  );
};

// 4.5 Mobile Hero Background (Professional & Clean)
const MobileHeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden md:hidden pointer-events-none bg-[var(--bg)]">
      {/* Subtle, premium radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--accent)_0%,transparent_60%)] opacity-[0.15]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#ffffff_0%,transparent_50%)] opacity-5" />
      
      {/* Minimalist Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,transparent_10%,black_50%,transparent_90%)]" />
    </div>
  );
};

// 5. Dynamic 3D Hero Scene
const ThreeScene = ({ theme }) => {
  const containerRef = useRef(null);
  const materialsRef = useRef({});

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Completely disable 3D scene on mobile devices
    if (window.innerWidth < 768) return;

    let isMobile = false;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    // Performance optimizations
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00E5FF, 0.5);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const posArray = new Float32Array(starsCount * 3);
    for(let i = 0; i < starsCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // Holographic Orb Group
    const orbGroup = new THREE.Group();

    // Outer Wireframe
    const icosahedronGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const icosahedronMat = new THREE.MeshStandardMaterial({
        color: 0x222222,
        emissive: 0x00E5FF,
        emissiveIntensity: 0.15,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const wireframe = new THREE.Mesh(icosahedronGeo, icosahedronMat);
    orbGroup.add(wireframe);

    // Inner Liquid Sphere
    const sphereGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const sphereMat = new THREE.MeshPhysicalMaterial({
        color: 0x050505,
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.9
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    orbGroup.add(sphere);

    // Orbiting Ring
    const ringGeo = new THREE.TorusGeometry(2.5, 0.01, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.3 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    ring.rotation.y = Math.PI / 4;
    orbGroup.add(ring);

    // Initial positioning
    orbGroup.position.x = 2.5;
    scene.add(orbGroup);

    // Store references to update theme later without recreating scene
    materialsRef.current = { starsMaterial, sphereMat, icosahedronMat, ringMat, pointLight };

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotate Stars
        starsMesh.rotation.y = elapsedTime * 0.02;
        starsMesh.rotation.x = elapsedTime * 0.01;

        // Rotate Wireframe
        wireframe.rotation.x = elapsedTime * 0.15;
        wireframe.rotation.y = elapsedTime * 0.2;

        // Float Orb Group
        orbGroup.position.y = Math.sin(elapsedTime * 2) * 0.2;
        orbGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.1;

        // Distort Inner Sphere
        const positionAttribute = sphereGeo.attributes.position;
        const vertex = new THREE.Vector3();
        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i);
            vertex.normalize(); 
            const distortion = 1.2 + 0.05 * Math.sin(vertex.x * 5 + elapsedTime * 3) * Math.cos(vertex.y * 5 + elapsedTime * 3);
            vertex.multiplyScalar(distortion);
            positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
        positionAttribute.needsUpdate = true;

        renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
        if (!containerRef.current) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
        }
        scene.clear();
        sphereGeo.dispose();
        sphereMat.dispose();
        icosahedronGeo.dispose();
        icosahedronMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        starsGeometry.dispose();
        starsMaterial.dispose();
        renderer.dispose();
    };
  }, []);

  // Theme reactivity effect
  useEffect(() => {
    const mats = materialsRef.current;
    if (!mats.starsMaterial) return;

    if (theme === 'light') {
        mats.starsMaterial.color.setHex(0x9ca3af);
        mats.sphereMat.color.setHex(0xf3f4f6);
        mats.icosahedronMat.color.setHex(0xd1d5db);
        mats.icosahedronMat.emissive.setHex(0x2563EB);
        mats.ringMat.color.setHex(0x2563EB);
        mats.pointLight.color.setHex(0x2563EB);
        mats.pointLight.intensity = 0.8;
    } else {
        mats.starsMaterial.color.setHex(0xffffff);
        mats.sphereMat.color.setHex(0x050505);
        mats.icosahedronMat.color.setHex(0x222222);
        mats.icosahedronMat.emissive.setHex(0x00E5FF);
        mats.ringMat.color.setHex(0x00E5FF);
        mats.pointLight.color.setHex(0x00E5FF);
        mats.pointLight.intensity = 0.5;
    }
  }, [theme]);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// 5. 3D Tilt Card
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    // Disable tilt on mobile
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`relative rounded-2xl ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="absolute inset-0 z-10 pointer-events-none hidden md:block" />
      {children}
    </motion.div>
  );
};

// --- MAIN SECTIONS ---

const ThemeToggle = ({ theme, toggleTheme, className }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-[60px] shrink-0 items-center rounded-full transition-colors focus:outline-none border border-[var(--border-color)] ${
        isDark ? 'bg-[#121212]' : 'bg-[#e5e7eb]'
      } ${className || ''}`}
    >
      <span
        className={`inline-flex h-[26px] w-[26px] transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out items-center justify-center ${
          isDark ? 'translate-x-[30px]' : 'translate-x-[2px]'
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-zinc-800" strokeWidth={2.5} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-yellow-500" strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
};

const TopHeader = ({ theme, toggleTheme }) => {
  return (
    <header className="fixed top-0 w-full z-[60] py-4 md:py-6 px-4 md:px-12 flex justify-between items-center pointer-events-none">
      <a href="#" className="pointer-events-auto text-lg md:text-2xl font-bold display-font tracking-widest uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors drop-shadow-md">
        DIGANTA PAL
      </a>
      <div className="pointer-events-auto flex items-center gap-4">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <div className="hidden md:block">
          <LiquidGlassButton 
            className="px-6 py-3"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Let's Talk
          </LiquidGlassButton>
        </div>
      </div>
    </header>
  );
};

const TubelightNavbar = () => {
  const navItems = useMemo(() => [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'About', url: '#about', icon: User },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Experience', url: '#experience', icon: FileText },
    { name: 'Contact', url: '#contact', icon: Mail }
  ], []);

  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const isClickingRef = useRef(false);

  // Scroll spy effect to update active tab on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isClickingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeItem = navItems.find(item => item.url === `#${entry.target.id}`);
          if (activeItem) {
            setActiveTab(activeItem.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const sectionId = item.url.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [navItems]);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string, url: string }) => {
    e.preventDefault();
    setActiveTab(item.name);
    isClickingRef.current = true;
    const section = document.getElementById(item.url.substring(1));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Disable observer updates while scrolling
    setTimeout(() => {
      isClickingRef.current = false;
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 md:top-6 md:bottom-auto left-1/2 -translate-x-1/2 z-[60]">
      <div className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border-color)] backdrop-blur-xl p-2 rounded-full shadow-xl md:shadow-2xl transition-colors">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleTabClick(e, item)}
              className={`relative cursor-pointer text-sm font-semibold w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-2.5 rounded-full transition-colors flex items-center justify-center ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={22} strokeWidth={2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-[var(--accent)]/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[var(--accent)] rounded-t-full hidden md:block">
                    <div className="absolute w-12 h-6 bg-[var(--accent)]/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[var(--accent)]/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[var(--accent)]/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

const Hero = ({ theme }) => {
  const roles = [
    "Creative Developer.",
    "UI/UX Designer.",
    "3D Web Engineer.",
    "Digital Architect."
  ];
  const typewriterText = useTypewriter(roles);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Mobile CSS Background (Hidden on desktop) */}
      <MobileHeroBackground />

      {/* 3D Background (Hidden on mobile via inner logic) */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <ThreeScene theme={theme} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full pt-16 md:pt-20">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start gap-4 md:gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium">Available for work</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold display-font leading-[1.05] tracking-tighter">
            DIGANTA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-muted)]">
              PAL
            </span>
          </h1>
          
          <div className="h-14 sm:h-12 flex items-center">
            <p className="text-lg md:text-2xl font-light text-[var(--text-secondary)]">
              Building <span className="text-[var(--accent)] font-medium">{typewriterText}</span>
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mt-4 md:mt-8">
            <LiquidGlassButton 
              className="w-full sm:w-auto px-8 py-4 justify-center text-base"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects <ChevronRight size={18} />
            </LiquidGlassButton>
            <LiquidGlassButton 
              className="w-full sm:w-auto px-8 py-4 justify-center text-[var(--text-secondary)] text-base"
              onClick={() => window.open('/CV.pdf', '_blank')}
            >
               Resume <Download size={18} />
            </LiquidGlassButton>
          </div>
        </motion.div>

        {/* Right side is intentionally left empty to showcase the 3D canvas underneath */}
        <div className="hidden md:block"></div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.2em] text-[var(--text-muted)] uppercase rotate-90 mb-6">Scroll</span>
        <div className="w-[1px] h-16 bg-[var(--border-color)] overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent)]"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-last md:order-first"
          >
            <TiltCard className="w-full aspect-[4/3] md:aspect-[4/5] rounded-3xl overflow-hidden glass-card p-2">
              <div className="w-full h-full rounded-2xl overflow-hidden relative group bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop" 
                  alt="Code workspace" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                  <div className="bg-white/10 p-3 md:p-4 rounded-xl border border-white/20 backdrop-blur-md">
                     <p className="text-xs md:text-sm text-white font-mono break-all">"{'>'} Console.log('Hello World');"</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold display-font mb-6 leading-tight">
              Engineering <span className="text-[var(--accent)]">Premium</span> Digital Experiences.
            </h2>
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-8">
              Hi, I'm Diganta Pal, a futuristic frontend developer focused on building immersive web experiences, premium UI systems, and interactive 3D websites. I bridge the gap between heavy engineering and world-class design.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'var(--accent)', opacity: 0.05 }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[var(--accent)] text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-medium"
        >
          Tech Arsenal
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-6xl font-bold display-font mb-10 md:mb-16"
        >
          Technologies I command.
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="glass-card flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 rounded-full transition-all hover:border-[var(--accent)] hover:shadow-lg"
              >
                <Icon className="text-[var(--accent)] w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base text-[var(--text-primary)]">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- ACETERNITY UI SCROLL ANIMATION COMPONENTS ---

const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-6 md:-mt-12 mx-auto h-[25rem] sm:h-[30rem] md:h-[40rem] w-full border-4 border-[var(--border-color)] p-2 md:p-6 bg-[var(--card-bg)] backdrop-blur-xl rounded-[20px] md:rounded-[30px] shadow-2xl transition-colors duration-500"
    >
      <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};

const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const isMobile = useIsMobile();

  const scaleDimensions = () => {
    return isMobile ? [0.8, 1] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[40rem] sm:h-[50rem] md:h-[80rem] flex items-center justify-center relative p-4 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const FeaturedShowcase = () => {
  return (
    <section className="relative w-full overflow-hidden -mt-10 md:-mt-20">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-[var(--text-primary)] transition-colors duration-500 mb-2 md:mb-0">
              Unleash the power of <br className="hidden md:block" />
              <span className="text-4xl sm:text-5xl md:text-[6rem] font-bold mt-2 leading-none text-[var(--accent)] display-font">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop"
          alt="DrawArc Featured Project"
          className="mx-auto rounded-xl md:rounded-2xl object-cover h-full w-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
};

const Projects = () => {
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold display-font leading-none">Featured<br/><span className="text-[var(--text-muted)]">Work.</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <LiquidGlassButton className="px-6 py-3 w-full sm:w-auto">
               View All Archive <ExternalLink size={16} />
             </LiquidGlassButton>
          </motion.div>
        </div>

        <div className="flex flex-col gap-10 md:gap-32 relative pb-10 md:pb-20">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`group ${isMobile ? 'relative' : 'sticky'}`}
              style={isMobile ? { top: 'auto' } : { top: `calc(100px + ${index * 30}px)` }}
            >
              <TiltCard className="w-full p-6 sm:p-8 md:p-10 rounded-[30px] md:rounded-[40px] border border-[var(--border-color)] bg-[var(--solid-card-bg)] transition-all hover:border-[var(--accent)] shadow-lg md:shadow-2xl">
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}>
                  
                  {/* Image Side */}
                  <div className="relative w-full md:w-3/5 overflow-hidden rounded-[20px] md:rounded-[30px] bg-[var(--bg)] h-[240px] sm:h-[300px] md:h-[500px]">
                    <div className="absolute inset-0 bg-black/5 z-10 md:group-hover:bg-transparent transition-colors duration-500" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    />
                    
                    {/* Floating Action Button */}
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-[-10px] md:group-hover:translate-y-0 transition-all duration-300">
                      <a href={project.link} className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md border border-white/30 text-black flex items-center justify-center hover:bg-[var(--accent)] hover:text-white hover:border-transparent transition-colors shadow-lg">
                        <ExternalLink size={20} className="w-4 h-4 md:w-6 md:h-6" />
                      </a>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-2/5 px-2 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                      <span className="text-xs md:text-sm font-mono text-[var(--accent)] tracking-wider uppercase font-semibold">{project.category}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold display-font mb-4 md:mb-6 text-[var(--text-primary)] md:group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm md:text-lg leading-relaxed mb-6 md:mb-10">{project.description}</p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--bg)] shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-20 md:py-32 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold display-font mb-16 md:mb-20 text-center"
        >
          Career <span className="text-[var(--accent)]">Journey.</span>
        </motion.h2>

        <div className="relative border-l border-[var(--border-color)] ml-3 md:ml-0 md:border-l-0">
          
          {/* Desktop Center Line */}
          <div className="hidden md:block absolute top-0 left-1/2 bottom-0 w-[1px] bg-[var(--border-color)] -translate-x-1/2" />
          
          {/* Animated Glow Line */}
          <motion.div 
            className="absolute top-0 left-[-1px] md:left-1/2 w-[2px] md:w-[1px] origin-top md:-translate-x-1/2 box-glow"
            style={{ height: lineHeight, background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          />

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE.map((exp, index) => (
              <div key={index} className="relative flex flex-col md:flex-row justify-between items-center w-full">
                
                {/* Timeline Dot (Precisely aligned to line) */}
                <div className="absolute left-[-6.5px] md:left-1/2 w-3 h-3 rounded-full bg-[var(--accent)] md:-translate-x-1/2 box-glow z-10" />

                {/* Left Side (Empty on mobile, alternating on desktop) */}
                <div className={`hidden md:block w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'order-last pl-12 text-left'}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }}
                  >
                    <span className="text-[var(--accent)] font-mono text-lg font-semibold">{exp.year}</span>
                  </motion.div>
                </div>

                {/* Right/Content Side */}
                <div className={`w-full pl-6 sm:pl-8 md:pl-0 md:w-5/12 ${index % 2 === 0 ? 'md:order-last md:pl-12 text-left' : 'md:text-right md:pr-12'}`}>
                   <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                    className="glass-card p-5 md:p-6 rounded-2xl hover:border-[var(--accent)] transition-colors shadow-sm"
                  >
                    <div className="md:hidden text-[var(--accent)] font-mono text-xs sm:text-sm font-semibold mb-2">{exp.year}</div>
                    <h3 className="text-lg md:text-xl font-bold display-font text-[var(--text-primary)] mb-1 leading-tight">{exp.role}</h3>
                    <h4 className="text-xs md:text-sm font-medium text-[var(--text-secondary)] mb-3">{exp.company}</h4>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{exp.desc}</p>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden pb-32 md:pb-32">
       {/* Background Glow */}
       <div className="absolute bottom-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full blur-[100px] md:blur-[150px] pointer-events-none" style={{ backgroundColor: 'var(--accent)', opacity: 0.05 }} />

       <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold display-font mb-4 md:mb-6 leading-none">
                Let's <br/> <span className="text-[var(--accent)]">Create.</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-base md:text-lg mb-8 md:mb-12 max-w-md">
                Open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="space-y-4 md:space-y-6">
                <a href="mailto:dp2005317@gmail.com" className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full glass-card flex items-center justify-center">
                    <Mail size={18} className="md:w-5 md:h-5" />
                  </div>
                  <span className="text-sm md:text-lg font-medium break-all">dp2005317@gmail.com</span>
                </a>
                <div className="flex items-center gap-4">
                   <a href="https://www.linkedin.com/in/diganta-pal" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-black transition-colors">
                      <Linkedin size={18} className="md:w-5 md:h-5" />
                   </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <form 
                className="glass-card p-6 sm:p-8 md:p-12 rounded-[24px] md:rounded-3xl space-y-5 md:space-y-6 shadow-xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const email = formData.get('email');
                  const message = formData.get('message');
                  window.location.href = `mailto:dp2005317@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')}`;
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">Name</label>
                    <input name="name" type="text" required className="w-full bg-transparent border border-[var(--border-color)] rounded-xl px-4 py-3 text-[16px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors shadow-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">Email</label>
                    <input name="email" type="email" required className="w-full bg-transparent border border-[var(--border-color)] rounded-xl px-4 py-3 text-[16px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors shadow-sm" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">Message</label>
                  <textarea name="message" required rows="4" className="w-full bg-transparent border border-[var(--border-color)] rounded-xl px-4 py-3 text-[16px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none shadow-sm" placeholder="Tell me about your project..."></textarea>
                </div>
                <LiquidGlassButton className="w-full py-3 md:py-4 mt-2 md:mt-4 text-[var(--accent)] text-base md:text-lg">
                  Send Message
                </LiquidGlassButton>
              </form>
            </motion.div>

          </div>
       </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 border-t border-[var(--border-color)] relative z-10 bg-[var(--bg)]">
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-[var(--text-muted)] text-xs md:text-sm text-center md:text-left">© {new Date().getFullYear()} Diganta Pal. All rights reserved.</p>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-xs md:text-sm flex items-center gap-2 uppercase tracking-widest pb-10 md:pb-0">
         Back to top <ChevronRight className="-rotate-90" size={14} />
      </button>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light'); // LIGHT THEME DEFAULT

  // Sync theme with global HTML/Body for Tailwind dark: variants and CSS variables
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`${theme} min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-500 selection:bg-[var(--accent)] selection:text-black`}>
      <GlobalStyles />
      <div className="bg-noise" />
      <GlassFilter />
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <TopHeader theme={theme} toggleTheme={toggleTheme} />
            <TubelightNavbar />
            <main>
              <Hero theme={theme} />
              <About />
              <Skills />
              <FeaturedShowcase />
              <Projects />
              <Experience />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}