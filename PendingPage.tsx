import { motion } from 'framer-motion';
import { useStore } from '../store';
import { LogoIcon } from './AnimatedIcons';
import { Clock, RefreshCw } from 'lucide-react';

export default function PendingPage() {
  const { currentUser, users, logout } = useStore();

  if (!currentUser) return null;

  // Check if approved
  const latestUser = users.find((u) => u.id === currentUser.id);
  if (latestUser?.approved) {
    // Auto redirect
    setTimeout(() => {
      useStore.setState({ currentUser: latestUser, page: 'student-dashboard' });
    }, 100);
  }

  const handleRefresh = () => {
    const u = users.find((usr) => usr.id === currentUser.id);
    if (u?.approved) {
      useStore.setState({ currentUser: u, page: 'student-dashboard' });
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
        className="w-full max-w-md text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <LogoIcon size={48} />
        </div>

        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-amber-400/30 bg-amber-400/10 flex items-center justify-center"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Clock size={28} className="text-amber-400" />
        </motion.div>

        <h1 className="text-2xl font-bold mb-3">Application Submitted</h1>
        <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto">
          Your application has been sent to our mentors for review. You'll be
          able to access the student portal once a mentor approves your
          application.
        </p>

        <div className="mt-8 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <p className="text-xs text-white/30 mb-1">Applied as</p>
          <p className="text-sm font-medium">{currentUser.name}</p>
          <p className="text-xs text-white/40">{currentUser.email}</p>
          {currentUser.interests && currentUser.interests.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {currentUser.interests.map((i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-[10px] border border-cyan-400/20 text-cyan-400/70"
                >
                  {i}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleRefresh}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-medium transition-all duration-300 cursor-pointer text-sm"
        >
          <RefreshCw size={14} /> Check Status
        </button>

        <div className="mt-4">
          <button
            onClick={logout}
            className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
