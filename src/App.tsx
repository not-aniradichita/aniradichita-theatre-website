import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/AniradichitaHome';
import {
  AboutPage,
  ServicesPage,
  WorksPage,
  EventsPage,
  StudioPage,
  BlogsPage,
  ContactPage,
} from './pages/AniradichitaPages';
import { QuoteModal, TicketModal, RSVPModal } from './components/Modals';

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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <QuoteModal />
      <TicketModal />
      <RSVPModal />
    </MainLayout>
  );
}

export default App;
