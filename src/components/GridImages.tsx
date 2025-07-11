import { motion } from "motion/react";
import { BsStars } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";
import {
  appear,
  appearTop,
  containerObserverAnimation,
  gridImage,
} from "../utils/animations";
import { mqs, useMediaQueries } from "../utils/functions";
export function GridImages() {
  const mq = useMediaQueries();

  const imagesGrid = [
    {
      alt: "Ondas",
      className:
        "relative col-start-1 col-end-2 row-start-1 row-end-3 overflow-hidden rounded-md md:row-end-4",
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
  ];

  return (
    <section className="relative flex h-full w-full flex-col gap-10 overflow-hidden bg-white bg-gradient-to-br py-16 sm:px-6 lg:px-8 xl:gap-14">
      {/* Grid images */}
      <motion.article
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: mq > mqs.sm ? 0.4 : 0.2, once: true }}
        variants={containerObserverAnimation}
        className="relative z-10 mx-auto flex h-auto w-full max-w-7xl flex-col gap-10 overflow-hidden px-4"
      >
        <div className="text flex h-auto w-full flex-col items-center justify-center gap-2">
          <motion.div
            variants={appearTop}
            className="text-primary bg-secondary/60 flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2"
          >
            <BsStars className="size-4 min-w-4 sm:size-4 sm:min-w-4" />
            <p className="text-xs font-semibold">Belleza y elegancia</p>
          </motion.div>
          <motion.h4
            variants={appearTop}
            className="text-primary text-center text-4xl font-bold text-pretty"
          >
            Trabajamos para resaltar tu belleza
          </motion.h4>
        </div>

        <motion.ul
          initial="offscreen"
          whileInView="onscreen"
          viewport={{
            amount: mq > mqs.sm ? 1 : 0.2,
            once: true,
            margin: "-50px",
          }}
          className="grid h-full max-h-[26rem] w-full grid-cols-3 grid-rows-3 gap-2 md:grid-cols-4 md:grid-rows-3 2xl:max-h-[40rem]"
        >
          {imagesGrid?.map((image) => (
            <li key={image?.src} className={`${image?.className}`}>
              <motion.img
                alt={image?.alt}
                variants={appear}
                transition={{ delay: 0.6, duration: 0.2 }}
                className="h-full w-full rounded-md object-cover"
                src={image?.src}
              />
              <motion.div
                variants={gridImage}
                transition={{
                  translateX: { duration: 0.2, ease: "linear", delay: 0.3 },
                }}
                className="bg-primary absolute top-0 left-0 h-full w-full rounded-md"
              />
            </li>
          ))}
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
  );
}
