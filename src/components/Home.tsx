import "../index.css";
import { FaRegClock } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "motion/react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BsCalendar4Week } from "react-icons/bs";
import { SocialMedia } from "./SocialMedia";

export function Home() {
  const containerImagesHeroAnimation = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageAnimation = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.5 },
        y: { duration: 0.2 },
      },
    },
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 pt-10 pb-4 min-[880px]:flex-row min-[880px]:pb-0 sm:px-10 lg:pt-16 2xl:h-screen">
      <article className="relative h-full w-full pt-16 pb-6 2xl:pt-0">
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 min-[880px]:gap-16">
          <div className="flex flex-col gap-8 min-[880px]:gap-16">
            <div className="flex h-full w-full flex-col items-center gap-8 min-[880px]:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <FaMapMarkerAlt className="size-5 min-w-5 text-slate-800" />
                <p className="font-medium text-slate-500">
                  Los Cipreses 02 - Estación Pilará
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="flex flex-col items-center justify-center gap-2 min-[880px]:items-start"
              >
                <h1 className="text pb-2 text-center text-5xl font-semibold text-slate-800 min-[880px]:text-left lg:text-6xl 2xl:text-7xl">
                  STAFF MODERN PELUQUERÍAS{" "}
                </h1>
                <div className="h-0.5 w-full max-w-xl bg-slate-800" />
                <p className="text text-sm font-bold tracking-wider text-slate-800 sm:text-lg 2xl:text-2xl">
                  MANICURA | PELUQUERÍA | DEPILACIÓN
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="flex items-center gap-6"
              >
                <a
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=541127210827&text=hola%F0%9F%91%8B%20quiero%20solicitar%20un%20turno!%20"
                  className="flex w-fit min-w-36 cursor-pointer items-center justify-center gap-2 rounded-full bg-pink-700 px-6 py-2 font-medium text-nowrap text-white transition-all hover:bg-pink-800/90 sm:text-wrap 2xl:min-w-44 2xl:px-8 2xl:py-3 2xl:text-lg"
                >
                  <BsCalendar4Week className="size-4 min-w-4 text-white 2xl:size-6 2xl:min-w-6" />
                  Solicitar turno
                </a>
                <button className="btn-gradient flex w-fit min-w-36 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2 font-medium text-nowrap text-white 2xl:min-w-44 2xl:px-8 2xl:py-3 2xl:text-lg">
                  Ver servicios
                  <span className="pt-1">
                    <IoIosArrowDown className="size-4 min-w-4 text-white 2xl:size-6 2xl:min-w-6" />
                  </span>
                </button>
              </motion.div>
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              className="flex items-center justify-center gap-4 min-[880px]:justify-start"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex w-auto items-center gap-3 font-medium"
              >
                <IoCalendarClearOutline className="text-slate-800 2xl:size-6 2xl:min-w-6" />
                <p className="text-slate-800 2xl:text-lg">Lunes a Sábados</p>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="h-5 w-0.5 bg-slate-800"
              />
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex w-auto items-center gap-3 font-medium"
              >
                <FaRegClock className="text-slate-800 2xl:size-6 2xl:min-w-6" />
                <p className="text-slate-800 2xl:text-lg">
                  9:30 a.m - 19:00 p.m
                </p>
              </motion.div>
            </motion.div>
          </div>
          <div className="hidden w-full flex-col justify-between gap-16 min-[880px]:flex 2xl:absolute 2xl:bottom-4 2xl:left-0">
            <SocialMedia />
            {/* <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              className="flex items-center gap-2"
            >
              {socialMedias.map((socialMedia) => (
                <motion.li
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { duration: 0.1 },
                    },
                  }}
                  whileHover="hovered"
                  className={cn(
                    "btn-gradient group group relative flex w-9 cursor-pointer items-center gap-2 rounded-full p-2 shadow-2xl transition-all",
                    socialMedia?.id === 3 && "hover:!w-36",
                  )}
                  key={socialMedia?.id}
                >
                  <a
                    className="relative w-full"
                    target="_blank"
                    href={socialMedia?.link}
                  >
                    <socialMedia.icon className="size-5 min-w-5 text-white" />

                    {socialMedia?.id === 3 && (
                      <p className="invisible absolute top-1/2 right-2 z-10 -translate-y-1/2 pl-4 text-xs font-medium text-nowrap text-white opacity-0 group-hover:visible group-hover:opacity-100 group-hover:transition-all group-hover:delay-300">
                        +54 11 2721-0827
                      </p>
                    )}
                  </a>
                </motion.li>
              ))}
            </motion.ul> */}
          </div>
        </div>
      </article>
      <motion.article
        variants={containerImagesHeroAnimation}
        initial="hidden"
        animate="show"
        className="relative h-full min-h-72 w-full px-4 min-[880px]:min-h-96"
      >
        {/* Fifth photo */}
        <motion.figure
          whileHover={{ scale: 1.05 }}
          variants={imageAnimation}
          className="absolute top-1/2 left-1/2 z-0 h-64 w-56 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-2 shadow-xl min-[880px]:h-80 min-[880px]:w-64 sm:h-64 sm:w-64 lg:h-96 lg:w-72 xl:w-80 2xl:top-72 2xl:z-20 2xl:h-[30rem] 2xl:w-96 2xl:-translate-y-32"
        >
          <img
            className="h-full w-full rounded-md object-cover 2xl:h-full"
            src="../../public/pos_1.webp"
          />
        </motion.figure>
        <motion.figure
          whileHover={{ scale: 1.05 }}
          variants={imageAnimation}
          className="absolute right-1/2 bottom-8 z-10 h-36 w-36 translate-x-46 rotate-6 rounded-md bg-white p-2 shadow-xl min-[880px]:right-4 min-[880px]:h-56 min-[880px]:w-40 min-[880px]:translate-x-0 sm:right-1/2 sm:h-46 sm:w-46 sm:translate-x-72 md:translate-x-56 lg:h-56 lg:w-44 xl:h-72 xl:w-52 xl:translate-x-72 2xl:h-96 2xl:w-96 2xl:translate-x-96 2xl:-translate-y-24"
        >
          <img
            className="h-full w-full rounded-md object-cover"
            src="../../public/pos_2.webp"
          />
        </motion.figure>
        <motion.figure
          whileHover={{ scale: 1.05 }}
          variants={imageAnimation}
          className="absolute bottom-8 left-1/2 z-10 h-36 w-36 -translate-x-46 -rotate-6 rounded-md bg-white p-2 shadow-xl min-[880px]:left-4 min-[880px]:h-56 min-[880px]:w-40 min-[880px]:translate-x-0 sm:left-1/2 sm:h-46 sm:w-46 sm:-translate-x-72 md:-translate-x-56 lg:h-56 xl:h-72 xl:w-52 xl:-translate-x-72 2xl:h-96 2xl:w-96 2xl:-translate-x-96 2xl:-translate-y-24"
        >
          <img
            className="h-full w-full rounded-md object-cover"
            src="../../public/pos_3.webp"
          />
        </motion.figure>
      </motion.article>
      <div className="flex w-full flex-col items-center justify-center gap-16 min-[880px]:hidden">
        <SocialMedia />
        {/* <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="flex items-center gap-2"
        >
          {socialMedias.map((socialMedia) => (
            <motion.li
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.1 },
                },
              }}
              whileHover="hovered"
              className={cn(
                "btn-gradient group group relative flex w-9 cursor-pointer items-center gap-2 rounded-full p-2 shadow-2xl transition-all",
                socialMedia?.id === 3 && "hover:!w-36",
              )}
              key={socialMedia?.id}
            >
              <a
                className="relative w-full"
                target="_blank"
                href={socialMedia?.link}
              >
                <socialMedia.icon className="size-5 min-w-5 text-white" />

                {socialMedia?.id === 3 && (
                  <p className="invisible absolute left-1/2 z-10 -translate-x-1/2 pl-4 text-xs font-medium text-nowrap text-white opacity-0 group-hover:visible group-hover:opacity-100 group-hover:transition-all group-hover:delay-300">
                    +54 11 2721-0827
                  </p>
                )}
              </a>
            </motion.li>
          ))}
        </motion.ul> */}
      </div>
    </section>
  );
}
