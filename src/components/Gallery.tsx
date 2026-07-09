import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Section, SectionHeader } from './ui/Section'
import { galleries } from '../data'

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <Section id="weddings" bg="bg-beige">
      <SectionHeader
        label="Real Weddings"
        heading="Timeless Love Stories"
        description="A curated collection of unforgettable celebrations, captured as fine art."
      />

      {/* Masonry */}
      <div ref={ref} className="mt-20 md:mt-28 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {galleries.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease: [0.76, 0, 0.24, 1] }}
            onClick={() => setSelected(item.id)}
            className="group relative mb-6 break-inside-avoid overflow-hidden cursor-pointer"
          >
            <div
              className={`overflow-hidden ${
                item.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={item.image}
                alt={item.couple}
                className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.06]"
              />
            </div>

            {/* Hover reveal */}
            <div className="absolute inset-0 flex items-end p-7 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-playfair text-2xl text-white">{item.couple}</h3>
                <p className="font-manrope text-white/70 text-xs tracking-[0.15em] uppercase mt-2">
                  {item.location}
                </p>
                <p className="font-manrope text-gold text-[11px] tracking-[0.25em] uppercase mt-4">
                  View Story
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.img
              key={selected}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              src={galleries.find((g) => g.id === selected)?.image}
              alt=""
              className="max-w-full max-h-[85vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
