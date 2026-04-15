import { motion } from 'motion/react';
import { REFERRAL_LEVELS } from '../constants';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Trophy, Users, Wallet, ArrowRight, CheckCircle2, Star } from 'lucide-react';

export default function ReferralProgram() {
  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-primary/20">
              <Trophy className="text-primary" size={16} />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Earn While You Share</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
              REFER & <span className="text-primary">EARN</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Join the DailyAutos Referral Program. Earn premium commissions per deal by referring buyers to our premium car import service.
            </p>
          </motion.div>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
          {REFERRAL_LEVELS.map((level, i) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden bg-white/5 border p-3 rounded-lg flex flex-col h-full group transition-all ${
                level.name === 'Bronze' ? 'border-primary bg-primary/5' : 'border-white/10'
              }`}
            >
              <div className="text-2xl mb-2">{level.icon}</div>
              <h3 className="text-[10px] font-black mb-1 uppercase tracking-widest text-muted-foreground">{level.name}</h3>
              
              <div className="mb-4">
                <p className="text-[12px] font-black text-white">Inquire for Details</p>
              </div>

              <div className="space-y-2 mt-auto">
                {level.benefits.map((benefit, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={10} />
                    <span className="text-[9px] text-muted-foreground leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div className="p-10 md:p-16 border border-white/10 bg-zinc-950">
            <span className="section-label">Gamified Referral Program</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">How It Works</h2>
            <div className="space-y-10">
              {[
                { title: 'Sign Up', desc: 'Register for the referral program and get your unique referral code.', icon: Users },
                { title: 'Refer Buyers', desc: 'Share your code with friends, family, or your social media audience.', icon: Star },
                { title: 'Earn Commission', desc: 'Once the deal is closed and the car is delivered, you get paid instantly.', icon: Wallet },
              ].map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                    <step.icon className="text-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 md:p-14 border border-white/10 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Join the Program</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="ref-name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                <Input id="ref-name" placeholder="John Doe" className="bg-white/5 border-white/10 rounded-sm h-14" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ref-email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                <Input id="ref-email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 rounded-sm h-14" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ref-phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number (WhatsApp)</Label>
                <Input id="ref-phone" placeholder="+234..." className="bg-white/5 border-white/10 rounded-sm h-14" />
              </div>
              <Button className="btn-premium w-full bg-primary hover:bg-primary/90 text-background mt-4">
                Become a Referrer
              </Button>
            </form>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="glass p-10 md:p-16 rounded-[3rem] border-white/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -z-10" />
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl md:text-5xl font-bold">Top Referrers</h2>
            <div className="px-6 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm">
              This Month's Leaderboard
            </div>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Olawale J.', deals: 12, earned: '₦5.4M', level: 'Platinum' },
              { name: 'Chidi E.', deals: 8, earned: '₦2.8M', level: 'Gold' },
              { name: 'Amina K.', deals: 5, earned: '₦1.2M', level: 'Silver' },
              { name: 'Tunde B.', deals: 3, earned: '₦550k', level: 'Bronze' },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-black text-white/40 w-8">0{i + 1}</span>
                  <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt={user.name} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{user.name}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      user.level === 'Platinum' ? 'bg-cyan-500/20 text-cyan-400' : 
                      user.level === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                      user.level === 'Silver' ? 'bg-slate-500/20 text-slate-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {user.level}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-primary font-black text-xl">Top Referrer</p>
                  <p className="text-xs text-white/60">{user.deals} Deals Closed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
