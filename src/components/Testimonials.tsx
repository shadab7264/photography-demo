import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from './ui/Section'
import { testimonials } from '../data'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <Section bg="bg-beige">
      <div className="flex flex-col items-center text-center max-w-[900px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-10 h-[1px] bg-gold" />
          <p className="font-manrope text-gold text-xs tracking-[0.35em] uppercase">
            Kind Words
          </p>
          <span className="w-10 h-[1px] bg-gold" />
        </div>

        <div className="relative w-full min-h-[320px] flex items-center justify-center">
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 font-playfair text-[140px] md:text-[200px] leading-none text-gold/10 select-none pointer-events-none">
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="relative"
            >
              <p className="font-cormorant italic text-2xl md:text-3xl lg:text-4xl text-dark/80 leading-relaxed mb-10">
                {testimonials[current].text}
              </p>
              <div className="flex flex-col items-center gap-3">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <p className="font-playfair text-base text-dark">
                  {testimonials[current].name}
                </p>
                <p className="font-manrope text-[11px] text-secondary/50 tracking-[0.15em] uppercase">
                  {testimonials[current].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === current ? 'bg-gold w-8' : 'bg-dark/20 w-3'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
