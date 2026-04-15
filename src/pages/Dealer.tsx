import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { motion } from 'motion/react';
import { Store, TrendingUp, ShieldCheck, Users, ArrowRight } from 'lucide-react';

export default function Dealer() {
  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
              LIST YOUR <span className="text-primary">CARS</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Join Nigeria's most trusted premium car marketplace. Reach thousands of verified buyers and grow your dealership.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: 'Reach More Buyers', desc: 'Get your inventory in front of high-intent buyers looking for premium imports.', icon: Users },
            { title: 'Trusted Platform', desc: 'Benefit from the DailyAutos brand trust and our verification system.', icon: ShieldCheck },
            { title: 'Increased Visibility', desc: 'Premium placement for your listings on our website and social media.', icon: TrendingUp },
          ].map((benefit, i) => (
            <div key={i} className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                <benefit.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-white/50 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to scale your <br />
              <span className="text-primary">Dealership?</span>
            </h2>
            
            <div className="space-y-8">
              {[
                'Zero upfront listing fees for the first 3 months',
                'Dedicated dashboard to manage your inventory',
                'Verified dealer badge to build instant trust',
                'Direct leads to your WhatsApp and Email'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                    <ArrowRight className="text-primary" size={14} />
                  </div>
                  <span className="text-lg text-white/70">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-10 md:p-14 rounded-[3rem] border-white/5">
            <h3 className="text-3xl font-bold mb-8">Dealer Registration</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="dealer-name" className="text-white/70 ml-1">Dealership Name</Label>
                <Input id="dealer-name" placeholder="e.g. Lagos Luxury Motors" className="bg-white/5 border-white/10 rounded-2xl h-14" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-person" className="text-white/70 ml-1">Contact Person</Label>
                <Input id="contact-person" placeholder="Your Name" className="bg-white/5 border-white/10 rounded-2xl h-14" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70 ml-1">Business Email</Label>
                  <Input id="email" type="email" placeholder="dealer@example.com" className="bg-white/5 border-white/10 rounded-2xl h-14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/70 ml-1">Phone Number</Label>
                  <Input id="phone" placeholder="+234..." className="bg-white/5 border-white/10 rounded-2xl h-14" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white/70 ml-1">Showroom Location</Label>
                <Input id="location" placeholder="e.g. Victoria Island, Lagos" className="bg-white/5 border-white/10 rounded-2xl h-14" />
              </div>
              <Button className="btn-premium w-full bg-primary hover:bg-primary/90 text-background mt-4">
                Register as Dealer
              </Button>
              <p className="text-center text-white/50 text-[10px] uppercase tracking-widest mt-6">
                Our team will review your application and contact you within 48 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
