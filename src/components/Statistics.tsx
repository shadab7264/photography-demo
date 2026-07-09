import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from './ui/Section'
import { stats } from '../data'

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const t = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(t)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(t)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Statistics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section bg="bg-dark">
      <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center text-center"
          >
            <p className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-3">
              <AnimatedCounter target={stat.number} suffix={stat.suffix} />
            </p>
            <div className="w-8 h-[1px] bg-gold/50 mb-4" />
            <p className="font-manrope text-[11px] tracking-[0.3em] uppercase text-white/40">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
