import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { LogoIcon } from './AnimatedIcons';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { setPage, login } = useStore();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email.trim() || !passcode.trim()) {
      setError('Please enter your email and passcode.');
      return;
    }
    const user = login(email, passcode);
    if (!user) {
      setError('Invalid email or passcode.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-6">
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setPage('landing')}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <LogoIcon size={32} />
          <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CyberSyntax Hub
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-white/40 text-sm mb-8">Log in to your account.</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div>
            <label className="text-xs text-white/50 uppercase tracking-wider">Passcode</label>
            <div className="relative mt-1.5">
              <input
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Your passcode"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors pr-10"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer"
              >
                {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              className="text-red-400 text-sm bg-red-400/10 px-4 py-2 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-medium transition-all duration-300 cursor-pointer"
          >
            Log In
          </button>

          <p className="text-center text-xs text-white/30 pt-2">
            Don't have an account?{' '}
            <button onClick={() => setPage('signup')} className="text-cyan-400 hover:underline cursor-pointer">
              Sign up
            </button>
          </p>

          
        </div>
      </motion.div>
    </div>
  );
}
