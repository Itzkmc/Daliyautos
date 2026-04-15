import { useState, useEffect } from 'react';
import { Page } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import BrowseCars from './pages/BrowseCars';
import ImportRequest from './pages/ImportRequest';
import Dealer from './pages/Dealer';
import ReferralProgram from './pages/ReferralProgram';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { motion, AnimatePresence } from 'motion/react';
import { FirebaseProvider } from './components/FirebaseProvider';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'browse':
        return <BrowseCars />;
      case 'import':
        return <ImportRequest />;
      case 'dealer':
        return <Dealer />;
      case 'referral':
        return <ReferralProgram />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          
          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer setCurrentPage={setCurrentPage} />
          <FloatingWhatsApp />
        </div>
      </FirebaseProvider>
    </ErrorBoundary>
  );
}
