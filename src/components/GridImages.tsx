import { FaWhatsapp } from "react-icons/fa6";
import { motion , AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, CirclePause, CirclePlay } from "lucide-react"
import { useState, useEffect, useRef } from "react"

function useMediaQueries() {
  const [screenSize, setScreenSize] = useState(0)
  

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize(window.innerWidth)
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)

    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  return screenSize
}
// Animation variants
const containerObserverAnimation = {
  offscreen: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
}

const appearTop = {
  offscreen: { opacity: 0, y: -20 },
  onscreen: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const appear = {
  offscreen: { opacity: 0 },
  onscreen: { opacity: 1, transition: { duration: 0.6 } },
}

const gridImage = {
  offscreen: { x: 0 },
  onscreen: { x: "100%", transition: { duration: 0.8, ease: "easeInOut" } },
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

export function GridImages() {
  const mq = useMediaQueries();
  const mqs = { sm: 640 }
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // All 5 slides data
  const slidesData = [
    {
      title: "Trabajamos para resaltar tu belleza",
      images: [
        {
          alt: "Ondas",
          className: "relative col-start-1 col-end-2 row-start-1 row-end-3 overflow-hidden rounded-md md:row-end-4",
          src: "/ondas.webp",
        },
        {
          alt: "Brushin",
          className:
            "relative col-start-2 col-end-3 row-start-1 row-end-2 overflow-hidden rounded-md md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-4 2xl:col-start-2 2xl:col-end-3 2xl:row-start-1 2xl:row-end-2",
          src: "/brushin.webp",
        },
        {
          alt: "Manicura 1",
          className:
            "relative col-start-2 col-end-3 row-start-2 row-end-3 overflow-hidden rounded-md md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2 2xl:row-end-2",
          src: "/manicura.webp",
        },
        {
          alt: "Peinado",
          className:
            "relative col-start-3 col-end-3 row-start-1 row-end-3 overflow-hidden rounded-md md:col-start-4 md:col-end-4 md:row-start-2 md:row-end-4",
          src: "/peinado.webp",
        },
        {
          alt: "Corte de hombre",
          className:
            "relative col-start-1 col-end-3 overflow-hidden rounded-md md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-4 2xl:col-end-4 2xl:row-start-2",
          src: "/corte_hombre.webp",
        },
        {
          alt: "Manicura 2",
          className:
            "relative col-start-3 col-end-4 row-start-3 row-end-4 overflow-hidden rounded-md md:col-start-4 md:col-end-5 md:row-start-1",
          src: "/manicura_2.webp",
        },
      ],
    },
    {
      title: "¡Gracias por confiar en nosotros!",
      images: [
        {
          alt: "loreal",
          className: "relative col-start-1 col-end-2 row-start-1 row-end-3 overflow-hidden rounded-md md:row-end-4",
          src: "/loreal.webp",
        },
        {
          alt: "kerastase",
          className:
            "relative col-start-2 col-end-3 row-start-1 row-end-2 overflow-hidden rounded-md md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-4 2xl:col-start-2 2xl:col-end-3 2xl:row-start-1 2xl:row-end-2",
          src: "/sillas2.webp",
        },
        {
          alt: "sillas",
          className:
            "relative col-start-2 col-end-3 row-start-2 row-end-3 overflow-hidden rounded-md md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2 2xl:row-end-2",
          src: "/manicura_spot.webp",
        },
        {
          alt: "",
          className:
            "relative col-start-3 col-end-3 row-start-1 row-end-3 overflow-hidden rounded-md md:col-start-4 md:col-end-4 md:row-start-2 md:row-end-4",
          src: "/olaplex.webp",
        },
        {
          alt: "Corte de hombre",
          className:
            "relative col-start-1 col-end-3 overflow-hidden rounded-md md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-4 2xl:col-end-4 2xl:row-start-2",
          src: "/sillas.jpg",
        },
        {
          alt: "Manicura 2",
          className:
            "relative col-start-3 col-end-4 row-start-3 row-end-4 overflow-hidden rounded-md md:col-start-4 md:col-end-5 md:row-start-1",
          src: "/kerastase.webp",
        },
      ],
    },
  ]

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentSlide((prev) => {
      if (newDirection === 1) {
        return prev === slidesData.length - 1 ? 0 : prev + 1
      } else {
        return prev === 0 ? slidesData.length - 1 : prev - 1
      }
    })
  }

  const goToSlide = (slideIndex: number) => {
    setDirection(slideIndex > currentSlide ? 1 : -1)
    setCurrentSlide(slideIndex)
  }

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1))
      }, 4000) // Change slide every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isAutoPlaying, slidesData.length])

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section className="relative flex h-full w-full flex-col gap-10 overflow-hidden bg-white bg-gradient-to-br py-16 sm:px-6 lg:px-8 xl:gap-14">
      <motion.article
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: mq > mqs.sm ? 0.4 : 0.2, once: true }}
        variants={containerObserverAnimation}
        className="relative z-10 mx-auto flex h-auto w-full max-w-7xl flex-col gap-10 overflow-hidden px-4"
      >
        {/* Header */}
        <div className="text flex h-auto w-full flex-col items-center justify-center gap-2">
          <motion.div
            variants={appearTop}
            className="text-primary bg-secondary/60 flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2"
          >
            <Star className="size-4 min-w-4 sm:size-4 sm:min-w-4 fill-current" />
            <p className="text-xs font-semibold">Belleza y elegancia</p>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.h4
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-primary text-center text-4xl font-bold"
            >
              {slidesData[currentSlide].title}
            </motion.h4>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => paginate(-1)}
            className="rounded-full border border-primary hover:bg-secondary/60 p-2 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-primary" />
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {slidesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-primary w-6" : "bg-secondary/60 hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>
          
          <button
              onClick={toggleAutoPlay}
              className="p-1.5 transition-colors"
              title={isAutoPlaying ? "Pausar reproducción automática" : "Iniciar reproducción automática"}
            >
              {isAutoPlaying ? <CirclePause className="h-5 w-5 text-primary rounded-full hover:bg-secondary/60" /> : <CirclePlay className="h-5 w-5 text-primary rounded-full hover:bg-secondary/60" />}
            </button>
          </div>

          <button
            onClick={() => paginate(1)}
            className="rounded-full border border-primary hover:bg-secondary/60 p-2 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-primary" />
          </button>
        </div>

      {/* Grid Content */}
        <motion.ul className="grid h-full max-h-[26rem] w-full grid-cols-3 grid-rows-3 gap-2 md:grid-cols-4 md:grid-rows-3 2xl:max-h-[40rem]">
          <AnimatePresence initial={false} custom={direction}>
            {slidesData[currentSlide].images?.map((image, index) => (
              <motion.li
                key={image?.src + index} // Use a unique key for each image
                className={`${image?.className}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <img
                  alt={image?.alt}
                  className="h-full w-full rounded-md object-cover"
                  src={image?.src}
                />
                <motion.div
                  variants={gridImage}
                  initial="offscreen" // Ensure the animation starts from offscreen for each new image
                  animate="onscreen" // Animate to onscreen for each new image
                  transition={{
                    translateX: { duration: 0.8, ease: "easeInOut", delay: 0.3 },
                  }}
                  className="bg-primary absolute top-0 left-0 h-full w-full rounded-md"
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </motion.article>

      {/* Request a turn */}
      <motion.article
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: mq > mqs.sm ? 1 : 0.2, once: true }}
        variants={containerObserverAnimation}
        className="text mx-auto flex h-auto w-full max-w-7xl flex-col items-center justify-center gap-6 overflow-hidden px-4"
      >
        <div className="relative flex flex-col items-center gap-4">
          <div className="flex items-center gap-8">
            <div className="hidden flex-col items-center gap-2 md:flex">
              <div className="flex gap-2">
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              </div>
              <div className="flex gap-2">
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              </div>
              <div className="flex gap-2">
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              </div>
            </div>
            <motion.h4
              variants={appearTop}
              className="text-primary px-2 text-center text-3xl font-bold text-pretty"
            >
              No pierdas tiempo ¡Reserva tu turno!
            </motion.h4>
            <div className="hidden flex-col items-center gap-2 md:flex">
              <div className="flex gap-2">
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              </div>
              <div className="flex gap-2">
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              </div>
              <div className="flex gap-2">
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 h-1 w-1 rounded-sm" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
                <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              </div>
            </div>
          </div>
          <motion.p
            variants={appear}
            className="text-primary/70 text-center font-medium"
          >
            Envianos un mensaje para más información
          </motion.p>
          <div className="absolute top-10 -left-8 flex h-16 w-auto -translate-x-full -translate-y-1/2 flex-col items-center gap-1"></div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center gap-2 md:hidden">
            <div className="flex gap-2">
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
            </div>
            <div className="flex gap-2">
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
            </div>
            <div className="flex gap-2">
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
            </div>
          </div>
          <motion.div
            variants={appear}
            className="relative cursor-pointer !transition-none"
          >
            <a
              className="bg-primary hover:bg-primary/90 relative flex w-full items-center gap-2 rounded-full px-4 py-2 shadow-2xl transition-colors"
              target="_blank"
              href="https://api.whatsapp.com/send?phone=541127210827"
            >
              <FaWhatsapp className="size-5 min-w-5 text-white" />
              <p className="text-xs font-medium tracking-wide text-white">
                Solicitar turno
              </p>
            </a>
          </motion.div>
          <div className="flex flex-col items-center gap-2 md:hidden">
            <div className="flex gap-2">
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
            </div>
            <div className="flex gap-2">
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
            </div>
            <div className="flex gap-2">
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 h-1 w-1 rounded-sm" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
              <div className="bg-primary/20 hidden h-1 w-1 rounded-sm md:inline-block" />
            </div>
          </div>
        </div>
      </motion.article>
    </section>
  )
}

