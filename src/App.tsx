import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { CastingPage } from './pages/CastingPage';
import { CommunityPage } from './pages/CommunityPage';
import { HomePage } from './pages/HomePage';
import { MembersPage } from './pages/MembersPage';
import { ProfilePage } from './pages/ProfilePage';
import { RitualsPage } from './pages/RitualsPage';

const pageTransition = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageTransition}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="min-h-screen"
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/casting" element={<CastingPage />} />
            <Route path="/rituals" element={<RitualsPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
