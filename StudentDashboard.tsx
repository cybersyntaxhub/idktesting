import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { LogoIcon } from './AnimatedIcons';
import {
  Home,
  Megaphone,
  BookOpen,
  MessageCircle,
  LogOut,
  Send,
  Clock,
  CheckCircle2,
  User,
  ChevronRight,
} from 'lucide-react';

type Tab = 'home' | 'announcements' | 'assignments' | 'messages';

export default function StudentDashboard() {
  const {
    currentUser,
    announcements,
    assignments,
    submissions,
    messages,
    users,
    submitWork,
    sendMessage,
    logout,
  } = useStore();
  const [tab, setTab] = useState<Tab>('home');
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [msgText, setMsgText] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const [activeAssignment, setActiveAssignment] = useState<string | null>(null);

  if (!currentUser) return null;

  const mentors = users.filter((u) => u.role === 'mentor');
  const mySubmissions = submissions.filter((s) => s.studentId === currentUser.id);
  const myMessages = messages.filter(
    (m) => m.fromId === currentUser.id || m.toId === currentUser.id
  );

  const handleSendMessage = () => {
    if (!msgText.trim() || !selectedMentor) return;
    sendMessage({ fromId: currentUser.id, toId: selectedMentor, text: msgText.trim() });
    setMsgText('');
  };

  const handleSubmitWork = (assignmentId: string) => {
    if (!submissionText.trim()) return;
    submitWork({
      assignmentId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      content: submissionText.trim(),
    });
    setSubmissionText('');
    setActiveAssignment(null);
  };

  const navItems = [
    { key: 'home' as Tab, icon: Home, label: 'Home' },
    { key: 'announcements' as Tab, icon: Megaphone, label: 'Announcements' },
    { key: 'assignments' as Tab, icon: BookOpen, label: 'Assignments' },
    { key: 'messages' as Tab, icon: MessageCircle, label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Sidebar */}
      <motion.aside
        className="w-64 border-r border-white/5 bg-[#0c0c14] flex flex-col shrink-0"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-5 flex items-center gap-3 border-b border-white/5">
          <LogoIcon size={28} />
          <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CyberSyntax
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
                tab === item.key
                  ? 'bg-cyan-400/10 text-cyan-400'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{currentUser.name}</p>
              <p className="text-[10px] text-white/30 truncate">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-colors cursor-pointer"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            {tab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold mb-1">
                  Welcome back,{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {currentUser.name}
                  </span>
                </h1>
                <p className="text-white/40 text-sm mb-8">
                  Here's an overview of your mentorship journey.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <Megaphone size={20} className="text-cyan-400 mb-3" />
                    <p className="text-2xl font-bold">{announcements.length}</p>
                    <p className="text-xs text-white/40 mt-1">Announcements</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <BookOpen size={20} className="text-purple-400 mb-3" />
                    <p className="text-2xl font-bold">{assignments.length}</p>
                    <p className="text-xs text-white/40 mt-1">Assignments</p>
                  </div>
                  <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <CheckCircle2 size={20} className="text-green-400 mb-3" />
                    <p className="text-2xl font-bold">{mySubmissions.length}</p>
                    <p className="text-xs text-white/40 mt-1">Submitted</p>
                  </div>
                </div>

                {/* Recent announcements */}
                <h2 className="text-lg font-semibold mb-4">Recent Announcements</h2>
                {announcements.slice(0, 3).map((a) => (
                  <div
                    key={a.id}
                    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] mb-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-400">
                        {a.mentorName.charAt(0)}
                      </div>
                      <span className="text-xs text-white/50">{a.mentorName}</span>
                      <span className="text-[10px] text-white/20 ml-auto">
                        {new Date(a.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{a.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{a.content}</p>
                  </div>
                ))}

                {/* Interests */}
                {currentUser.interests && currentUser.interests.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-3">Your Tracks</h2>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.interests.map((t) => (
                        <span
                          key={t}
                          className="px-4 py-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {tab === 'announcements' && (
              <motion.div
                key="announcements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold mb-1">Announcements</h1>
                <p className="text-white/40 text-sm mb-6">
                  Stay updated with the latest from your mentors.
                </p>

                {announcements.length === 0 ? (
                  <div className="text-center py-16 text-white/20">
                    <Megaphone size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No announcements yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {announcements.map((a) => (
                      <div
                        key={a.id}
                        className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">
                            {a.mentorName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{a.mentorName}</p>
                            <p className="text-[10px] text-white/30">
                              {new Date(a.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {a.track && (
                            <span className="ml-auto px-2.5 py-0.5 rounded-full text-[10px] border border-cyan-400/20 text-cyan-400/70">
                              {a.track}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold mb-2">{a.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed whitespace-pre-wrap">
                          {a.content}
                        </p>
                        {a.imageUrl && (
                          <div className="mt-3 rounded-xl overflow-hidden border border-white/5">
                            <img
                              src={a.imageUrl}
                              alt=""
                              className="w-full max-h-80 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {tab === 'assignments' && (
              <motion.div
                key="assignments"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold mb-1">Assignments</h1>
                <p className="text-white/40 text-sm mb-6">
                  Complete your assigned work and submit for review.
                </p>

                {assignments.length === 0 ? (
                  <div className="text-center py-16 text-white/20">
                    <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No assignments yet. Check back soon!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assignments.map((a) => {
                      const mySub = mySubmissions.find((s) => s.assignmentId === a.id);
                      const isActive = activeAssignment === a.id;

                      return (
                        <div
                          key={a.id}
                          className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{a.title}</h3>
                              <p className="text-xs text-white/30 mt-1">
                                By {a.mentorName} • {a.track}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {mySub ? (
                                <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
                                  <CheckCircle2 size={12} /> Submitted
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                                  <Clock size={12} /> Pending
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-white/50 leading-relaxed mb-3 whitespace-pre-wrap">
                            {a.description}
                          </p>

                          <div className="text-xs text-white/30 mb-3">
                            Due: {a.dueDate}
                          </div>

                          {mySub ? (
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                              <p className="text-xs text-white/30 mb-1">Your submission:</p>
                              <p className="text-sm text-white/60 whitespace-pre-wrap">
                                {mySub.content}
                              </p>
                              {mySub.grade && (
                                <div className="mt-2 pt-2 border-t border-white/5">
                                  <span className="text-xs text-cyan-400">
                                    Grade: {mySub.grade}
                                  </span>
                                  {mySub.feedback && (
                                    <p className="text-xs text-white/40 mt-1">
                                      {mySub.feedback}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <>
                              {!isActive ? (
                                <button
                                  onClick={() => setActiveAssignment(a.id)}
                                  className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                                >
                                  Submit Work <ChevronRight size={14} />
                                </button>
                              ) : (
                                <div className="space-y-3">
                                  <textarea
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                    placeholder="Enter your work / answer here..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm transition-colors resize-none"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => setActiveAssignment(null)}
                                      className="px-4 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 border border-white/10 cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleSubmitWork(a.id)}
                                      className="px-4 py-2 rounded-lg text-xs bg-gradient-to-r from-cyan-500 to-purple-600 cursor-pointer"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {tab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold mb-1">Messages</h1>
                <p className="text-white/40 text-sm mb-6">
                  Privately message your mentors.
                </p>

                <div className="flex gap-4 h-[calc(100vh-220px)]">
                  {/* Mentor list */}
                  <div className="w-56 shrink-0 border border-white/5 rounded-2xl bg-white/[0.02] overflow-y-auto">
                    <div className="p-3 border-b border-white/5">
                      <p className="text-xs text-white/30 uppercase tracking-wider">
                        Mentors
                      </p>
                    </div>
                    {mentors.map((m) => {
                      const unread = myMessages.filter(
                        (msg) => msg.fromId === m.id
                      ).length;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setSelectedMentor(m.id)}
                          className={`w-full flex items-center gap-3 p-3 text-left transition-colors cursor-pointer ${
                            selectedMentor === m.id
                              ? 'bg-cyan-400/10'
                              : 'hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400 shrink-0">
                            {m.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate">{m.name}</p>
                            {unread > 0 && (
                              <p className="text-[10px] text-cyan-400">
                                {unread} messages
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Chat area */}
                  <div className="flex-1 flex flex-col border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden">
                    {!selectedMentor ? (
                      <div className="flex-1 flex items-center justify-center text-white/20">
                        <div className="text-center">
                          <MessageCircle size={40} className="mx-auto mb-3 opacity-30" />
                          <p className="text-sm">Select a mentor to start chatting</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex items-center gap-3">
                          <User size={16} className="text-purple-400" />
                          <span className="text-sm font-medium">
                            {mentors.find((m) => m.id === selectedMentor)?.name}
                          </span>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                          {myMessages
                            .filter(
                              (m) =>
                                m.fromId === selectedMentor ||
                                m.toId === selectedMentor
                            )
                            .sort((a, b) => a.timestamp - b.timestamp)
                            .map((m) => (
                              <div
                                key={m.id}
                                className={`flex ${
                                  m.fromId === currentUser.id
                                    ? 'justify-end'
                                    : 'justify-start'
                                }`}
                              >
                                <div
                                  className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                                    m.fromId === currentUser.id
                                      ? 'bg-cyan-500/20 text-cyan-100 rounded-br-md'
                                      : 'bg-white/[0.06] text-white/70 rounded-bl-md'
                                  }`}
                                >
                                  {m.text}
                                  <p className="text-[9px] text-white/20 mt-1">
                                    {new Date(m.timestamp).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-white/5">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={msgText}
                              onChange={(e) => setMsgText(e.target.value)}
                              placeholder="Type a message..."
                              className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/50 outline-none text-sm"
                              onKeyDown={(e) =>
                                e.key === 'Enter' && handleSendMessage()
                              }
                            />
                            <button
                              onClick={handleSendMessage}
                              className="px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors cursor-pointer"
                            >
                              <Send size={16} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
