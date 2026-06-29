import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  passcode: string;
  role: 'student' | 'mentor';
  approved?: boolean;
  interests?: string[];
  resume?: string;
  bio?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  experience?: string;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  text: string;
  timestamp: number;
}

export interface Announcement {
  id: string;
  mentorId: string;
  mentorName: string;
  title: string;
  content: string;
  imageUrl?: string;
  timestamp: number;
  track?: string;
}

export interface Assignment {
  id: string;
  mentorId: string;
  mentorName: string;
  title: string;
  description: string;
  dueDate: string;
  track: string;
  timestamp: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  timestamp: number;
  grade?: string;
  feedback?: string;
}

type Page = 'landing' | 'signup' | 'login' | 'student-application' | 'student-dashboard' | 'mentor-dashboard' | 'pending';

interface AppState {
  page: Page;
  currentUser: User | null;
  users: User[];
  messages: Message[];
  announcements: Announcement[];
  assignments: Assignment[];
  submissions: Submission[];
  educatorKey: string;

  setPage: (page: Page) => void;
  signup: (user: User) => void;
  login: (email: string, passcode: string) => User | null;
  approveStudent: (studentId: string) => void;
  rejectStudent: (studentId: string) => void;
  sendMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  addAnnouncement: (a: Omit<Announcement, 'id' | 'timestamp'>) => void;
  addAssignment: (a: Omit<Assignment, 'id' | 'timestamp'>) => void;
  submitWork: (s: Omit<Submission, 'id' | 'timestamp'>) => void;
  gradeSubmission: (submissionId: string, grade: string, feedback: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const useStore = create<AppState>((set, get) => ({
  page: 'landing',
  currentUser: null,
  users: [],
  messages: [],
  announcements: [],
  assignments: [],
  submissions: [],
  educatorKey: 'EDU-2024-GAMMA-8P2W5N',

  setPage: (page) => set({ page }),

  signup: (user) =>
    set((s) => ({ users: [...s.users, user] })),

  login: (email, passcode) => {
    const user = get().users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.passcode === passcode
    );
    if (user) {
      set({ currentUser: user });
      if (user.role === 'mentor') {
        set({ page: 'mentor-dashboard' });
      } else if (user.approved) {
        set({ page: 'student-dashboard' });
      } else {
        set({ page: 'pending' });
      }
    }
    return user || null;
  },

  approveStudent: (studentId) =>
    set((s) => ({
      users: s.users.map((u) =>
        u.id === studentId ? { ...u, approved: true } : u
      ),
    })),

  rejectStudent: (studentId) =>
    set((s) => ({
      users: s.users.filter((u) => u.id !== studentId),
    })),

  sendMessage: (msg) =>
    set((s) => ({
      messages: [...s.messages, { ...msg, id: uid(), timestamp: Date.now() }],
    })),

  addAnnouncement: (a) =>
    set((s) => ({
      announcements: [
        { ...a, id: uid(), timestamp: Date.now() },
        ...s.announcements,
      ],
    })),

  addAssignment: (a) =>
    set((s) => ({
      assignments: [
        { ...a, id: uid(), timestamp: Date.now() },
        ...s.assignments,
      ],
    })),

  submitWork: (sub) =>
    set((s) => ({
      submissions: [
        ...s.submissions,
        { ...sub, id: uid(), timestamp: Date.now() },
      ],
    })),

  gradeSubmission: (submissionId, grade, feedback) =>
    set((s) => ({
      submissions: s.submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, grade, feedback } : sub
      ),
    })),

  logout: () => set({ currentUser: null, page: 'landing' }),

  updateUser: (user) =>
    set((s) => ({
      users: s.users.map((u) => (u.id === user.id ? user : u)),
      currentUser: s.currentUser?.id === user.id ? user : s.currentUser,
    })),
}));
