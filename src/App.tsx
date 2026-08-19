import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ExternalLink, Terminal, Shield, 
  Code, Cpu, Globe, Lock, Zap, Award, Calendar,
  MapPin, Target, ChevronDown, Menu, X,
  Bug, FileCode, Network, Send, GraduationCap, Download
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' as const } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// Pre-generated random data for hero particles (module-level to avoid React purity warnings)
const heroParticles = [...Array(40)].map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 3,
  color: ['#00ff41', '#00d9ff', '#ff3864', '#00ff41', '#00ff41'][Math.floor(Math.random() * 5)],
  opacity: Math.random() * 0.5 + 0.1,
}));

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'about', 'skills', 'projects', 'hackathons', 'education', 'certifications', 'methodology', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#hackathons', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#certifications', label: 'Certs' },
    { href: '#methodology', label: 'Methodology' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.a 
            href="#hero"
            className="text-xl font-bold font-mono"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[#00ff41]">&lt;</span>GH<span className="text-[#00ff41]">/&gt;</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex space-x-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link text-sm transition-colors ${
                  activeSection === link.href.slice(1) 
                    ? 'text-[#00ff41]' 
                    : 'text-gray-400 hover:text-[#00ff41]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden text-gray-300 hover:text-[#00ff41] transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-black/95 border-t border-gray-800 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const id = link.href.slice(1);
                  setIsOpen(false);
                  setTimeout(() => {
                    const target = document.getElementById(id);
                    if (target) {
                      const offset = 16;
                      const top = target.getBoundingClientRect().top + window.scrollY - offset;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className={`block px-4 py-3 rounded-lg transition-colors text-base ${
                  activeSection === link.href.slice(1)
                    ? 'bg-[#00ff41]/10 text-[#00ff41]'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-[#00ff41]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Securing the Digital Frontier...';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 px-4">
      <div className="absolute inset-0 animated-grid opacity-60" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {heroParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
            initial={{ top: '-5%', opacity: 0 }}
            animate={{
              top: ['-5%', '105%'],
              opacity: [0, p.opacity + 0.3, p.opacity + 0.3, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p variants={fadeInUp} className="text-[#00ff41] font-mono text-xs sm:text-sm mb-4 tracking-widest">
            CYBERSECURITY PROFESSIONAL
          </motion.p>
          
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-[#00ff41]">&lt;</span>Gundu Hemanth<span className="text-[#00ff41]">/&gt;</span>
          </motion.h1>
          
          <motion.h2 variants={fadeInUp} className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 mb-6 font-light px-2">
            eJPT Certified <span className="text-[#00ff41]">|</span> Penetration Tester <span className="text-[#00ff41]">|</span> AI Security Researcher
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 mb-8 sm:mb-12 max-w-3xl mx-auto font-light italic font-mono px-4">
            &quot;{typedText}<span className="animate-pulse">|</span>&quot;
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <motion.a 
              href="#projects"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#00ff41] text-black font-semibold rounded-lg hover:bg-[#00d936] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 65, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
              View Projects
            </motion.a>
            <motion.a 
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#00ff41] text-[#00ff41] font-semibold rounded-lg hover:bg-[#00ff41] hover:text-black transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Contact Me
            </motion.a>
            <motion.a 
              href="/resume.pdf"
              download
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#ff3864] text-[#ff3864] font-semibold rounded-lg hover:bg-[#ff3864] hover:text-black transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 56, 100, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 sm:mt-16 flex justify-center space-x-6 sm:space-x-8">
            {[
              { href: 'https://github.com/Hemanth-G48', icon: Github, color: 'hover:text-[#00ff41]' },
              { href: 'https://www.linkedin.com/in/Gundu-Hemanth', icon: Linkedin, color: 'hover:text-[#00d9ff]' },
              { href: 'mailto:hemanthg4488@gmail.com', icon: Mail, color: 'hover:text-[#ff3864]' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`text-gray-500 ${social.color} transition-colors`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-[#00ff41]" />
      </motion.div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#00ff41]">//</span> About Me
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#00ff41] mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-12 gradient-border"
          >
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
              I&apos;m a third-year <span className="text-[#00ff41] font-semibold">CSE student specializing in cybersecurity</span> with a focus on
              offensive security. I have hands-on experience in <span className="text-[#00d9ff] font-semibold">penetration testing</span>, CTFs, and
              <span className="text-[#00d9ff] font-semibold"> Agentic AI security research</span>. I hold the <span className="text-[#00ff41] font-semibold">eJPT certification</span> and am
              further developing my web application security skills through HTB&apos;s CWES path.
            </p>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
              I am in the <span className="text-[#ff3864] font-semibold">Top 15 percent of TryHackMe</span> and have knowledge of
              <span className="font-mono text-sm text-[#00ff41]"> Machine Learning</span> and <span className="font-mono text-sm text-[#00ff41]">Deep Learning</span>, with a growing interest in
              AI security. I aim to apply and expand my offensive security skills through real-world challenges.
            </p>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
              My journey is driven by curiosity and a commitment to <span className="text-[#ff3864] font-semibold">ethical responsibility</span>.
              I actively engage with platforms like TryHackMe and Hack The Box to sharpen my skills.
            </p>

            {/* TryHackMe Badge - Inline compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <motion.a
                href="https://tryhackme.com/p/1mth3prie5t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#212c42] hover:bg-[#2d3a56] border border-[#3b4d6b] text-white font-semibold rounded-lg transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 77, 107, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-5 h-5" />
                Go to THM Profile
              </motion.a>
            </motion.div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const skills = [
    { title: 'Web Application Security', icon: Globe, color: '#00ff41', skills: ['SQL Injection', 'XSS', 'CSRF', 'SSRF', 'OWASP Top 10', 'Web Pentesting'] },
    { title: 'Network Security', icon: Network, color: '#00d9ff', skills: ['Port Scanning', 'Enumeration', 'Exploitation', 'Privilege Escalation', 'Packet Analysis', 'MITM'] },
    { title: 'Offensive Security', icon: Bug, color: '#ff3864', skills: ['OSINT', 'Vulnerability Assessment', 'Penetration Testing', 'Reporting', 'Steganography', 'CTFs'] },
    { title: 'Security Tools', icon: Shield, color: '#00ff41', skills: ['Nmap', 'Wireshark', 'Metasploit', 'SQLMap', 'Burp Suite', 'GoBuster', 'Mimikatz'] },
    { title: 'Programming & Scripting', icon: Code, color: '#00d9ff', skills: ['Python', 'C', 'Bash', 'Linux', 'Windows'] },
    { title: 'Machine Learning & AI', icon: Cpu, color: '#ff3864', skills: ['Scikit-learn', 'PyTorch', 'Deep Learning', 'AI Security'] }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#00d9ff]">//</span> Skills & Tooling
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#00d9ff] mx-auto" />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((category, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 sm:p-6 hover:border-opacity-50 transition-all card-shine"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: category.color }} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold" style={{ color: category.color }}>{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="skill-badge px-2 sm:px-3 py-1 bg-[#0a0a0a] border border-gray-700 rounded text-xs sm:text-sm font-mono text-gray-300 hover:border-[#00ff41] hover:text-[#00ff41] transition-colors cursor-default"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const projects: Array<{
    title: string;
    type: string;
    typeColor: string;
    description: string;
    objective: string;
    methodology: string[];
    tools: string[];
    outcome: string;
    githubUrl: string;
    liveUrl?: string;
  }> = [];

  // TODO: Add your projects here. Each project should follow this structure:
  // {
  //   title: 'Project Name',
  //   type: 'Security Tool',
  //   typeColor: '#00ff41',
  //   description: 'Brief description of the project.',
  //   objective: 'What the project aims to achieve.',
  //   methodology: ['Step 1', 'Step 2', 'Step 3'],
  //   tools: ['Tool1', 'Tool2'],
  //   outcome: 'What was achieved.',
  //   githubUrl: 'https://github.com/Hemanth-G48/ProjectName',
  //   liveUrl: 'https://optional-live-demo.com'
  // }

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#00ff41]">//</span> Projects & Case Studies
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#00ff41] mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Selected security assessments and vulnerability research conducted in authorized environments
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#1a1a1a] border border-gray-800 border-dashed rounded-xl p-8 sm:p-12 text-center"
          >
            <Terminal className="w-10 h-10 sm:w-12 sm:h-12 text-[#00ff41] mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Projects Coming Soon</h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
              I&apos;m currently working on exciting security projects. Check back soon or visit my GitHub for the latest work.
            </p>
            <a
              href="https://github.com/Hemanth-G48"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#00ff41] text-black font-semibold rounded-lg hover:bg-[#00d936] transition-all text-sm"
            >
              <Github className="w-4 h-4" />
              Visit GitHub
            </a>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="project-card bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 sm:p-6 block group cursor-pointer card-shine"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#00ff41] group-hover:text-[#00d9ff] transition-colors flex items-center gap-2">
                    <FileCode className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="line-clamp-2">{project.title}</span>
                  </h3>
                  <span 
                    className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-mono flex items-center gap-1 flex-shrink-0 w-fit"
                    style={{ backgroundColor: `${project.typeColor}20`, color: project.typeColor }}
                  >
                    {project.type}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>

                <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>

                <div className="mb-3 sm:mb-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#00d9ff] mb-1 sm:mb-2 flex items-center gap-2">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                    OBJECTIVE
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">{project.objective}</p>
                </div>

                <div className="mb-3 sm:mb-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#00d9ff] mb-1 sm:mb-2 flex items-center gap-2">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                    METHODOLOGY
                  </h4>
                  <ul className="text-xs sm:text-sm text-gray-400 space-y-1">
                    {project.methodology.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#00ff41] mr-2 flex-shrink-0">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3 sm:mb-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#00d9ff] mb-1 sm:mb-2 flex items-center gap-2">
                    <Cpu className="w-3 h-3 sm:w-4 sm:h-4" />
                    TOOLS USED
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#0a0a0a] border border-gray-700 rounded text-xs font-mono text-gray-400">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-3 sm:pt-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#00d9ff] mb-1 sm:mb-2 flex items-center gap-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                    OUTCOME
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">{project.outcome}</p>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Github className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-mono">View on GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  {project.liveUrl && (
                    <span
                      onClick={(e) => { e.preventDefault(); window.open(project.liveUrl, '_blank'); }}
                      className="flex items-center gap-1.5 text-[#00d9ff] opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm font-mono hover:underline"
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-12 bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 sm:p-8"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#00d9ff] flex items-center gap-2">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-[#00ff41]" />
            <span className="font-mono">~/</span> Continuous Training & Labs
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {[
              { value: 'Top 15%', label: 'Globally On TryHackMe', color: '#00d9ff' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2" style={{ color: stat.color }}>{stat.value}</div>
                <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Hackathons Section
function HackathonsSection() {
  const experiences = [
    {
      name: 'Cybersecurity Domain Core Member',
      organization: 'Google Developer Groups (GDG) - IIIT Sri City',
      date: 'Jun 2025 - Present',
      location: 'IIIT Sri City',
      description: 'Mentoring students in the domain of cybersecurity through sessions and workshops. Developing Capture-the-Flag (CTF) challenges.',
      achievements: ['Mentoring students in cybersecurity through sessions and workshops', 'Developing Capture-the-Flag (CTF) challenges'],
      technologies: ['Cybersecurity', 'CTF Development', 'Mentoring'],
      status: 'active'
    },
    {
      name: 'Cybersecurity Domain Core Member',
      organization: 'IOTA - IIIT Sri City',
      date: 'Jun 2025 - Present',
      location: 'IIIT Sri City',
      description: 'Conducted a technical session on steganography and cybersecurity applications. Contributing to cybersecurity initiatives, workshops, and collaborative technical projects within the club.',
      achievements: ['Conducted a technical session on steganography and cybersecurity applications', 'Contributing to cybersecurity initiatives, workshops, and collaborative technical projects'],
      technologies: ['Steganography', 'Cybersecurity', 'Technical Sessions'],
      status: 'active'
    },
    {
      name: 'Pycon 2025 India Attendee',
      organization: 'GDG',
      date: '2025',
      location: 'India',
      description: 'Gained exposure to Python ecosystem trends, open-source development, and industry best practices. Participated in technical talks, networking sessions, and workshops focused on Python, AI/ML, cybersecurity, and software engineering.',
      achievements: ['Gained exposure to Python ecosystem trends and open-source development', 'Participated in workshops on Python, AI/ML, cybersecurity, and software engineering'],
      technologies: ['Python', 'AI/ML', 'Open Source'],
      status: 'completed'
    }
  ];

  return (
    <section id="hackathons" className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#ff3864]">//</span> Experience
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#ff3864] mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Cybersecurity mentorship, technical sessions, and community involvement
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="hackathon-card rounded-xl p-5 sm:p-6 relative overflow-hidden"
            >
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                <span className={`status-badge text-xs font-mono ${exp.status === 'active' ? 'text-[#00d9ff]' : 'text-[#00ff41]'}`}>
                  {exp.status === 'active' ? 'Active' : 'Completed'}
                </span>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 pr-20">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#00ff41]/20 to-[#00d9ff]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-[#00ff41]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 line-clamp-2">{exp.name}</h3>
                  <p className="text-xs sm:text-sm text-[#00d9ff] font-medium mb-1">{exp.organization}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{exp.description}</p>

              <div className="mb-3 sm:mb-4">
                <h4 className="text-xs sm:text-sm font-semibold text-[#00d9ff] mb-1 sm:mb-2 flex items-center gap-2">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                  Key Contributions
                </h4>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start text-xs sm:text-sm text-gray-400">
                      <span className="text-[#00ff41] mr-2 flex-shrink-0">▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {exp.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#0a0a0a] border border-gray-700 rounded text-xs font-mono text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

// Education Section (Separated)
function EducationSection() {
  const education = [
    {
      title: 'B.Tech (Hons.) in Computer Science Engineering',
      institution: 'Indian Institute of Information Technology (IIIT) Sri City',
      period: 'Aug 2024 - Expected 2028',
      description: 'Bachelor of Technology with Honors in Computer Science Engineering, focusing on cybersecurity and offensive security.',
      icon: GraduationCap,
      color: '#ffd700'
    }
  ];

  return (
    <section id="education" className="min-h-screen flex flex-col justify-center py-20 sm:py-24 lg:py-32 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#00d9ff]">//</span> Education
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#00d9ff] mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="space-y-6 sm:space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 sm:p-8 hover:border-opacity-50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div 
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${edu.color}15` }}
                  >
                    <edu.icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: edu.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{edu.title}</h3>
                      <span className="text-sm font-mono text-gray-400 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-[#00d9ff] font-medium mb-3">{edu.institution}</p>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Certifications Section (New Separate Section)
function CertificationsSection() {
  const certifications = [
    {
      title: 'eLearnSecurity Junior Penetration Tester (eJPTv2)',
      issuer: 'INE Security',
      year: 'June 2026',
      type: 'Verified',
      typeColor: '#00ff41',
      icon: Shield
    }
  ];

  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#00ff41]">//</span> Certifications
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#00ff41] mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="space-y-4 sm:space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-opacity-50 transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cert.typeColor}15` }}
                  >
                    <cert.icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: cert.typeColor }} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{cert.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-mono">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
                <span 
                  className="px-3 py-1.5 rounded text-xs sm:text-sm font-mono w-fit"
                  style={{ backgroundColor: `${cert.typeColor}20`, color: cert.typeColor }}
                >
                  {cert.type}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Learning Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-12 bg-gradient-to-r from-[#1a1a1a] to-[#111111] border border-gray-800 rounded-xl p-5 sm:p-8"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#00ff41] flex items-center gap-2">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              Continuous Learning Philosophy
            </h3>
            <p className="text-gray-400 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              Cybersecurity is a rapidly evolving field that demands continuous skill development. I maintain
              an active learning routine through:
            </p>
            <motion.ul 
              className="space-y-2 text-gray-400"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                'Daily engagement with security research, CVE analysis, and proof-of-concept development',
                'Active participation in Hack The Box, TryHackMe, and private bug bounty programs',
                'Building custom vulnerable applications to understand exploitation from both offensive and defensive perspectives',
                'Contributing to open-source security tools and sharing knowledge with the community'
              ].map((item, index) => (
                <motion.li key={index} variants={fadeInUp} className="flex items-start text-sm sm:text-base">
                  <span className="text-[#00ff41] mr-2 sm:mr-3 flex-shrink-0">▹</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Methodology Section
function MethodologySection() {
  const steps = [
    { number: '01', title: 'Pre-Engagement & Scoping', description: 'Establish clear scope, rules of engagement, and authorization. Define testing windows, out-of-scope systems, and communication protocols.', color: '#00ff41' },
    { number: '02', title: 'Intelligence Gathering', description: 'Passive and active reconnaissance to map attack surface. Collect information on technologies, endpoints, personnel, and potential entry points.', color: '#00d9ff' },
    { number: '03', title: 'Vulnerability Assessment', description: 'Systematic identification of security weaknesses using automated scanners, manual testing, and custom tooling.', color: '#ff3864' },
    { number: '04', title: 'Exploitation', description: 'Controlled exploitation of identified vulnerabilities to demonstrate real-world risk while maintaining detailed logs and evidence.', color: '#00ff41' },
    { number: '05', title: 'Post-Exploitation & Privilege Escalation', description: 'Assess the depth of compromise by attempting lateral movement, privilege escalation, and persistent access.', color: '#00d9ff' },
    { number: '06', title: 'Reporting & Remediation', description: 'Deliver comprehensive reports with executive summaries and technical details. Include CVSS scoring and prioritized remediation recommendations.', color: '#ff3864' }
  ];

  return (
    <section id="methodology" className="py-16 sm:py-20 lg:py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#ff3864]">//</span> Methodology & Ethics
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#ff3864] mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            A structured, repeatable approach grounded in industry standards and ethical responsibility
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="space-y-3 sm:space-y-4 mb-8 sm:mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
                className="bg-[#1a1a1a] border-l-4 rounded-lg p-4 sm:p-6"
                style={{ borderLeftColor: step.color }}
              >
                <div className="flex items-center mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl font-bold mr-3 sm:mr-4 font-mono" style={{ color: step.color }}>{step.number}</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base ml-0 sm:ml-12">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#ff3864] rounded-xl p-5 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#ff3864] flex items-center gap-2 sm:gap-3">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
              Ethical Commitment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-semibold text-[#00ff41] mb-2 sm:mb-3 terminal-line text-sm sm:text-base">Legal Boundaries</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                  {['All testing conducted with explicit written authorization', 'Strict adherence to defined scope and testing windows', 'Compliance with relevant laws and regulations'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#00ff41] mr-2 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-[#00d9ff] mb-2 sm:mb-3 terminal-line text-sm sm:text-base">Professional Integrity</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                  {['Confidentiality of client data and findings', 'Transparent communication about risks and limitations', 'Responsible disclosure of vulnerabilities'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#00d9ff] mr-2 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#0a0a0a]/50 border border-gray-800 rounded">
              <p className="text-gray-400 italic text-xs sm:text-sm">
                &quot;Security testing is not about breaking systems—it&apos;s about building trust through transparency, precision, and unwavering ethical standards.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Allowed email domains
  const allowedDomains = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com',
    'protonmail.com', 'proton.me', 'icloud.com', 'me.com', 'aol.com',
    'zoho.com', 'mail.com', 'gmx.com', 'yandex.com', 'tutanota.com',
    'edu', 'ac.in', 'org', 'gov', 'gov.in'
  ];

  const validateEmail = (email: string): boolean => {
    const trimmed = email.trim().toLowerCase();
    // RFC-style regex
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(trimmed)) return false;
    const domain = trimmed.split('@')[1];
    return allowedDomains.some(d => domain === d || domain.endsWith('.' + d));
  };

  // Rate limit: max 3 submissions per email per 10 minutes
  const checkRateLimit = (email: string): boolean => {
    const key = `contact_rl_${email.trim().toLowerCase()}`;
    const now = Date.now();
    const windowMs = 10 * 60 * 1000; // 10 minutes
    const maxAttempts = 3;
    try {
      const stored = JSON.parse(localStorage.getItem(key) || '[]') as number[];
      const recent = stored.filter((t) => now - t < windowMs);
      if (recent.length >= maxAttempts) return false;
      recent.push(now);
      localStorage.setItem(key, JSON.stringify(recent));
      return true;
    } catch {
      return true;
    }
  };

  const sanitize = (str: string) => str.replace(/[<>]/g, '').trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validate all fields are non-empty after trimming
    if (!formState.name.trim() || !formState.subject.trim() || !formState.message.trim()) {
      setFormError('All fields are required.');
      return;
    }

    // Email validation
    if (!validateEmail(formState.email)) {
      setFormError('Please enter a valid email from a recognized provider.');
      return;
    }

    // Rate limit check
    if (!checkRateLimit(formState.email)) {
      setFormError('Too many submissions. Please try again in 10 minutes.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/xaqqqddq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: sanitize(formState.name),
          email: formState.email.trim().toLowerCase(),
          subject: sanitize(formState.subject),
          message: sanitize(formState.message),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setFormError('Failed to send. Please try again later.');
      }
    } catch {
      setFormError('Network error. Please check your connection.');
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#00ff41]">//</span> Get In Touch
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#00ff41] mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Open to penetration testing engagements, security consultations, and professional opportunities
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Contact Info */}
            <motion.div 
              className="space-y-3 sm:space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: Mail, label: 'Email', value: 'hemanthg4488@gmail.com', href: 'mailto:hemanthg4488@gmail.com', color: '#00ff41' },
                { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/Gundu-Hemanth', href: 'https://www.linkedin.com/in/Gundu-Hemanth', color: '#00d9ff' },
                { icon: Github, label: 'GitHub', value: 'github.com/Hemanth-G48', href: 'https://github.com/Hemanth-G48', color: '#ff3864' }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  target={contact.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={contact.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  variants={fadeInUp}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:border-opacity-50 transition-all group"
                >
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                    style={{ backgroundColor: `${contact.color}15` }}
                  >
                    <contact.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: contact.color }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base">{contact.label}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-mono group-hover:text-white transition-colors truncate">{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 sm:p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#00ff41] focus:outline-none text-gray-300 transition-colors text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:border-[#00ff41] focus:outline-none text-gray-300 transition-colors text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#00ff41] focus:outline-none text-gray-300 transition-colors text-sm"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#00ff41] focus:outline-none text-gray-300 transition-colors resize-none text-sm"
                    placeholder="Your message..."
                  />
                </div>
                {formError && (
                  <p className="text-[#ff3864] text-xs sm:text-sm font-mono bg-[#ff3864]/10 border border-[#ff3864]/30 rounded-lg px-3 py-2">
                    ⚠ {formError}
                  </p>
                )}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#00ff41] text-black font-semibold rounded-lg hover:bg-[#00d936] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (<><div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />Sending...</>) : submitted ? (<><Award className="w-4 h-4 sm:w-5 sm:h-5" />Message Sent!</>) : (<><Send className="w-4 h-4 sm:w-5 sm:h-5" />Send Message</>)}
                </motion.button>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-[#1a1a1a] to-[#111111] border border-gray-800 rounded-xl p-4 sm:p-6 text-center"
          >
            <p className="text-gray-400 text-xs sm:text-sm">
              <span className="text-[#00ff41] font-semibold">Note:</span> I respond to all legitimate inquiries within 24-48 hours. For urgent security matters, please include &quot;URGENT&quot; in the subject line.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <p className="text-gray-400 text-sm font-mono"><span className="text-[#00ff41]">&lt;</span>Gundu Hemanth<span className="text-[#00ff41]">/&gt;</span></p>
            <p className="text-gray-600 text-xs mt-1">Cybersecurity Specialist | Penetration Tester</p>
          </div>

          <div className="flex space-x-5 sm:space-x-6">
            {[{ href: 'https://github.com/Hemanth-G48', icon: Github, color: 'hover:text-[#00ff41]' }, { href: 'https://www.linkedin.com/in/Gundu-Hemanth', icon: Linkedin, color: 'hover:text-[#00d9ff]' }, { href: 'mailto:hemanthg4488@gmail.com', icon: Mail, color: 'hover:text-[#ff3864]' }].map((social, index) => (
              <motion.a key={index} href={social.href} target={social.href.startsWith('mailto') ? undefined : '_blank'} rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'} className={`text-gray-500 ${social.color} transition-colors`} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-xs">All security testing activities are conducted with explicit authorization and within legal boundaries.</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#00ff41] origin-left z-[60]" style={{ scaleX }} />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <HackathonsSection />
        <EducationSection />
        <CertificationsSection />
        <MethodologySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
