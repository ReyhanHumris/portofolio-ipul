import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Play, 
  X, 
  Film, 
  Layers, 
  Aperture, 
  Video, 
  Mail, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Menu,
  Award,
  Compass,
  CheckCircle2,
  Send,
  MessageSquare
} from 'lucide-react';
import { projects } from './data/projectsData';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeProject, setActiveProject] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "Komersial", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const videoRef = useRef(null);
  const mainContainerRef = useRef(null);

  // Pantau scroll untuk gaya navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animasi GSAP saat Halaman Dimuat
  useGSAP(() => {
    // Memunculkan grid background dengan efek fade-in lambat
    gsap.fromTo(".gsap-grid-bg", 
      { opacity: 0 }, 
      { opacity: 0.75, duration: 2.0, ease: "power2.out" }
    );
    
    // Timeline utama animasi hero
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.fromTo(".gsap-badge", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.0, delay: 0.2 }
    )
    .fromTo(".gsap-title-word", 
      { y: "110%" }, 
      { y: "0%", duration: 1.4, stagger: 0.15 }, 
      "-=0.7"
    )
    .fromTo(".gsap-subtext", 
      { opacity: 0, y: 25 }, 
      { opacity: 1, y: 0, duration: 1.0 }, 
      "-=1.0"
    )
    .fromTo(".gsap-cta-btn", 
      { opacity: 0, y: 25 }, 
      { opacity: 1, y: 0, duration: 1.0, stagger: 0.15 }, 
      "-=0.8"
    )
    .fromTo(".gsap-nav-item", 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 
      "-=1.2"
    );
  }, { scope: mainContainerRef });

  // Filter proyek
  const filteredProjects = selectedCategory === "Semua" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  // Daftar Software untuk Marquee
  const tools = [
    { name: "Premiere Pro", color: "text-[#FFFFFF]" },
    { name: "After Effects", color: "text-[#E5E5EA]" },
    { name: "DaVinci Resolve", color: "text-[#D1D1D6]" },
    { name: "Photoshop", color: "text-[#C7C7CC]" },
    { name: "Illustrator", color: "text-[#AEAEB2]" },
    { name: "Audition", color: "text-[#8E8E93]" }
  ];

  // Penanganan submit formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", projectType: "Komersial", message: "" });
    }, 5000);
  };

  return (
    <div 
      ref={mainContainerRef}
      className="bg-[#050505] text-gray-200 min-h-screen relative font-sans selection:bg-white selection:text-black overflow-hidden"
    >
      
      {/* BACKGROUND GRAPHICS (Grid Kotak-Kotak dan Vignette Noir) */}
      <div className="absolute inset-0 gsap-grid-bg grid-background opacity-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 vignette-overlay z-0 pointer-events-none" />

      {/* HEADER / NAVIGASI */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-4 shadow-lg shadow-black/80' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group gsap-nav-item">
            <span className="font-mono text-white text-xl font-bold tracking-widest group-hover:text-gray-400 transition-colors">
              SAIFUL DUKA
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-slow"></span>
          </a>

          {/* Tautan Desktop */}
          <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wider">
            <a href="#showreel" className="gsap-nav-item hover:text-white text-gray-400 transition-colors duration-300">SHOWREEL</a>
            <a href="#work" className="gsap-nav-item hover:text-white text-gray-400 transition-colors duration-300">PORTOFOLIO</a>
            <a href="#services" className="gsap-nav-item hover:text-white text-gray-400 transition-colors duration-300">LAYANAN</a>
            <a href="#about" className="gsap-nav-item hover:text-white text-gray-400 transition-colors duration-300">TENTANG</a>
            <a href="#contact" className="gsap-nav-item px-5 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black hover:border-white text-white transition-all duration-300">
              MULAI PROYEK
            </a>
            <meta name="google-site-verification" content="DrqBetP1C9j-6WAY9xOzhvelRg2Fcv1EbDtUVFpWtjU" />
          </div>

          {/* Toggle Nav Seluler */}
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu Seluler */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#050505]/95 border-b border-white/10 py-6 px-6 font-mono text-center flex flex-col gap-5 text-sm tracking-widest shadow-2xl backdrop-blur-md"
            >
              <a 
                href="#showreel" 
                onClick={() => setIsNavOpen(false)}
                className="hover:text-white text-gray-400 py-2 transition-colors border-b border-white/5"
              >
                SHOWREEL
              </a>
              <a 
                href="#work" 
                onClick={() => setIsNavOpen(false)}
                className="hover:text-white text-gray-400 py-2 transition-colors border-b border-white/5"
              >
                PORTOFOLIO
              </a>
              <a 
                href="#services" 
                onClick={() => setIsNavOpen(false)}
                className="hover:text-white text-gray-400 py-2 transition-colors border-b border-white/5"
              >
                LAYANAN
              </a>
              <a 
                href="#about" 
                onClick={() => setIsNavOpen(false)}
                className="hover:text-white text-gray-400 py-2 transition-colors border-b border-white/5"
              >
                TENTANG
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsNavOpen(false)}
                className="mt-2 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/80 transition-all"
              >
                MULAI PROYEK
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Looping Cinematic Video (Siluted Grayscale) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#050505]/85 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60 z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover scale-[1.03] filter grayscale contrast-150 brightness-40 saturate-0"
            src="https://player.vimeo.com/external/403736894.sd.mp4?s=d00e572074e0d3c01c0cfad0da3ecf6d90f23f6c&profile_id=165&oauth2_token_id=57447761"
          />
        </div>

        {/* Konten Hero */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          {/* Label Kecil */}
          <div className="gsap-badge inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white font-mono text-[10px] tracking-widest mb-8">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            KINI MENERIMA PROYEK BARU
          </div>

          {/* Judul Utama dengan Animasi Reveal */}
          <h1 className="text-4xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05]">
            <div className="reveal-text-wrapper h-[48px] md:h-[96px] py-1">
              <span className="gsap-title-word inline-block text-white glow-text-white">Merangkai Cerita</span>
            </div>
            <div className="reveal-text-wrapper h-[48px] md:h-[96px] py-1">
              <span className="gsap-title-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">Visual yang Berkesan.</span>
            </div>
          </h1>

          {/* Sub-judul */}
          <p className="gsap-subtext max-w-2xl text-base md:text-xl text-gray-400 font-light mb-12 leading-relaxed">
            Lulusan DKV <span className="text-white mx-1">|</span> Editor Video & Videografer asal Alor. Menerjemahkan kaidah desain struktural ke dalam potongan gambar yang ritmis dan memikat.
          </p>

          {/* Tombol CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
            <a 
              href="#showreel"
              className="gsap-cta-btn group flex items-center justify-center gap-3 bg-white hover:bg-gray-200 text-black font-semibold font-mono tracking-wider px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto shadow-lg shadow-white/5"
            >
              LIHAT SHOWREEL
              <Play className="h-4 w-4 fill-black group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#work"
              className="gsap-cta-btn flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border border-white/20 text-gray-300 hover:text-white font-mono tracking-wider px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto"
            >
              JELAJAHI KARYA
            </a>
          </div>

          {/* Indikator Scroll */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40">
            <span className="font-mono text-[10px] text-gray-400 tracking-widest">GULIR KE BAWAH</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-gray-400 to-transparent" />
          </div>
        </div>
      </section>

      {/* CONTAINER SHOWREEL & PORTOFOLIO */}
      <section id="showreel" className="py-24 border-t border-white/10 relative bg-[#080808]">
        
        {/* BAGIAN SHOWREEL */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-mono text-xs text-gray-400 tracking-widest uppercase mb-3">Reel Utama</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Showreel 2026</h2>
            <div className="w-12 h-0.5 bg-white mt-4" />
          </div>

          {/* Kotak Video Utama */}
          <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-video max-w-4xl mx-auto bg-[#141414]">
            {/* Overlay Cover */}
            <div className="absolute inset-0 bg-black/55 z-10 flex flex-col items-center justify-center group-hover:bg-black/35 transition-all duration-500">
              <button 
                onClick={() => setActiveProject(projects[1])} // Memuat dokumenter budaya sebagai karya utama
                className="p-6 md:p-8 rounded-full bg-white/5 border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 shadow-xl shadow-white/5 cursor-pointer z-20"
              >
                <Play className="h-8 w-8 md:h-10 md:w-10 fill-current" />
              </button>
              <p className="mt-4 font-mono text-xs tracking-widest text-white/80 drop-shadow-md">PUTAR TEASER (1:30)</p>
            </div>
            {/* Background Looping Video (Grayscale) */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-102 transition-transform duration-700"
              src="https://player.vimeo.com/external/538902047.sd.mp4?s=91c784eb8264e1011680d941e7d3dc71bf8d82f3&profile_id=165&oauth2_token_id=57447761"
            />
          </div>
        </div>

        {/* BAGIAN GRID KARYA / PORTOFOLIO */}
        <div id="work" className="max-w-7xl mx-auto px-6 md:px-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs text-gray-400 tracking-widest uppercase mb-3">Portofolio</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Karya Pilihan</h2>
            </div>
            
            {/* Tab Filter Kategori (Monokromatik) */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {["Semua", "Komersial", "Sinematik & Dokumenter", "Media Sosial & Shorts"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                    selectedCategory === cat 
                      ? 'bg-white text-black border-white font-semibold shadow-md shadow-white/5' 
                      : 'bg-transparent text-gray-400 border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Tata Letak Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className="group relative rounded-xl overflow-hidden noir-card hover:border-white/30 transition-all duration-500 cursor-pointer"
                  onClick={() => setActiveProject(project)}
                >
                  {/* Foto Sampul (Thumbnail Grayscale) */}
                  <div className="aspect-video w-full overflow-hidden relative border-b border-white/5">
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0 contrast-110 brightness-95"
                    />
                    {/* Tombol Play saat Hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      <div className="p-4 rounded-full bg-white text-black shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                    {/* Label Durasi */}
                    <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/90 text-[9px] font-mono tracking-widest text-gray-300 rounded border border-white/5 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {project.duration}
                    </span>
                  </div>

                  {/* Keterangan Proyek */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-mono tracking-wider text-white uppercase px-2 py-0.5 bg-white/10 border border-white/10 rounded">
                        {project.category.replace(" & Dokumenter", "").replace(" & Shorts", "")}
                      </span>
                      <span className="text-gray-400 text-xs font-mono">• {project.role.split(" & ")[0]}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-gray-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    
                    {/* Tag Software */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.software.slice(0, 3).map((soft, i) => (
                        <span key={i} className="text-[9px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          {soft}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LAYANAN / SPESIALISASI */}
      <section id="services" className="py-24 relative overflow-hidden bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col items-center text-center mb-20">
            <span className="font-mono text-xs text-gray-400 tracking-widest uppercase mb-3">Spesialisasi</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Layanan & Kemampuan Kreatif</h2>
            <div className="w-12 h-0.5 bg-white mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Layanan 1 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 rounded-xl noir-card noir-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/15 text-white w-fit mb-6">
                  <Film className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Penyuntingan Video & Pacing</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  Merancang alur narasi, menyelaraskan potongan gambar dengan ritme, dan membangun struktur video dengan retensi tinggi. Spesialisasi dalam iklan komersial dan film dokumenter.
                </p>
              </div>
              <div className="mt-8 flex items-center text-[10px] font-mono text-white hover:text-gray-300 transition-colors cursor-pointer group">
                PELAJARI LEBIH LANJUT <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Layanan 2 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 rounded-xl noir-card noir-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/15 text-white w-fit mb-6">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Motion Graphics & VFX</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  Mengintegrasikan lower third kustom, tata letak teks, transisi, dan efek visual (VFX) dinamis. Menghidupkan elemen grafis menggunakan After Effects.
                </p>
              </div>
              <div className="mt-8 flex items-center text-[10px] font-mono text-white hover:text-gray-300 transition-colors cursor-pointer group">
                PELAJARI LEBIH LANJUT <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Layanan 3 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 rounded-xl noir-card noir-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/15 text-white w-fit mb-6">
                  <Aperture className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Color Grading Sinematik</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  Membangun tampilan visual yang mendalam dan atmosferik dengan DaVinci Resolve. Menyeimbangkan warna, koreksi kulit (skin tone), dan menggunakan palet warna kustom untuk menyampaikan emosi sinematik.
                </p>
              </div>
              <div className="mt-8 flex items-center text-[10px] font-mono text-white hover:text-gray-300 transition-colors cursor-pointer group">
                PELAJARI LEBIH LANJUT <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Layanan 4 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 rounded-xl noir-card noir-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/15 text-white w-fit mb-6">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Videografi & Penyutradaraan</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  Mengambil rekaman berkualitas tinggi menggunakan kamera profesional. Menyutradarai adegan, membingkai perspektif, dan menata cahaya untuk menangkap pemandangan alam serta potret yang memukau.
                </p>
              </div>
              <div className="mt-8 flex items-center text-[10px] font-mono text-white hover:text-gray-300 transition-colors cursor-pointer group">
                PELAJARI LEBIH LANJUT <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TENTANG & IDENTITAS SENSORIS (Monokromatis) */}
      <section id="about" className="py-24 relative overflow-hidden bg-[#080808]">
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Kolom Foto (Noir Siluted) */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-white/5 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />
              
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#161616]/40 p-3 shadow-2xl">
                <img 
                  src="/portof.jpeg" 
                  alt="Siluet Videografer"
                  className="rounded-xl w-full h-[450px] object-cover filter grayscale contrast-135 brightness-90 transition-all duration-700"
                />
                
                {/* Badge Melayang Monokrom */}
                <div className="absolute bottom-8 left-8 right-8 bg-[#050505]/90 border border-white/10 p-5 rounded-xl flex items-center justify-between backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Compass className="text-white h-5 w-5 animate-spin-slow" />
                    <div>
                      <p className="text-[9px] font-mono text-gray-500">DOMISILI</p>
                      <p className="text-xs font-bold text-white">Pulau Alor, NTT</p>
                    </div>
                  </div>
                  <div className="h-8 w-[1px] bg-white/15" />
                  <div className="flex items-center gap-3">
                    <Award className="text-white h-5 w-5" />
                    <div>
                      <p className="text-[9px] font-mono text-gray-500">PENDIDIKAN</p>
                      <p className="text-xs font-bold text-white">Lulusan DKV</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Cerita Naratif */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">Latar Belakang</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Saiful Duka</h2>
              <p className="text-gray-300 font-mono text-sm tracking-wider -mt-2">
                Lulusan Desain Komunikasi Visual (DKV)
              </p>

              <div className="w-12 h-0.5 bg-white mt-1 mb-2" />

              <div className="text-gray-400 font-light leading-relaxed flex flex-col gap-4 text-sm md:text-base">
                <p>
                  Berasal dari tebing yang kokoh dan keindahan laut <span className="text-white font-semibold">Pulau Alor, Nusa Tenggara Timur</span>, perjalanan visual saya dimulai sebagai mahasiswa desain di <span className="text-white font-semibold">MAKN Ende</span>.
                </p>
                <p>
                  Latar belakang pendidikan saya di bidang <span className="text-white font-semibold">Desain Komunikasi Visual (DKV)</span> memberikan pendekatan pengeditan yang terstruktur dan terkonsep. Berbeda dengan editor umum yang memotong klip hanya berdasarkan insting, saya menyusun setiap potongan gambar dengan memperhatikan keseimbangan visual, bobot grafis, psikologi warna, serta aturan pacing audio-visual yang ketat.
                </p>
                <p>
                  Memadukan prinsip-prinsip desain akademis ini dengan keindahan alam yang eksotis serta kedalaman budaya Alor, saya menangkap dan merangkai narasi yang membekas di hati penonton.
                </p>
              </div>

              {/* Kaidah Desain Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 font-mono text-xs text-gray-400 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-white h-4 w-4" />
                  <span>Kaidah Layout & Framing DKV</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-white h-4 w-4" />
                  <span>Penataan Warna DaVinci Resolve</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-white h-4 w-4" />
                  <span>Arsitektur Suara Sinematik</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-white h-4 w-4" />
                  <span>Tempo Potongan Berbasis Cerita</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RUANG KERJA / SOFTWARE & TOOLS */}
      <section className="py-20 border-y border-white/10 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 text-center">
          <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">Post Suite</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-2">Software & Peralatan Profesional</h2>
        </div>

        {/* Marquee Software (Maju) */}
        <div className="relative w-full overflow-hidden py-3 bg-white/[0.01] border-y border-white/5">
          <div className="flex w-[200%] animate-marquee no-scrollbar">
            {[...tools, ...tools, ...tools].map((tool, idx) => (
              <div 
                key={idx} 
                className="flex-1 flex items-center justify-center gap-4 px-12 py-3 text-lg md:text-xl font-mono tracking-widest text-center"
              >
                <span className="text-white font-bold">•</span>
                <span className={`${tool.color} font-bold drop-shadow-md`}>{tool.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Software (Mundur) */}
        <div className="relative w-full overflow-hidden py-3 bg-white/[0.01] border-b border-white/5 mt-2">
          <div className="flex w-[200%] animate-marquee-reverse no-scrollbar">
            {[...tools, ...tools, ...tools].map((tool, idx) => (
              <div 
                key={idx} 
                className="flex-1 flex items-center justify-center gap-4 px-12 py-3 text-lg md:text-xl font-mono tracking-widest text-center"
              >
                <span className="text-white/40 font-bold">•</span>
                <span className={`text-white/40 font-semibold`}>{tool.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HUBUNGI KAMI & FOOTER */}
      <section id="contact" className="py-24 relative bg-[#050505] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Info Kontak Kiri */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-gray-400 tracking-widest uppercase mb-3 block">KOLABORASI</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
                  Mari Bikin Karya <br className="hidden md:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                    Hebat Bersama Saiful.
                  </span>
                </h2>
                <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                  Baik untuk iklan komersial, proyek film independen, maupun konten vertikal media sosial, mari buat aset visual yang menonjol. Hubungi saya dan mari mulai merancang proyek Anda.
                </p>
              </div>

              {/* Saluran Kontak Langsung */}
              <div className="flex flex-col gap-5 border-t border-white/10 pt-8">
                <a href="mailto:saifulduka.video@gmail.com" className="flex items-center gap-3 group text-gray-300 hover:text-white transition-colors">
                  <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 group-hover:border-white/30 transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">EMAIL</p>
                    <p className="text-sm font-mono">saifulduka.video@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 mt-2">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-white hover:bg-white/10 text-gray-400 hover:text-white transition-all" aria-label="Instagram">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-white hover:bg-white/10 text-gray-400 hover:text-white transition-all" aria-label="YouTube">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11C4.482 20.455 12 20.455 12 20.455s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-white hover:bg-white/10 text-gray-400 hover:text-white transition-all" aria-label="LinkedIn">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Panel Formulir Kanan */}
            <div className="lg:col-span-7">
              <div className="glass-card p-8 md:p-10 rounded-xl border border-white/10 shadow-2xl relative">
                
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="p-4 bg-white/5 border border-white/20 rounded-full text-white mb-6 animate-pulse">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Pesan Terkirim!</h3>
                    <p className="text-gray-400 text-xs max-w-sm leading-relaxed">
                      Terima kasih telah menghubungi. Saiful akan meninjau brief kreatif Anda dan membalas dalam waktu 24 jam.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">NAMA ANDA</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Saiful" 
                          className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white focus:ring-1 focus:ring-white transition-all outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">ALAMAT EMAIL</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="klien@studio.com" 
                          className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white focus:ring-1 focus:ring-white transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">JENIS PROYEK</label>
                      <select 
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        className="bg-[#121319] border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-300 focus:border-white focus:ring-1 focus:ring-white transition-all outline-none"
                      >
                        <option value="Komersial">Komersial / Iklan</option>
                        <option value="Sinematik / Dokumenter">Film Sinematik & Dokumenter</option>
                        <option value="Media Sosial Reels">Media Sosial / Reels / Shorts</option>
                        <option value="Color Grading Only">Koreksi Warna / Color Grading</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Rincian Brief Proyek</label>
                      <textarea 
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Ceritakan kepada saya tentang gaya, durasi, dan tempo video..." 
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white focus:ring-1 focus:ring-white transition-all outline-none resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="mt-2 w-full py-4 rounded-lg bg-white hover:bg-gray-200 font-mono text-xs tracking-wider font-semibold text-black transition-all shadow-lg hover:shadow-white/5 cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      KIRIM BRIEF PROYEK 
                      <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

          {/* Footer Bawah */}
          <div className="mt-24 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
            <p>© {new Date().getFullYear()} SAIFUL DUKA. HAK CIPTA DILINDUNGI UNDANG-UNDANG.</p>
            <p className="flex items-center gap-1.5">
              DIBUAT DENGAN DEDIKASI DI PULAU ALOR 
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </p>
          </div>

        </div>
      </section>

      {/* POPUP FULLSCREEN MODAL VIDEO PLAYER */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 p-4 md:p-8 backdrop-blur-md"
          >
            {/* Kotak Modal */}
            <motion.div 
              initial={{ scale: 0.97, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 15 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-xl w-full max-w-5xl overflow-hidden shadow-2xl relative flex flex-col lg:flex-row max-h-[90vh]"
            >
              {/* Tombol Tutup */}
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 text-white/80 hover:text-white hover:bg-black/95 transition-all border border-white/10 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Kolom Kiri: Video Player */}
              <div className="flex-1 bg-black flex items-center justify-center relative aspect-video lg:aspect-auto">
                <video 
                  ref={videoRef}
                  src={activeProject.videoUrl}
                  controls 
                  autoPlay
                  className="w-full max-h-full object-contain"
                />
              </div>

              {/* Kolom Kanan: Rincian Detail Brief */}
              <div className="w-full lg:w-[350px] p-6 md:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0f0f0f]">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-white uppercase px-2 py-0.5 bg-white/10 border border-white/10 rounded w-fit block mb-4">
                    {activeProject.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-white mb-2 leading-snug">
                    {activeProject.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-white mb-4" />
                  
                  <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
                    {activeProject.description}
                  </p>
                </div>

                {/* Daftar Metadata */}
                <div className="space-y-4 font-mono text-[10px] border-t border-white/10 pt-6 text-gray-400">
                  <div className="flex justify-between">
                    <span>PERAN:</span>
                    <span className="text-white font-bold">{activeProject.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>KLIEN:</span>
                    <span className="text-white font-bold">{activeProject.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DURASI:</span>
                    <span className="text-white font-bold flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {activeProject.duration}
                    </span>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4">
                    <span className="block mb-2 text-gray-500 uppercase tracking-widest text-[8px]">SOFTWARE YANG DIGUNAKAN:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.software.map((soft, i) => (
                        <span key={i} className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/5 rounded text-gray-300">
                          {soft}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
