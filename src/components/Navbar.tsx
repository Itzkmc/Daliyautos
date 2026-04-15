import { CarType, Page } from '../types';
import { Menu, X, Car, Zap, ShieldCheck, Users, Phone, Home, Search, PlusCircle, Store, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { useFirebase } from './FirebaseProvider';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useFirebase();

  const navItems: { label: string; value: Page; icon: any }[] = [
    { label: 'Home', value: 'home', icon: Home },
    { label: 'Browse', value: 'browse', icon: Search },
    { label: 'Import', value: 'import', icon: PlusCircle },
    { label: 'Referral', value: 'referral', icon: Users },
    { label: 'Dealers', value: 'dealer', icon: Store },
    { label: 'Contact', value: 'contact', icon: Phone },
  ];

  if (isAdmin) {
    navItems.push({ label: 'Admin', value: 'admin', icon: Shield });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-center h-24">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setCurrentPage('home')}
          >
            <span className="text-[20px] font-black tracking-[2px] uppercase">
              DAILY<span className="text-primary">AUTOS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setCurrentPage(item.value)}
                className={`text-[12px] font-bold uppercase tracking-[1px] transition-colors hover:text-white ${
                  currentPage === item.value ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => setCurrentPage('import')}
              className="btn-premium bg-primary hover:bg-primary/90 text-background"
            >
              Get Your Car
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/70 hover:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setCurrentPage(item.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full px-4 py-4 text-lg font-medium rounded-2xl transition-colors ${
                    currentPage === item.value 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
              <div className="pt-4 px-4">
                <Button 
                  onClick={() => {
                    setCurrentPage('import');
                    setIsOpen(false);
                  }}
                  className="w-full py-6 rounded-2xl text-lg font-bold"
                >
                  Get Your Car
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
