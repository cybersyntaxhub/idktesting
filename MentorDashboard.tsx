import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { LogoIcon } from './AnimatedIcons';
import {
  Home,
  Users,
  Megaphone,
  BookOpen,
  MessageCircle,
  LogOut,
  Send,
  Check,
  X,
  Plus,
  User,
  FileText,
  ChevronUp,
  Eye,
} from 'lucide-react';

type Tab = 'home' | 'applications' | 'students' | 'announcements' | 'assignments' | 'messages';

const TRACKS = ['General', 'CyberSecurity', 'BioTech', 'Finance', 'Data Science'];

export default function MentorDashboard() {
  const {
    currentUser,
    users,
    announcements,
    assignments,
    submissions,
    messages,
    approveStudent,
    rejectStudent,
    addAnnouncement,
    addAssignment,
    sendMessage,
    gradeSubmission,
    logout,
  } = useStore();

  const [tab, setTab] = useState<Tab>('home');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [msgText, setMsgText] = useState('');

  // Announcement form
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annTrack, setAnnTrack] = useState('General');
  const [annImage, setAnnImage] = useState('');
  const [showAnnForm, setShowAnnForm] = useState(false);

  // Assignment form
  const [asgTitle, setAsgTitle] = useState('');
  const [asgDesc, setAsgDesc] = useState('');
  const [asgTrack, setAsgTrack] = useState('General');
  const [asgDue, setAsgDue] = useState('');
  const [showAsgForm, setShowAsgForm] = useState(false);

  // Grading
  const [gradeId, setGradeId] = useState<string | null>(null);
  const [gradeVal, setGradeVal] = useState('');
  const [gradeFeedback, setGradeFeedback] = useState('');

  // Application detail
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  if (!currentUser) return null;

  const pendingStudents = users.filter(
    (u) => u.role === 'student' && !u.approved
  );
  const approvedStudents = users.filter(
    (u) => u.role === 'student' && u.approved
  );

  const handlePostAnnouncement = () => {
    if (!annTitle.trim() || !annContent.trim()) return;
    addAnnouncement({
      mentorId: currentUser.id,
      mentorName: currentUser.name,
      title: annTitle.trim(),
      content: annContent.trim(),
      imageUrl: annImage.trim() || undefined,
      track: annTrack,
    });
    setAnnTitle('');
    setAnnContent('');
    setAnnImage('');
    setShowAnnForm(false);
  };

  const handlePostAssignment = () => {
    if (!asgTitle.trim() || !asgDesc.trim()) return;
    addAssignment({
      mentorId: currentUser.id,
      mentorName: currentUser.name,
      title: asgTitle.trim(),
      description: asgDesc.trim(),
      dueDate: asgDue || 'TBD',
      track: asgTrack,
    });
    setAsgTitle('');
    setAsgDesc('');
    setAsgDue('');
    setShowAsgForm(false);
  };

  const handleSendMessage = () => {
    if (!msgText.trim() || !selectedStudent) return;
    sendMessage({
      fromId: currentUser.id,
      toId: selectedStudent,
      text: msgText.trim(),
    });
    setMsgText('');
  };

  const handleGrade = (subId: string) => {
    if (!gradeVal.trim()) return;
    gradeSubmission(subId, gradeVal.trim(), gradeFeedback.trim());
    setGradeId(null);
    setGradeVal('');
    setGradeFeedback('');
  };

  const navItems = [
    { key: 'home' as Tab, icon: Home, label: 'Overview' },
    {
      key: 'applications' as Tab,
      icon: FileText,
      label: 'Applications',
      badge: pendingStudents.length,
    },
    { key: 'students' as Tab, icon: Users, label: 'Students' },
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
          <div>
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              CyberSyntax
            </span>
            <p className="text-[9px] text-purple-400 uppercase tracking-widest">
              Mentor Portal
            </p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
                tab === item.key
                  ? 'bg-purple-400/10 text-purple-400'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
              }`}
            >
              <item.icon size={18} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span className="w-5 h-5 rounded-full bg-red-500 text-[10px] flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-xs font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{currentUser.name}</p>
              <p className="text-[10px] text-purple-400/60">Mentor</p>
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
        <div className="max-w-5xl mx-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* HOME */}
            {tab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-2xl font-bold mb-1">
                  Mentor Dashboard
                </h1>
                <p className="text-white/40 text-sm mb-8">
                  Welcome back, {currentUser.name}. Here's your overview.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <StatCard
                    icon={FileText}
                    label="Pending Apps"
                    value={pendingStudents.length}
                    color="amber"
                  />
                  <StatCard
                    icon={Users}
                    label="Students"
                    value={approvedStudents.length}
                    color="cyan"
                  />
                  <StatCard
                    icon={Megaphone}
                    label="Announcements"
                    value={announcements.length}
                    color="purple"
                  />
                  <StatCard
                    icon={BookOpen}
                    label="Assignments"
                    value={assignments.length}
                    color="green"
                  />
                </div>

                {pendingStudents.length > 0 && (
                  <div className="p-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 mb-6">
                    <h3 className="text-sm font-semibold text-amber-400 mb-2">
                      Pending Applications
                    </h3>
                    <p className="text-xs text-white/40 mb-3">
                      You have {pendingStudents.length} student
                      {pendingStudents.length > 1 ? 's' : ''} waiting for
                      approval.
                    </p>
                    <button
                      onClick={() => setTab('applications')}
                      className="text-xs text-amber-400 hover:underline cursor-pointer"
                    >
                      Review Applications →
                    </button>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <h3 className="text-sm font-semibold mb-3">
                      Recent Submissions
                    </h3>
                    {submissions.length === 0 ? (
                      <p className="text-xs text-white/30">
                        No submissions yet.
                      </p>
                    ) : (
                      submissions.slice(-5).reverse().map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                        >
                          <div className="w-6 h-6 rounded bg-cyan-400/10 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                            {s.studentName.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs truncate">
                              {s.studentName}
                            </p>
                            <p className="text-[10px] text-white/30 truncate">
                              {assignments.find(
                                (a) => a.id === s.assignmentId
                              )?.title || 'Assignment'}
                            </p>
                          </div>
                          {s.grade ? (
                            <span className="text-[10px] text-green-400">
                              {s.grade}
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-400">
                              Ungraded
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <h3 className="text-sm font-semibold mb-3">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setTab('announcements');
                          setShowAnnForm(true);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors text-left cursor-pointer"
                      >
                        <Megaphone size={16} className="text-purple-400" />
                        <span className="text-xs">Post Announcement</span>
                      </button>
                      <button
                        onClick={() => {
                          setTab('assignments');
                          setShowAsgForm(true);
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors text-left cursor-pointer"
                      >
                        <BookOpen size={16} className="text-green-400" />
                        <span className="text-xs">Create Assignment</span>
                      </button>
                      <button
                        onClick={() => setTab('messages')}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors text-left cursor-pointer"
                      >
                        <MessageCircle size={16} className="text-cyan-400" />
                        <span className="text-xs">Message Students</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* APPLICATIONS */}
            {tab === 'applications' && (
              <motion.div
                key="applications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-2xl font-bold mb-1">
                  Student Applications
                </h1>
                <p className="text-white/40 text-sm mb-6">
                  Review and approve incoming student applications.
                </p>

                {pendingStudents.length === 0 ? (
                  <div className="text-center py-16 text-white/20">
                    <FileText
                      size={40}
                      className="mx-auto mb-3 opacity-30"
                    />
                    <p>No pending applications.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingStudents.map((s) => {
                      const isExpanded = expandedApp === s.id;
                      return (
                        <div
                          key={s.id}
                          className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
                        >
                          <div className="p-5">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-sm font-bold">
                                  {s.name.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="font-semibold">{s.name}</h3>
                                  <p className="text-xs text-white/40">
                                    {s.email}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    setExpandedApp(
                                      isExpanded ? null : s.id
                                    )
                                  }
                                  className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer text-white/40"
                                >
                                  {isExpanded ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <Eye size={16} />
                                  )}
                                </button>
                                <button
                                  onClick={() => approveStudent(s.id)}
                                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs transition-colors cursor-pointer"
                                >
                                  <Check size={14} /> Accept
                                </button>
                                <button
                                  onClick={() => rejectStudent(s.id)}
                                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-colors cursor-pointer"
                                >
                                  <X size={14} /> Reject
                                </button>
                              </div>
                            </div>

                            {s.interests && s.interests.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-3 ml-13">
                                {s.interests.map((i) => (
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

                          {isExpanded && (
                            <motion.div
                              className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {s.bio && (
                                <div>
                                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                                    Bio
                                  </p>
                                  <p className="text-sm text-white/60 leading-relaxed">
                                    {s.bio}
                                  </p>
                                </div>
                              )}
                              {s.resume && (
                                <div>
                                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                                    Resume
                                  </p>
                                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                    <p className="text-xs text-white/50 whitespace-pre-wrap">
                                      {s.resume}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {s.experience && (
                                <div>
                                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                                    Experience
                                  </p>
                                  <p className="text-sm text-white/60">
                                    {s.experience}
                                  </p>
                                </div>
                              )}
                              <div className="grid grid-cols-3 gap-3">
                                {s.phone && (
                                  <div>
                                    <p className="text-[10px] text-white/30">
                                      Phone
                                    </p>
                                    <p className="text-xs text-white/60">
                                      {s.phone}
                                    </p>
                                  </div>
                                )}
                                {s.linkedin && (
                                  <div>
                                    <p className="text-[10px] text-white/30">
                                      LinkedIn
                                    </p>
                                    <p className="text-xs text-cyan-400 truncate">
                                      {s.linkedin}
                                    </p>
                                  </div>
                                )}
                                {s.github && (
                                  <div>
                                    <p className="text-[10px] text-white/30">
                                      GitHub
                                    </p>
                                    <p className="text-xs text-cyan-400 truncate">
                                      {s.github}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* STUDENTS */}
            {tab === 'students' && (
              <motion.div
                key="students"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-2xl font-bold mb-1">Students</h1>
                <p className="text-white/40 text-sm mb-6">
                  View all approved students and their progress.
                </p>

                {approvedStudents.length === 0 ? (
                  <div className="text-center py-16 text-white/20">
                    <Users size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No approved students yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {approvedStudents.map((s) => {
                      const studentSubs = submissions.filter(
                        (sub) => sub.studentId === s.id
                      );
                      return (
                        <div
                          key={s.id}
                          className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-sm font-bold shrink-0">
                              {s.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold">{s.name}</h3>
                              <p className="text-xs text-white/40">
                                {s.email}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-white/40">
                                Submissions: {studentSubs.length}
                              </p>
                              <p className="text-xs text-white/40">
                                Graded:{' '}
                                {
                                  studentSubs.filter((sub) => sub.grade)
                                    .length
                                }
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedStudent(s.id);
                                setTab('messages');
                              }}
                              className="p-2 rounded-lg hover:bg-white/[0.05] text-white/30 hover:text-cyan-400 transition-colors cursor-pointer"
                            >
                              <MessageCircle size={16} />
                            </button>
                          </div>
                          {s.interests && s.interests.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3 ml-14">
                              {s.interests.map((i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-full text-[10px] border border-white/10 text-white/40"
                                >
                                  {i}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* ANNOUNCEMENTS */}
            {tab === 'announcements' && (
              <motion.div
                key="announcements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold">Announcements</h1>
                    <p className="text-white/40 text-sm">
                      Post updates for your students.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAnnForm(!showAnnForm)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 text-xs transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> New Post
                  </button>
                </div>

                {showAnnForm && (
                  <motion.div
                    className="p-5 rounded-2xl border border-purple-400/20 bg-purple-400/5 mb-6 space-y-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <input
                      type="text"
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      placeholder="Announcement title..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400/50 outline-none text-sm"
                    />
                    <textarea
                      value={annContent}
                      onChange={(e) => setAnnContent(e.target.value)}
                      placeholder="Write your announcement content..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400/50 outline-none text-sm resize-none"
                    />
                    <div className="flex gap-3">
                      <select
                        value={annTrack}
                        onChange={(e) => setAnnTrack(e.target.value)}
                        className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white/70"
                      >
                        {TRACKS.map((t) => (
                          <option key={t} value={t} className="bg-[#0a0a0f]">
                            {t}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={annImage}
                        onChange={(e) => setAnnImage(e.target.value)}
                        placeholder="Image URL (optional)"
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowAnnForm(false)}
                        className="px-4 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handlePostAnnouncement}
                        className="px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-xs font-medium transition-colors cursor-pointer"
                      >
                        Post
                      </button>
                    </div>
                  </motion.div>
                )}

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
                          <p className="text-sm font-medium">
                            {a.mentorName}
                          </p>
                          <p className="text-[10px] text-white/30">
                            {new Date(a.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {a.track && (
                          <span className="ml-auto px-2.5 py-0.5 rounded-full text-[10px] border border-purple-400/20 text-purple-400/70">
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
              </motion.div>
            )}

            {/* ASSIGNMENTS */}
            {tab === 'assignments' && (
              <motion.div
                key="assignments"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold">Assignments</h1>
                    <p className="text-white/40 text-sm">
                      Create and manage student assignments.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAsgForm(!showAsgForm)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> New Assignment
                  </button>
                </div>

                {showAsgForm && (
                  <motion.div
                    className="p-5 rounded-2xl border border-green-400/20 bg-green-400/5 mb-6 space-y-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <input
                      type="text"
                      value={asgTitle}
                      onChange={(e) => setAsgTitle(e.target.value)}
                      placeholder="Assignment title..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-green-400/50 outline-none text-sm"
                    />
                    <textarea
                      value={asgDesc}
                      onChange={(e) => setAsgDesc(e.target.value)}
                      placeholder="Describe the assignment, include instructions..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-green-400/50 outline-none text-sm resize-none"
                    />
                    <div className="flex gap-3">
                      <select
                        value={asgTrack}
                        onChange={(e) => setAsgTrack(e.target.value)}
                        className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white/70"
                      >
                        {TRACKS.map((t) => (
                          <option key={t} value={t} className="bg-[#0a0a0f]">
                            {t}
                          </option>
                        ))}
                      </select>
                      <input
                        type="date"
                        value={asgDue}
                        onChange={(e) => setAsgDue(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none text-sm text-white/70"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowAsgForm(false)}
                        className="px-4 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handlePostAssignment}
                        className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-xs font-medium transition-colors cursor-pointer"
                      >
                        Create
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {assignments.length === 0 ? (
                    <div className="text-center py-16 text-white/20">
                      <BookOpen
                        size={40}
                        className="mx-auto mb-3 opacity-30"
                      />
                      <p>No assignments created yet.</p>
                    </div>
                  ) : (
                    assignments.map((a) => {
                      const subs = submissions.filter(
                        (s) => s.assignmentId === a.id
                      );
                      return (
                        <div
                          key={a.id}
                          className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{a.title}</h3>
                              <p className="text-xs text-white/30 mt-1">
                                {a.track} • Due: {a.dueDate}
                              </p>
                            </div>
                            <span className="text-[10px] text-white/30 bg-white/[0.04] px-2.5 py-1 rounded-full">
                              {subs.length} submissions
                            </span>
                          </div>
                          <p className="text-sm text-white/50 leading-relaxed mb-4 whitespace-pre-wrap">
                            {a.description}
                          </p>

                          {subs.length > 0 && (
                            <div className="space-y-2 border-t border-white/5 pt-3">
                              <p className="text-xs text-white/30 uppercase tracking-wider">
                                Submissions
                              </p>
                              {subs.map((s) => (
                                <div
                                  key={s.id}
                                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 rounded bg-cyan-400/10 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                                        {s.studentName.charAt(0)}
                                      </div>
                                      <span className="text-xs font-medium">
                                        {s.studentName}
                                      </span>
                                    </div>
                                    {s.grade ? (
                                      <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                                        {s.grade}
                                      </span>
                                    ) : (
                                      <button
                                        onClick={() => setGradeId(s.id)}
                                        className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                                      >
                                        Grade
                                      </button>
                                    )}
                                  </div>
                                  <p className="text-xs text-white/50 whitespace-pre-wrap">
                                    {s.content}
                                  </p>

                                  {gradeId === s.id && (
                                    <motion.div
                                      className="mt-3 pt-3 border-t border-white/5 space-y-2"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                    >
                                      <div className="flex gap-2">
                                        <input
                                          type="text"
                                          value={gradeVal}
                                          onChange={(e) =>
                                            setGradeVal(e.target.value)
                                          }
                                          placeholder="Grade (e.g., A+, 95/100)"
                                          className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 outline-none text-xs"
                                        />
                                      </div>
                                      <input
                                        type="text"
                                        value={gradeFeedback}
                                        onChange={(e) =>
                                          setGradeFeedback(e.target.value)
                                        }
                                        placeholder="Feedback (optional)"
                                        className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 outline-none text-xs"
                                      />
                                      <div className="flex justify-end gap-2">
                                        <button
                                          onClick={() => setGradeId(null)}
                                          className="text-[10px] text-white/40 cursor-pointer"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={() => handleGrade(s.id)}
                                          className="px-3 py-1 rounded bg-green-500/20 text-green-400 text-[10px] cursor-pointer"
                                        >
                                          Submit Grade
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}

            {/* MESSAGES */}
            {tab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-2xl font-bold mb-1">Messages</h1>
                <p className="text-white/40 text-sm mb-6">
                  Privately message your students.
                </p>

                <div className="flex gap-4 h-[calc(100vh-220px)]">
                  {/* Student list */}
                  <div className="w-56 shrink-0 border border-white/5 rounded-2xl bg-white/[0.02] overflow-y-auto">
                    <div className="p-3 border-b border-white/5">
                      <p className="text-xs text-white/30 uppercase tracking-wider">
                        Students
                      </p>
                    </div>
                    {approvedStudents.length === 0 ? (
                      <div className="p-4 text-center text-xs text-white/20">
                        No students yet
                      </div>
                    ) : (
                      approvedStudents.map((s) => {
                        const convMessages = messages.filter(
                          (m) =>
                            (m.fromId === s.id && m.toId === currentUser.id) ||
                            (m.fromId === currentUser.id && m.toId === s.id)
                        );
                        return (
                          <button
                            key={s.id}
                            onClick={() => setSelectedStudent(s.id)}
                            className={`w-full flex items-center gap-3 p-3 text-left transition-colors cursor-pointer ${
                              selectedStudent === s.id
                                ? 'bg-purple-400/10'
                                : 'hover:bg-white/[0.03]'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center text-xs font-bold text-cyan-400 shrink-0">
                              {s.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium truncate">
                                {s.name}
                              </p>
                              {convMessages.length > 0 && (
                                <p className="text-[10px] text-white/30">
                                  {convMessages.length} messages
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Chat area */}
                  <div className="flex-1 flex flex-col border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden">
                    {!selectedStudent ? (
                      <div className="flex-1 flex items-center justify-center text-white/20">
                        <div className="text-center">
                          <MessageCircle
                            size={40}
                            className="mx-auto mb-3 opacity-30"
                          />
                          <p className="text-sm">
                            Select a student to start chatting
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 border-b border-white/5 flex items-center gap-3">
                          <User size={16} className="text-cyan-400" />
                          <span className="text-sm font-medium">
                            {
                              approvedStudents.find(
                                (s) => s.id === selectedStudent
                              )?.name
                            }
                          </span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                          {messages
                            .filter(
                              (m) =>
                                (m.fromId === selectedStudent &&
                                  m.toId === currentUser.id) ||
                                (m.fromId === currentUser.id &&
                                  m.toId === selectedStudent)
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
                                      ? 'bg-purple-500/20 text-purple-100 rounded-br-md'
                                      : 'bg-white/[0.06] text-white/70 rounded-bl-md'
                                  }`}
                                >
                                  {m.text}
                                  <p className="text-[9px] text-white/20 mt-1">
                                    {new Date(
                                      m.timestamp
                                    ).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="p-3 border-t border-white/5">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={msgText}
                              onChange={(e) => setMsgText(e.target.value)}
                              placeholder="Type a message..."
                              className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400/50 outline-none text-sm"
                              onKeyDown={(e) =>
                                e.key === 'Enter' && handleSendMessage()
                              }
                            />
                            <button
                              onClick={handleSendMessage}
                              className="px-4 py-2.5 rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors cursor-pointer"
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

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    amber: 'text-amber-400',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
  };

  return (
    <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
      <Icon size={20} className={`${colorClasses[color]} mb-3`} />
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-white/40 mt-1">{label}</p>
    </div>
  );
}
