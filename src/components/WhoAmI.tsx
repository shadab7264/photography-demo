import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Section } from './ui/Section'

export default function WhoAmI() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const yBack = useTransform(scrollYProgress, [0, 1], [80, -80])
  const yFront = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <Section id="who" bg="bg-beige" ref={ref}>
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-[1px] bg-gold" />
            <p className="font-manrope text-gold text-xs tracking-[0.35em] uppercase">
              Who Am I
            </p>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-dark leading-[1.08] mb-8">
            A Visual
            <br />
            <span className="italic text-gold">Storyteller</span>
          </h2>
          <div className="space-y-6 font-manrope text-secondary/75 text-[15px] leading-[1.9] max-w-[560px]">
            <p>
              I don't take photographs. I create windows into moments that will never exist
              again — preserving the laughter, the tears, and the unspoken promises between two
              hearts.
            </p>
            <p>
              I am a chronicler of human connection. My camera is not a tool — it is an
              extension of my consciousness, trained to perceive beauty in the fleeting, the
              subtle, the sacred.
            </p>
          </div>
          <p className="font-cormorant italic text-2xl text-dark/80 mt-10 leading-snug max-w-[520px]">
            "The best photograph is one that makes you feel something you cannot name."
          </p>
        </motion.div>

        {/* Layered photography side */}
        <div className="relative h-[520px] md:h-[620px]">
          <motion.div
            style={{ y: yBack }}
            className="absolute top-0 right-0 w-[70%] aspect-[4/5] overflow-hidden"
          >
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
              src="https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80"
              alt="Wedding portrait"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: yFront }}
            className="absolute bottom-0 left-0 w-[55%] aspect-[3/4] overflow-hidden shadow-2xl shadow-black/20"
          >
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              src="https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=800&q=80"
              alt="Wedding moment"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* thin frame accent */}
          <div className="absolute top-6 right-6 w-24 h-24 border-t border-r border-gold/40" />
        </div>
      </div>
    </Section>
  )
}
