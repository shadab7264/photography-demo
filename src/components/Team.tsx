import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, SectionHeader } from './ui/Section'
import { team } from '../data'

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="team" bg="bg-cream">
      <SectionHeader
        label="Meet the Team"
        heading="The Artisans"
        description="A collective of passionate artists devoted to visual excellence."
      />

      <div ref={ref} className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] }}
            className="group"
          >
            <div className="relative overflow-hidden aspect-[3/4] mb-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <h3 className="font-playfair text-xl text-dark">{member.name}</h3>
            <p className="font-manrope text-[11px] text-gold tracking-[0.2em] uppercase mt-2">
              {member.role}
            </p>
            <p className="font-cormorant italic text-secondary/60 text-base leading-relaxed mt-4">
              "{member.quote}"
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
