import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { heroSlides } from '../data'

const SLIDE_DURATION = 5000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLElement>(null)

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const imgX = useTransform(springX, [-0.5, 0.5], [-25, 25])
  const imgY = useTransform(springY, [-0.5, 0.5], [-25, 25])
  const textX = useTransform(springX, [-0.5, 0.5], [12, -12])
  const textY = useTransform(springY, [-0.5, 0.5], [8, -8])

  const goTo = useCallback((index: number) => {
    setCurrent(((index % heroSlides.length) + heroSlides.length) % heroSlides.length)
  }, [])

  const next = useCallback(() => setCurrent((p) => (p + 1) % heroSlides.length), [])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length), [])

  // Auto-advance
  useEffect(() => {
    const timer = setTimeout(next, SLIDE_DURATION)
    return () => clearTimeout(timer)
  }, [current, next])

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  // Swipe
  useEffect(() => {
    let startX = 0
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 60) diff > 0 ? next() : prev()
    }
    window.addEventListener('touchstart', onStart)
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [next, prev])

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window
    mouseX.set(e.clientX / innerWidth - 0.5)
    mouseY.set(e.clientY / innerHeight - 0.5)
  }

  const slide = heroSlides[current]

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-dark"
    >
      {/* Image layer with parallax + Ken Burns */}
      <motion.div style={{ x: imgX, y: imgY }} className="absolute inset-[-4%]">
        <AnimatePresence>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 2, ease: 'linear' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      <div className="vignette" />
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top meta bar */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-28 md:pt-32 px-8 md:px-16">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2 }}
            className="hidden md:block"
          >
            <p className="font-manrope text-[10px] tracking-[0.4em] uppercase text-white/40">
              Fine Art Wedding Photography
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.4 }}
            className="hidden md:block"
          >
            <p className="font-manrope text-[10px] tracking-[0.4em] uppercase text-white/40">
              Est. 2010 · India
            </p>
          </motion.div>
        </div>
      </div>

      {/* Center content */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Slide meta */}
        <div className="h-8 mb-6 md:mb-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-gold/60" />
              <p className="font-cormorant text-white/70 text-base md:text-lg italic tracking-wide whitespace-nowrap">
                {slide.couple} · {slide.location} · {slide.year}
              </p>
              <span className="w-8 h-[1px] bg-gold/60" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main heading */}
        <h1 className="font-playfair text-white leading-[0.95] overflow-hidden">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, delay: 3, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[15vw] md:text-[11vw] lg:text-[9.5vw] tracking-[0.02em] font-medium"
            >
              ABHINAV SONI
            </motion.span>
          </span>
        </h1>

        <div className="overflow-hidden mt-1">
          <motion.p
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 3.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic text-white/85 text-3xl md:text-5xl lg:text-6xl tracking-wide"
          >
            Photography
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent my-5 md:my-7"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4 }}
          className="font-manrope text-white/55 text-sm md:text-base tracking-[0.15em] max-w-md leading-relaxed"
        >
          Capturing timeless stories with elegance and emotion.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.9 }}
          className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 mt-8 md:mt-12"
        >
          {/* Explore Weddings — gold button, turns white on hover */}
          <a
            href="#weddings"
            className="group relative min-w-[220px] h-14 flex items-center justify-center overflow-hidden rounded-full bg-gold hover:bg-white shadow-lg shadow-black/25 transition-colors duration-500"
          >
            <span className="relative flex items-center gap-3 font-manrope text-[11px] tracking-[0.3em] uppercase text-white group-hover:text-dark transition-colors duration-500">
              Explore Weddings
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-400" />
            </span>
          </a>

          {/* Book Your Date — white button, turns gold on hover */}
          <a
            href="#contact"
            className="group relative min-w-[220px] h-14 flex items-center justify-center overflow-hidden rounded-full bg-white hover:bg-gold shadow-lg shadow-black/25 transition-colors duration-500"
          >
            <span className="relative flex items-center gap-3 font-manrope text-[11px] tracking-[0.3em] uppercase text-dark group-hover:text-white transition-colors duration-500">
              Book Your Date
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-400" />
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Navigation arrows — premium glass circles */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 4.5 }}
        onClick={prev}
        className="group absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md hover:border-gold/70 hover:bg-white/[0.07] transition-all duration-500"
        aria-label="Previous slide"
      >
        <span className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/10 blur-md transition-all duration-500" />
        <ArrowLeft size={20} className="relative text-white/80 group-hover:text-gold group-hover:-translate-x-0.5 transition-all duration-400" />
      </motion.button>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 4.5 }}
        onClick={next}
        className="group absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md hover:border-gold/70 hover:bg-white/[0.07] transition-all duration-500"
        aria-label="Next slide"
      >
        <span className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/10 blur-md transition-all duration-500" />
        <ArrowRight size={20} className="relative text-white/80 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-400" />
      </motion.button>

      {/* Bottom progress bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4.6 }}
        className="absolute bottom-8 md:bottom-10 left-0 right-0 z-20 px-8 md:px-16"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-playfair text-white/70 text-sm tabular-nums">
            {String(current + 1).padStart(2, '0')}
          </span>
          <span className="font-manrope text-white/30 text-[10px] tracking-[0.3em] uppercase hidden md:block">
            Real Weddings
          </span>
          <span className="font-playfair text-white/30 text-sm tabular-nums">
            {String(heroSlides.length).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative flex-1 h-[2px] bg-white/15 overflow-hidden cursor-pointer"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/30 transition-colors" />
              {i < current && <span className="absolute inset-0 bg-white/40" />}
              {i === current && (
                <motion.span
                  key={`fill-${current}`}
                  className="absolute inset-0 bg-gold origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
