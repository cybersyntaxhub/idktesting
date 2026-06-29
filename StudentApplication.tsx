import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { LogoIcon } from './AnimatedIcons';
import { Upload, Check, ArrowLeft } from 'lucide-react';

const TRACKS = ['CyberSecurity', 'BioTech', 'Finance', 'Data Science'];

export default function StudentApplication() {
  const { currentUser, updateUser, setPage } = useStore();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [experience, setExperience] = useState('');
  const [resume, setResume] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState('');

  if (!currentUser) return null;

  const toggleInterest = (track: string) => {
    setInterests((prev) =>
      prev.includes(track) ? prev.filter((t) => t !== track) : [...prev, track]
    );
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!bio.trim()) {
        setError('Please write a short bio about yourself.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (interests.length === 0) {
        setError('Please select at least one track.');
        return;
      }
      // Submit application
      updateUser({
        ...currentUser,
        phone,
        bio,
        linkedin,
        github,
        experience,
        resume,
        interests,
        approved: false,
      });
      setPage('pending');
    }
  };

  const stepTitles = ['Personal Details', 'Resume & Experience', 'Select Tracks'];

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
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <LogoIcon size={32} />
          <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CyberSyntax Hub
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-1">Student Application</h1>
        <p className="text-white/40 text-sm mb-6">
          Complete your profile — Step {step} of 3: {stepTitles[step - 1]}
        </p>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: s <= step ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider">
                Bio / About You *
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself, your background, and what you hope to achieve..."
                rows={4}
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider">
                  LinkedIn (Optional)
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/in/..."
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider">
                  GitHub (Optional)
                </label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="github.com/..."
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider">
                Resume / CV (Paste text — preferred but optional)
              </label>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume content here. Include your education, skills, projects, and any relevant experience..."
                rows={6}
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors resize-none"
              />
              <div className="mt-2 flex items-center gap-2 text-[11px] text-white/30">
                <Upload size={12} />
                Paste your resume content above. Having a resume is preferred.
              </div>
            </div>

            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider">
                Prior Experience (Optional)
              </label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Describe any relevant experience, courses, certifications, or projects..."
                rows={4}
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors resize-none"
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-white/50 mb-4">
              Select the mentorship tracks you're interested in. You can choose multiple.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {TRACKS.map((track) => {
                const selected = interests.includes(track);
                const colors: Record<string, string> = {
                  CyberSecurity: 'cyan',
                  BioTech: 'purple',
                  Finance: 'emerald',
                  'Data Science': 'amber',
                };
                const c = colors[track] || 'cyan';
                return (
                  <button
                    key={track}
                    onClick={() => toggleInterest(track)}
                    className={`relative p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      selected
                        ? `border-${c}-400/40 bg-${c}-400/10`
                        : 'border-white/5 bg-white/[0.02] hover:border-white/15'
                    }`}
                    style={{
                      borderColor: selected
                        ? track === 'CyberSecurity'
                          ? 'rgba(0,240,255,0.4)'
                          : track === 'BioTech'
                          ? 'rgba(168,85,247,0.4)'
                          : track === 'Finance'
                          ? 'rgba(16,185,129,0.4)'
                          : 'rgba(245,158,11,0.4)'
                        : undefined,
                      backgroundColor: selected
                        ? track === 'CyberSecurity'
                          ? 'rgba(0,240,255,0.08)'
                          : track === 'BioTech'
                          ? 'rgba(168,85,247,0.08)'
                          : track === 'Finance'
                          ? 'rgba(16,185,129,0.08)'
                          : 'rgba(245,158,11,0.08)'
                        : undefined,
                    }}
                  >
                    {selected && (
                      <motion.div
                        className="absolute top-3 right-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check size={16} className="text-green-400" />
                      </motion.div>
                    )}
                    <div className="text-sm font-semibold">{track}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.p
            className="text-red-400 text-sm bg-red-400/10 px-4 py-2 rounded-lg mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-medium transition-all duration-300 cursor-pointer"
          >
            {step === 3 ? 'Submit Application' : 'Continue'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
