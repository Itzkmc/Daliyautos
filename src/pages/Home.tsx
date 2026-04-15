import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { FEATURED_CARS as FALLBACK_CARS } from '../constants';
import { Zap, Globe, ShieldCheck, ArrowRight, CheckCircle2, MessageCircle, Search, Users, Car as CarIcon } from 'lucide-react';
import { Page, Car } from '../types';
import { useState, useEffect } from 'react';
import { collection, query, limit, onSnapshot, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'cars'), orderBy('updatedAt', 'desc'), limit(4));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Car[];
      setFeaturedCars(carsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'cars');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayCars = featuredCars.length > 0 ? featuredCars : FALLBACK_CARS;
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-[420px_1fr] border-b border-white/10">
        <div className="p-10 md:p-16 border-r border-white/10 flex flex-col justify-between bg-zinc-950 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">Specializing in EVs</span>
            <h1 className="text-[48px] md:text-[72px] font-black tracking-[-0.05em] mb-6 leading-[0.9] uppercase">
              IMPORT<br />INTO<br /><span className="text-primary">NIGERIA</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-10 max-w-[320px] leading-relaxed">
              Verify, ship, and deliver electric and petrol vehicles from China, USA & Dubai with 100% transparency.
            </p>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => setCurrentPage('browse')}
                className="btn-premium bg-primary hover:bg-primary/90 text-background w-full"
              >
                Find My Car
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage('dealer')}
                className="btn-premium border-white/10 hover:bg-white/5 w-full"
              >
                Dealer Portal
              </Button>
            </div>
          </motion.div>

          <div className="mt-12">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">TRUSTED BY OVER 250+ NIGERIAN OWNERS</p>
            <div className="flex gap-4">
              <div className="border border-white/20 px-2 py-1 text-[9px] font-bold uppercase text-white/80">Verified Dealer</div>
              <div className="border border-white/20 px-2 py-1 text-[9px] font-bold uppercase text-white/80">Secure Process</div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden h-[40vh] lg:h-auto order-1 lg:order-2">
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000" 
            alt="Tesla Model S" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 to-transparent" />
        </div>
      </section>

      {/* Dealer Section (New) */}
      <section className="py-24 px-10 border-b border-white/10 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">For Dealerships</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                LIST YOUR CARS ON <span className="text-primary">DAILYAUTOS</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg">
                Are you a car dealer in Nigeria? Reach thousands of verified buyers looking for premium imports. List your inventory and grow your business today.
              </p>
              <Button 
                onClick={() => setCurrentPage('dealer')}
                className="btn-premium bg-primary hover:bg-primary/90 text-background"
              >
                Register as a Dealer
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 border border-white/10 bg-black/40 rounded-xl">
                <Users className="text-primary mb-4" size={24} />
                <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Reach Buyers</h4>
                <p className="text-[10px] text-muted-foreground">Direct access to high-intent premium car buyers.</p>
              </div>
              <div className="p-8 border border-white/10 bg-black/40 rounded-xl">
                <ShieldCheck className="text-primary mb-4" size={24} />
                <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Build Trust</h4>
                <p className="text-[10px] text-muted-foreground">Verified dealer badge to boost your credibility.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="section-label">Process</span>
            <h2 className="text-4xl font-black uppercase tracking-tighter">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            {[
              { title: 'Find', desc: 'Browse our verified listings or request a custom import from global markets.', icon: Search },
              { title: 'Verify', desc: 'Our experts inspect and verify the vehicle condition and history for you.', icon: ShieldCheck },
              { title: 'Deliver', desc: 'We handle shipping, clearing, and delivery to your doorstep in Nigeria.', icon: Globe },
            ].map((step, i) => (
              <div key={i} className={`p-12 border-white/10 ${i !== 2 ? 'md:border-r' : ''} hover:bg-white/5 transition-colors`}>
                <div className="text-primary mb-6">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Markets */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Sourcing From The <br />
                <span className="text-primary">Best Markets</span>
              </h2>
              <div className="space-y-6">
                {[
                  { name: 'China', desc: 'The global leader in EV technology and affordable luxury.' },
                  { name: 'USA', desc: 'Premium specs, clean titles, and high-performance models.' },
                  { name: 'Dubai', desc: 'Fast shipping and luxury petrol vehicles at great prices.' },
                ].map((market) => (
                  <div key={market.name} className="flex gap-4 p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Globe className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{market.name}</h4>
                      <p className="text-white/50 text-sm">{market.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover"
                  alt="Global Shipping"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 glass p-8 rounded-3xl max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span className="font-bold">Verified Process</span>
                </div>
                <p className="text-xs text-white/60">Every car undergoes a 150-point inspection before shipping.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Listings</h2>
              <p className="text-white/50">Hand-picked premium vehicles ready for import.</p>
            </div>
            <Button 
              onClick={() => setCurrentPage('browse')}
              variant="ghost" 
              className="text-primary font-bold hover:text-primary/80"
            >
              View All Cars <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCars.map((car) => (
              <div key={car.id} className="group glass rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      car.type === 'EV' ? 'bg-primary text-primary-foreground' : 'bg-white/20 text-white backdrop-blur-md'
                    }`}>
                      {car.type === 'EV' ? '⚡ Electric' : '⛽ Petrol'}
                    </span>
                    {car.isVerified && (
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <span className="text-xs text-white/40">{car.year}</span>
                  </div>
                  <p className="text-primary font-bold text-lg mb-4 uppercase tracking-tighter">Inquire for Price</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-white/50">Dealer: {car.dealerName}</span>
                    <Button size="sm" variant="ghost" className="p-0 h-auto text-primary hover:bg-transparent">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
          <h2 className="text-4xl md:text-6xl font-black mb-8">READY TO START <br />YOUR JOURNEY?</h2>
          <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto">
            Whether you're looking for a Tesla, BYD, or a classic Lexus, we've got you covered. Join the future of mobility in Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => setCurrentPage('import')}
              size="lg" 
              className="w-full sm:w-auto rounded-full px-12 py-8 text-xl font-bold bg-primary hover:bg-primary/90"
            >
              Request Import
            </Button>
            <Button 
              onClick={() => setCurrentPage('referral')}
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto rounded-full px-12 py-8 text-xl font-bold glass border-white/10"
            >
              Earn Commission
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


