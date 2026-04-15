import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { motion } from 'motion/react';
import { ShieldCheck, Globe, Zap, CheckCircle2 } from 'lucide-react';

export default function ImportRequest() {
  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9]">
                REQUEST YOUR <br />
                <span className="text-primary">DREAM CAR</span>
              </h1>
              <p className="text-lg text-white/50 mb-12 max-w-md">
                Can't find what you're looking for? Tell us your preferences and our global sourcing team will find the perfect match for you.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'Global Sourcing', desc: 'Access to auctions and dealers in China, USA, and Dubai.', icon: Globe },
                  { title: 'Full Inspection', desc: 'Detailed condition reports and video walkarounds.', icon: ShieldCheck },
                  { title: 'EV Experts', desc: 'Specialized battery health checks for all electric imports.', icon: Zap },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <item.icon className="text-primary" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 glass rounded-[2rem] border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-white/70">Joined by 500+ happy importers this month</p>
                </div>
                <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                  <CheckCircle2 size={16} />
                  <span>98% Success Rate in Custom Sourcing</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 md:p-12 rounded-[3rem] border-white/5 relative"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 blur-3xl rounded-full" />
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/70 ml-1">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="bg-white/5 border-white/10 rounded-2xl h-14" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/70 ml-1">Phone Number</Label>
                  <Input id="phone" placeholder="+234..." className="bg-white/5 border-white/10 rounded-2xl h-14" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white/70 ml-1">Car Type</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="ev">Electric (EV) ⚡</SelectItem>
                      <SelectItem value="petrol">Petrol ⛽</SelectItem>
                      <SelectItem value="hybrid">Hybrid 🔋</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-white/70 ml-1">Budget Range (₦)</Label>
                  <Input id="budget" placeholder="e.g. 30M - 45M" className="bg-white/5 border-white/10 rounded-2xl h-14" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand" className="text-white/70 ml-1">Preferred Brand & Model</Label>
                <Input id="brand" placeholder="e.g. Tesla Model 3 2023" className="bg-white/5 border-white/10 rounded-2xl h-14" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referral" className="text-white/70 ml-1">Referral Code (Optional)</Label>
                <Input id="referral" placeholder="Enter code to get discount" className="bg-white/5 border-white/10 rounded-2xl h-14" />
              </div>

              <div className="pt-4">
                <Button className="btn-premium w-full bg-primary hover:bg-primary/90 text-background">
                  Submit Request
                </Button>
                <p className="text-center text-white/50 text-[10px] uppercase tracking-widest mt-6">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
