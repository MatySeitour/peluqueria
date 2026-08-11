import "../index.css";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function Home() {
  const containerImagesHeroAnimation = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0,
      },
    },
  };

  const imageHome = {
    hidden: {
      translateY: "-100%",
    },
    show: {
      translateY: "0",
      duration: 0.8,
    },
  };

  return (
    <section
      id="home"
      className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-black"
    >
      <div className="absolute top-0 left-0 z-40 h-full w-full bg-black/55" />
      {/* HOME */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerImagesHeroAnimation}
        className="relative grid h-screen w-full overflow-hidden"
      >
        <div className="relative z-40 flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="flex w-full flex-col items-center gap-3"
          >
            <p className="font-nav text-xs font-semibold tracking-[0.3em] text-white/80 uppercase">
              Peluquería &amp; Color
            </p>
            <h1 className="font-display text-pretty text-4xl leading-tight font-semibold text-white break-words sm:text-6xl md:text-7xl lg:text-8xl">
              STAFF MODERN
            </h1>
            <Link
              to="/reservar"
              onClick={() => window.scrollTo({ top: 0 })}
              className="font-nav bg-third text-primary hover:bg-white mt-3 rounded-sm px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              Reservar turno
            </Link>
            <p className="font-nav mt-1 text-xs text-white/70">
              Lunes a sábado · 9:30 a 19:00 h
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={{
            hidden: {
              x: "-100%",
            },
            show: {
              x: "0",
            },
          }}
          transition={{
            x: { duration: 0.8, ease: "linear" },
          }}
          className="background-home-1 bg-home-mobile md:bg-home-desktop absolute top-0 left-0 z-30 h-1/3 w-screen grayscale md:h-screen md:w-1/3"
        />

        <motion.div
          variants={imageHome}
          transition={{
            translateY: { duration: 0.8, ease: "linear" },
          }}
          className="background-home-2 bg-home-mobile md:bg-home-desktop absolute top-1/2 left-0 z-30 h-1/3 w-screen -translate-y-1/2 grayscale md:top-0 md:left-1/2 md:h-screen md:w-1/3 md:-translate-x-1/2 md:-translate-y-0"
        />

        <motion.div
          variants={{
            hidden: {
              x: "100%",
            },
            show: {
              x: "0",
            },
          }}
          transition={{
            x: { duration: 0.8, ease: "linear" },
          }}
          className="background-home-3 bg-home-mobile md:bg-home-desktop absolute right-0 bottom-0 z-30 h-1/3 w-screen grayscale md:top-0 md:h-screen md:w-1/3"
        />
      </motion.div>
    </section>
  );
}
