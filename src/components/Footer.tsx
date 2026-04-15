import { Page } from '../types';
import { Zap, Instagram, Mail, Phone, MapPin, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="text-white fill-white" size={18} />
              </div>
              <span className="text-xl font-extrabold tracking-tighter font-display">
                DAILY<span className="text-primary">AUTOS</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Nigeria's premium destination for high-end vehicle imports. Specializing in Electric Vehicles from China, USA, and Dubai.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/dail.yautos" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-primary/20 rounded-full transition-colors">
                <Instagram size={18} className="text-white/70" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-primary/20 rounded-full transition-colors">
                <Twitter size={18} className="text-white/70" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-primary/20 rounded-full transition-colors">
                <Facebook size={18} className="text-white/70" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Browse Cars', 'Import Request', 'Referral Program', 'Dealers'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const linkLower = link.toLowerCase();
                      if (linkLower.includes('home')) setCurrentPage('home');
                      else if (linkLower.includes('browse')) setCurrentPage('browse');
                      else if (linkLower.includes('import')) setCurrentPage('import');
                      else if (linkLower.includes('referral')) setCurrentPage('referral');
                      else if (linkLower.includes('dealer')) setCurrentPage('dealer');
                    }}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <span>hello@dailyautos.ng</span>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+234 810 445 6646</span>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Newsletter</h4>
            <p className="text-white/50 text-sm">Get the latest EV deals and import news.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-xs">
          <p>© {currentYear} DailyAutos Nigeria. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
