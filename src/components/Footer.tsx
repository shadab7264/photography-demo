import { motion } from 'framer-motion'
import { Camera, Video, Globe, Phone, Mail } from 'lucide-react'
import { navLinks } from '../data'

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-dark border-t border-white/5 py-[100px] md:py-[130px]">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-32">
        {/* Large statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <h2 className="font-playfair italic text-3xl md:text-5xl lg:text-6xl text-white/90 leading-tight">
            Capturing Memories Forever.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16 pb-16">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-xl text-white tracking-[0.2em] mb-3">
              ABHINAV SONI
            </h3>
            <p className="font-cormorant italic text-white/40 text-base mb-4">Photography</p>
            <p className="font-manrope text-white/30 text-xs leading-relaxed max-w-xs">
              Luxury wedding photography capturing timeless stories of love across India's finest
              destinations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-manrope text-[11px] tracking-[0.2em] uppercase text-white/40 mb-6">
              Navigation
            </p>
            <nav className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-manrope text-sm text-white/50 hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="font-manrope text-[11px] tracking-[0.2em] uppercase text-white/40 mb-6">
              Connect
            </p>
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-white/50 hover:text-gold transition-colors"
              >
                <Phone size={14} />
                <span className="font-manrope text-sm">+91 98765 43210</span>
              </a>
              <a
                href="mailto:hello@abhinavsoni.com"
                className="flex items-center gap-3 text-white/50 hover:text-gold transition-colors"
              >
                <Mail size={14} />
                <span className="font-manrope text-sm">hello@abhinavsoni.com</span>
              </a>
            </div>
            <div className="flex gap-3 mt-6">
              {[Camera, Video, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-manrope text-xs text-white/20">
            © 2025 Abhinav Soni Photography. All rights reserved.
          </p>
          <p className="font-manrope text-xs text-white/20">
            Crafted with passion for visual storytelling.
          </p>
        </div>
      </div>
    </footer>
  )
}
