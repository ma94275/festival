import { Route, Routes } from 'react-router-dom';
import './App.css';

// Pages
import Login from './pages/login';
import Signup from './pages/signup';
import ProfileSetup from './pages/profile-setup';
import Home from './pages/home';
import WriteChapter1 from './pages/write-chapter1';
import WriteChapter2 from './pages/write-chapter2';
import WriteChapter3 from './pages/write-chapter3';
import Feedback from './pages/feedback';
import Mypage from './pages/mypage';
import Archivepage from './pages/archivepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />

      <Route path="/home" element={<Home />} />
      <Route path="/write-chapter1" element={<WriteChapter1 />} />
      <Route path="/write-chapter2" element={<WriteChapter2 />} />
      <Route path="/write-chapter3" element={<WriteChapter3 />} />

      <Route path="/feedback" element={<Feedback />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/archive" element={<Archivepage />} />
    </Routes>
  );
}

export default App;
