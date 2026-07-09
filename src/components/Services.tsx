import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, SectionHeader } from './ui/Section'
import { services } from '../data'

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="services" bg="bg-cream">
      <SectionHeader
        label="What We Do"
        heading="Luxury Services"
        description="Every service is tailored to create an extraordinary, timeless experience."
      />

      <div ref={ref} className="mt-20 md:mt-28 flex flex-col divide-y divide-border">
        {services.map((service, i) => {
          const isEven = i % 2 === 0
          return (
            <motion.a
              key={service.id}
              href="#contact"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
              className={`group relative flex flex-col md:flex-row items-center gap-8 md:gap-16 py-8 md:py-10 ${
                isEven ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Index + title */}
              <div className="flex-1 flex items-baseline gap-6 w-full">
                <span className="font-playfair text-gold/50 text-lg tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-dark leading-tight transition-colors duration-500 group-hover:text-gold">
                    {service.title}
                  </h3>
                  <p className="font-manrope text-secondary/60 text-sm leading-relaxed mt-3 max-w-md">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Reveal image on hover */}
              <div className="relative w-full md:w-[300px] lg:w-[360px] h-[220px] md:h-[200px] shrink-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-all duration-700 md:grayscale md:opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </motion.a>
          )
        })}
      </div>
    </Section>
  )
}
