import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, Video, Globe, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { Section } from './ui/Section'

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your full name', half: true },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Your phone number', half: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', half: false },
  { name: 'date', label: 'Wedding Date', type: 'text', placeholder: 'DD / MM / YYYY', half: true },
  { name: 'venue', label: 'Venue', type: 'text', placeholder: 'Wedding venue', half: true },
] as const

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [data, setData] = useState<Record<string, string>>({})

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData({ ...data, [e.target.name]: e.target.value })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for reaching out. We will be in touch shortly.')
  }

  return (
    <Section id="contact" bg="bg-cream">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="flex flex-col items-center text-center mb-16 md:mb-20"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="w-10 h-[1px] bg-gold" />
          <p className="font-manrope text-gold text-xs tracking-[0.35em] uppercase">
            Get In Touch
          </p>
          <span className="w-10 h-[1px] bg-gold" />
        </div>
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-dark leading-[1.1] max-w-[820px]">
          Let's Create Something
          <br />
          <span className="italic text-gold">Beautiful Together</span>
        </h2>
      </motion.div>

      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        className="grid lg:grid-cols-[1.3fr_1fr] rounded-2xl overflow-hidden shadow-2xl shadow-black/10 bg-white"
      >
        {/* Form panel */}
        <form onSubmit={submit} className="p-8 md:p-12 lg:p-14">
          <h3 className="font-playfair text-2xl text-dark mb-8">Send an Inquiry</h3>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
            {fields.map((f) => (
              <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
                <label className="font-manrope text-[11px] tracking-[0.12em] text-dark/70 uppercase block mb-2 font-medium">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  value={data[f.name] || ''}
                  onChange={handle}
                  placeholder={f.placeholder}
                  className="w-full bg-cream/60 border border-border rounded-lg px-4 py-3 font-manrope text-dark text-sm placeholder:text-secondary/40 focus:outline-none focus:border-gold focus:bg-white transition-colors"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="font-manrope text-[11px] tracking-[0.12em] text-dark/70 uppercase block mb-2 font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={data.message || ''}
                onChange={handle}
                rows={4}
                placeholder="Tell us about your wedding vision..."
                className="w-full bg-cream/60 border border-border rounded-lg px-4 py-3 font-manrope text-dark text-sm placeholder:text-secondary/40 focus:outline-none focus:border-gold focus:bg-white transition-colors resize-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group mt-8 inline-flex items-center gap-3 h-14 px-10 rounded-full bg-gold hover:bg-dark transition-colors duration-500"
          >
            <span className="font-manrope text-[11px] tracking-[0.25em] uppercase text-white font-medium">
              Send Inquiry
            </span>
            <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform duration-400" />
          </button>
        </form>

        {/* Info panel — dark for contrast */}
        <div className="bg-dark p-8 md:p-12 lg:p-14 flex flex-col justify-between text-white">
          <div>
            <h3 className="font-playfair text-2xl text-white mb-8">Studio Details</h3>
            <div className="space-y-7">
              {[
                { icon: MapPin, title: 'Studio', lines: ['123 Creative Lane, Jaipur', 'Rajasthan 302001, India'] },
                { icon: Phone, title: 'Phone', lines: ['+91 98765 43210'] },
                { icon: Mail, title: 'Email', lines: ['hello@abhinavsoni.com'] },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-full border border-white/15 flex items-center justify-center">
                    <Icon size={16} className="text-gold" />
                  </span>
                  <div>
                    <p className="font-manrope text-white/90 text-sm mb-1 font-medium">{title}</p>
                    {lines.map((l) => (
                      <p key={l} className="font-manrope text-white/50 text-sm leading-relaxed">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="font-manrope text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
              Follow Our Journey
            </p>
            <div className="flex gap-3">
              {[Camera, Video, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold hover:bg-white/5 transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
