import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-28 md:py-40 bg-cream overflow-hidden">
      {/* Background watermark */}
      <span className="pointer-events-none absolute top-16 right-0 font-playfair text-[22vw] leading-none text-dark/[0.025] select-none">
        Abhinav
      </span>

      <div ref={ref} className="relative max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="w-10 h-[1px] bg-gold" />
          <p className="font-manrope text-gold text-xs tracking-[0.35em] uppercase">
            About Me
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden aspect-[4/5]">
              <motion.img
                initial={{ scale: 1.15 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                src={`${import.meta.env.BASE_URL}abhinav-portrait.jpg`}
                alt="Abhinav Soni"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thin frame accent */}
            <div className="absolute -bottom-5 -left-5 w-24 h-24 border-l border-b border-gold/40 -z-0" />
            <div className="absolute -top-5 -right-5 w-24 h-24 border-t border-r border-gold/40 -z-0" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-7 lg:pl-6"
          >
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-[3.4rem] text-dark leading-[1.08] mb-3">
              Crafting Visual
            </h2>
            <p className="font-cormorant italic text-gold text-4xl md:text-5xl lg:text-6xl mb-8">
              Poetry
            </p>

            <div className="space-y-5 font-manrope text-secondary/75 text-[15px] leading-[1.85] max-w-xl">
              <p>
                For over fifteen years, I have dedicated my life to the art of wedding
                photography — not merely documenting events, but curating visual narratives
                that transcend time.
              </p>
              <p>
                Every wedding holds a universe of untold stories. In the gentle brush of a hand,
                the stolen glance across a mandap, the silent tears of a father — these are the
                moments that become eternal.
              </p>
            </div>

            {/* Signature */}
            <p className="font-cormorant italic text-2xl text-dark/70 mt-8">
              Abhinav Soni
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-12 pt-10 border-t border-border max-w-lg">
              <div>
                <p className="font-playfair text-4xl text-dark">15<span className="text-gold">+</span></p>
                <p className="font-manrope text-[11px] tracking-[0.15em] text-secondary/50 mt-2 uppercase">
                  Years
                </p>
              </div>
              <div>
                <p className="font-playfair text-4xl text-dark">600<span className="text-gold">+</span></p>
                <p className="font-manrope text-[11px] tracking-[0.15em] text-secondary/50 mt-2 uppercase">
                  Weddings
                </p>
              </div>
              <div>
                <p className="font-playfair text-4xl text-dark">40<span className="text-gold">+</span></p>
                <p className="font-manrope text-[11px] tracking-[0.15em] text-secondary/50 mt-2 uppercase">
                  Destinations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
