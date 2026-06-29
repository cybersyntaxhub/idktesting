import { motion } from 'framer-motion';
import { useStore } from '../store';
import {
  CyberSecurityIcon,
  BioTechIcon,
  FinanceIcon,
  DataScienceIcon,
  LogoIcon,
  PulseOrb,
} from './AnimatedIcons';
import { ChevronRight, Users, BookOpen, Shield, Zap } from 'lucide-react';

const tracks = [
  {
    name: 'CyberSecurity',
    desc: 'Learn offensive & defensive security, penetration testing, and threat analysis from industry experts.',
    Icon: CyberSecurityIcon,
    color: '#00f0ff',
  },
  {
    name: 'BioTech',
    desc: 'Explore bioinformatics, genomics, and computational biology with hands-on mentorship.',
    Icon: BioTechIcon,
    color: '#a855f7',
  },
  {
    name: 'Finance',
    desc: 'Master quantitative finance, algorithmic trading, and financial modeling techniques.',
    Icon: FinanceIcon,
    color: '#10b981',
  },
  {
    name: 'Data Science',
    desc: 'Dive into machine learning, data engineering, and AI-driven analytics.',
    Icon: DataScienceIcon,
    color: '#f59e0b',
  },
];

const stats = [
  { icon: Users, label: 'Mentors', value: '50+' },
  { icon: BookOpen, label: 'Courses', value: '120+' },
  { icon: Shield, label: 'Success Rate', value: '94%' },
  { icon: Zap, label: 'Students', value: '2K+' },
];

export default function LandingPage() {
  const setPage = useStore((s) => s.setPage);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Nav */}
      <motion.nav
        className="flex items-center justify-between px-6 md:px-12 py-5 relative z-20"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <LogoIcon size={36} />
          <span className="text-lg font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CyberSyntax Hub
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage('login')}
            className="px-5 py-2 text-sm rounded-lg border border-white/10 hover:border-cyan-400/50 transition-colors duration-300 cursor-pointer"
          >
            Log In
          </button>
          <button
            onClick={() => setPage('signup')}
            className="px-5 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center pt-16 pb-28 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <PulseOrb />
        </div>

        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-medium mb-8"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            Now Accepting Applications
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Your Gateway to
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tech Mentorship
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Connect with industry professionals across CyberSecurity, BioTech,
            Finance & Data Science. Get real-world guidance, assignments, and
            one-on-one mentorship.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button
              onClick={() => setPage('signup')}
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-medium transition-all duration-300 cursor-pointer"
            >
              Get Started
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => setPage('login')}
              className="px-8 py-3.5 rounded-xl border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-medium transition-all duration-300 cursor-pointer"
            >
              I Have an Account
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center gap-2 py-6 rounded-2xl border border-white/5 bg-white/[0.02]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
            >
              <s.icon size={22} className="text-cyan-400" />
              <span className="text-2xl font-bold">{s.value}</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Mentorship{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Tracks
            </span>
          </h2>
          <p className="mt-3 text-white/40 max-w-lg mx-auto">
            Choose your path. Each track offers dedicated mentors, tailored
            curriculum, and hands-on projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tracks.map((t, i) => (
            <motion.div
              key={t.name}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
              whileHover={{ y: -4 }}
              onClick={() => setPage('signup')}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${t.color}08 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <t.Icon size={56} />
                <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
                <p className="mt-2 text-sm text-white/40 leading-relaxed">
                  {t.desc}
                </p>
                <div
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium transition-colors duration-300"
                  style={{ color: t.color }}
                >
                  Learn More
                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/20">
        © 2024 CyberSyntax Hub. All rights reserved.
      </footer>
    </div>
  );
}
