import { useStore } from './store';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import StudentApplication from './components/StudentApplication';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import PendingPage from './components/PendingPage';

export default function App() {
  const page = useStore((s) => s.page);

  switch (page) {
    case 'landing':
      return <LandingPage />;
    case 'signup':
      return <SignupPage />;
    case 'login':
      return <LoginPage />;
    case 'student-application':
      return <StudentApplication />;
    case 'student-dashboard':
      return <StudentDashboard />;
    case 'mentor-dashboard':
      return <MentorDashboard />;
    case 'pending':
      return <PendingPage />;
    default:
      return <LandingPage />;
  }
}
