import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Shared section primitive — enforces a single, consistent layout grid
 * across the whole site:
 *   max content width : 1400px
 *   horizontal padding : 1.5rem (mobile) / 4rem (tablet) / 8rem (desktop)
 *   vertical spacing   : ~120–180px
 */
interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  /** background utility class, e.g. "bg-cream" */
  bg?: string
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = '', bg = 'bg-cream' }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={`w-full overflow-hidden ${bg} py-[120px] md:py-[150px] lg:py-[180px] ${className}`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-32">
          {children}
        </div>
      </section>
    )
  }
)

Section.displayName = 'Section'

/**
 * Consistent section header: label + heading + optional description.
 * Identical spacing rhythm everywhere.
 */
interface SectionHeaderProps {
  label: string
  heading: ReactNode
  description?: string
  align?: 'center' | 'left'
  light?: boolean
  className?: string
}

export function SectionHeader({
  label,
  heading,
  description,
  align = 'center',
  light = false,
  className = '',
}: SectionHeaderProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const isCenter = align === 'center'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="w-10 h-[1px] bg-gold" />
        <p className="font-manrope text-gold text-xs tracking-[0.35em] uppercase">
          {label}
        </p>
        {isCenter && <span className="w-10 h-[1px] bg-gold" />}
      </div>
      <h2
        className={`font-playfair text-4xl md:text-5xl lg:text-6xl leading-[1.08] ${
          light ? 'text-white' : 'text-dark'
        }`}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={`font-cormorant italic text-lg md:text-2xl mt-6 max-w-[700px] leading-relaxed ${
            light ? 'text-white/50' : 'text-secondary/70'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
