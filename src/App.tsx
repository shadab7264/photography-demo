import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhoAmI from './components/WhoAmI'
import Services from './components/Services'
import Gallery from './components/Gallery'
import VideoGallery from './components/VideoGallery'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import Statistics from './components/Statistics'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="film-grain" />
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Navbar />
        <Hero />
        <About />
        <WhoAmI />
        <Services />
        <Gallery />
        <VideoGallery />
        <Team />
        <Testimonials />
        <Statistics />
        <Contact />
        <Footer />
      </motion.div>
    </>
  )
}

export default App
