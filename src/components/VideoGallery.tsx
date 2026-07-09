import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'
import { Section, SectionHeader } from './ui/Section'
import { videos } from '../data'

export default function VideoGallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="videos" bg="bg-dark">
      <SectionHeader
        label="Video Gallery"
        heading="Cinematic Wedding Films"
        description="Motion pictures that bring the emotion of your day back to life."
        light
      />

      <div ref={ref} className="mt-20 md:mt-28 grid md:grid-cols-2 gap-6 lg:gap-8">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] }}
            className="group relative overflow-hidden aspect-[16/10] cursor-pointer"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-500" />
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm transition-all duration-500 group-hover:border-gold group-hover:scale-110 group-hover:bg-gold/10">
                <Play size={22} className="text-white ml-1" fill="white" />
              </div>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 inset-x-0 p-7 md:p-8 flex items-end justify-between">
              <div>
                <h3 className="font-playfair text-2xl md:text-3xl text-white mb-1">
                  {video.title}
                </h3>
                <p className="font-manrope text-white/60 text-xs tracking-[0.15em] uppercase">
                  {video.couple} · {video.location}
                </p>
              </div>
              <span className="font-manrope text-white/50 text-xs tabular-nums">
                {video.duration}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
