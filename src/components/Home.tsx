import "../index.css";
import { motion } from "motion/react";
import { cn, navItems } from "../utils/functions";

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

  const containerNavHeroAnimation = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const appearTop = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      id="home"
      className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-black"
    >
      <div className="absolute top-0 left-0 z-40 h-full w-full bg-black/50" />
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerImagesHeroAnimation}
        className="relative grid h-screen w-full overflow-hidden"
      >
        <div className="relative z-40 flex h-full w-full flex-col items-start justify-center gap-4 p-6 sm:justify-start sm:pt-24 md:pl-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="flex w-full flex-col gap-2 md:items-start md:justify-start"
          >
            <h1 className="text pb-2 text-center text-7xl font-semibold text-white md:text-left">
              STAFF MODERN{" "}
            </h1>
          </motion.div>

          <motion.ul
            variants={containerNavHeroAnimation}
            initial="hidden"
            animate="show"
            className="text hidden w-full flex-col items-center gap-2 sm:flex md:w-auto md:items-start"
          >
            {navItems?.map((navItem) => (
              <motion.li
                variants={appearTop}
                key={navItem?.id}
                className={cn("cursor-pointer", navItem?.id === 1 && "hidden")}
              >
                <a
                  target={navItem?.id !== 5 ? "_self" : "_blank"}
                  href={`${navItem?.href}`}
                >
                  <p className="font-light text-white transition-all hover:translate-x-2 hover:font-medium hover:text-white md:text-white/70">
                    {navItem?.name}
                  </p>
                </a>
              </motion.li>
            ))}
          </motion.ul>
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
          className="background-home-1 bg-home-mobile md:bg-home-desktop absolute top-0 left-0 z-30 h-1/3 w-screen md:h-screen md:w-1/3"
        />

        <motion.div
          variants={imageHome}
          transition={{
            translateY: { duration: 0.8, ease: "linear" },
          }}
          className="background-home-2 bg-home-mobile md:bg-home-desktop absolute top-1/2 left-0 z-30 h-1/3 w-screen -translate-y-1/2 md:top-0 md:left-1/2 md:h-screen md:w-1/3 md:-translate-x-1/2 md:-translate-y-0"
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
          className="background-home-3 bg-home-mobile md:bg-home-desktop absolute right-0 bottom-0 z-30 h-1/3 w-screen md:top-0 md:h-screen md:w-1/3"
        />
      </motion.div>
    </section>
  );
}
