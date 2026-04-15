import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { MessageCircle, Mail, Instagram, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">
                GET IN <span className="text-primary">TOUCH</span>
              </h1>
              <p className="text-xl text-white/50 mb-12 max-w-md">
                Have questions about importing an EV or joining our dealer network? Our team is here to help.
              </p>

              <div className="space-y-8 mb-12">
                <a href="https://wa.me/2348104456646" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                    <MessageCircle className="text-[#25D366]" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">WhatsApp</h3>
                    <p className="text-white/40 text-sm">Instant support: +234 810 445 6646</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Email</h3>
                    <p className="text-white/40 text-sm">General inquiries: hello@dailyautos.ng</p>
                  </div>
                </div>

                <a href="https://instagram.com/dail.yautos" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                    <Instagram className="text-pink-500" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Instagram</h3>
                    <p className="text-white/40 text-sm">Follow us: @dail.yautos</p>
                  </div>
                </a>
              </div>

              <div className="p-8 glass rounded-[2.5rem] border-white/5">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">Our Office</h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      123 Luxury Way, Victoria Island,<br />
                      Lagos, Nigeria.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-10 md:p-14 rounded-[3rem] border-white/5"
          >
            <h3 className="text-3xl font-bold mb-8">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-white/70 ml-1">Your Name</Label>
                <Input id="contact-name" placeholder="John Doe" className="bg-white/5 border-white/10 rounded-2xl h-14" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-white/70 ml-1">Email Address</Label>
                <Input id="contact-email" type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 rounded-2xl h-14" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white/70 ml-1">Subject</Label>
                <Input id="subject" placeholder="How can we help?" className="bg-white/5 border-white/10 rounded-2xl h-14" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/70 ml-1">Message</Label>
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder="Tell us more about your request..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <Button className="w-full py-8 rounded-2xl text-xl font-bold bg-primary hover:bg-primary/90 mt-4">
                <Send className="mr-2" size={20} /> Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
