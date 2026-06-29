import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { LogoIcon } from './AnimatedIcons';
import { ArrowLeft, GraduationCap, Award, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function SignupPage() {
  const { setPage, signup, educatorKey, users } = useStore();
  const [accountType, setAccountType] = useState<'student' | 'mentor' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [mentorKey, setMentorKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!name.trim() || !email.trim() || !passcode.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setError('An account with this email already exists.');
      return;
    }
    if (accountType === 'mentor' && mentorKey !== educatorKey) {
      setError('Invalid educator key. Please contact administration.');
      return;
    }

    const id = Math.random().toString(36).slice(2, 10);
    const user = {
      id,
      name: name.trim(),
      email: email.trim(),
      passcode,
      role: accountType as 'student' | 'mentor',
      approved: accountType === 'mentor' ? true : false,
      interests: [],
      resume: '',
    };

    signup(user);

    if (accountType === 'mentor') {
      useStore.getState().login(email, passcode);
    } else {
      // Set current user and go to application form
      useStore.setState({ currentUser: user });
      setPage('student-application');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-6">
      {/* Grid bg */}
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
        {/* Back button */}
        <button
          onClick={() => (accountType ? setAccountType(null) : setPage('landing'))}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <LogoIcon size={32} />
          <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CyberSyntax Hub
          </span>
        </div>

        <AnimatePresence mode="wait">
          {!accountType ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-white/40 text-sm mb-8">Choose your account type to get started.</p>

              <div className="space-y-4">
                <button
                  onClick={() => { setAccountType('student'); setError(''); }}
                  className="w-full group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/30 hover:bg-cyan-400/[0.03] transition-all duration-300 text-left cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                    <GraduationCap size={24} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Student</div>
                    <div className="text-xs text-white/40 mt-0.5">
                      Apply for mentorship, complete assignments, and grow your skills
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setAccountType('mentor'); setError(''); }}
                  className="w-full group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-purple-400/30 hover:bg-purple-400/[0.03] transition-all duration-300 text-left cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center group-hover:bg-purple-400/20 transition-colors">
                    <Award size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Mentor</div>
                    <div className="text-xs text-white/40 mt-0.5">
                      Guide students, create assignments, and manage your classroom
                    </div>
                  </div>
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-white/30">
                Already have an account?{' '}
                <button onClick={() => setPage('login')} className="text-cyan-400 hover:underline cursor-pointer">
                  Log in
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-2">
                {accountType === 'student' ? 'Student' : 'Mentor'} Sign Up
              </h1>
              <p className="text-white/40 text-sm mb-6">
                {accountType === 'student'
                  ? 'Create your account, then complete your application.'
                  : 'Create your educator account with your educator key.'}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider">Passcode</label>
                  <div className="relative mt-1.5">
                    <input
                      type={showPasscode ? 'text' : 'password'}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Create a passcode"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 cursor-pointer"
                    >
                      {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="mt-1.5 text-[11px] text-amber-400/70 flex items-center gap-1">
                    <AlertCircle size={12} />
                    Do NOT use your real password. This is a demo platform.
                  </p>
                </div>

                {accountType === 'mentor' && (
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider">
                      Educator Key
                    </label>
                    <input
                      type="text"
                      value={mentorKey}
                      onChange={(e) => setMentorKey(e.target.value)}
                      placeholder="Enter educator access key"
                      className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400/50 outline-none text-sm transition-colors"
                    />
                    <p className="mt-1.5 text-[11px] text-white/30">
                      Contact administration if you don't have an educator key.
                    </p>
                  </div>
                )}

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
                  onClick={handleSubmit}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-medium transition-all duration-300 cursor-pointer mt-2"
                >
                  {accountType === 'student' ? 'Continue to Application' : 'Create Mentor Account'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
