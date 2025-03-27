import "../index.css";
import { FaInstagram, FaRegClock, FaWhatsapp } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { motion } from "motion/react";
import { IconType } from "react-icons";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BsCalendar4Week } from "react-icons/bs";

export function Home() {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const itemsData = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  type SocialMedia = {
    id: number;
    name: string;
    link: string;
    icon: IconType;
  };

  const socialMedias: SocialMedia[] = [
    {
      id: 1,
      name: "Tatata",
      link: "/",
      icon: FaInstagram,
    },
    {
      id: 2,
      name: "Tatata",
      link: "/",
      icon: FaWhatsapp,
    },
    {
      id: 3,
      name: "Tatata",
      link: "/",
      icon: FaPhoneAlt,
    },
  ];

  return (
    <section className="flex h-screen w-full items-center px-10 pt-16">
      <article className="relative h-full w-full pt-20 2xl:pt-0">
        <motion.div
          variants={itemVariants}
          className="flex h-full flex-col items-center justify-between gap-16 2xl:justify-center"
        >
          <div className="flex flex-col gap-16">
            <div className="flex h-full w-full flex-col justify-center gap-8">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="size-5 min-w-5 text-slate-600" />
                <p className="font-medium text-slate-500">
                  Los cipreses 02-estación pilará
                </p>
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <h1 className="text pb-2 text-left text-6xl font-semibold text-slate-600 2xl:text-7xl">
                  STAFF MODERN PELUQUERÍAS{" "}
                </h1>
                <div className="h-0.5 w-full max-w-xl bg-slate-600" />
                <p className="text text-lg font-bold tracking-wider text-slate-600 2xl:text-2xl">
                  MANICURA | PELUQUERÍA | DEPILACIÓN
                </p>
              </div>
              <div className="flex items-center gap-6">
                <button className="flex w-fit min-w-36 items-center justify-center gap-2 rounded-full bg-pink-700 px-6 py-2 font-medium text-white 2xl:min-w-44 2xl:px-8 2xl:py-3 2xl:text-lg">
                  <BsCalendar4Week className="size-4 min-w-4 text-white 2xl:size-6 2xl:min-w-6" />
                  Solicitar turno
                </button>
                <button className="flex w-fit min-w-36 items-center justify-center gap-2 rounded-full bg-slate-600 px-6 py-2 font-medium text-white 2xl:min-w-44 2xl:px-8 2xl:py-3 2xl:text-lg">
                  Ver servicios
                  <span className="pt-1">
                    <IoIosArrowDown className="size-4 min-w-4 text-white 2xl:size-6 2xl:min-w-6" />
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-start gap-4">
              <motion.div
                variants={itemsData}
                className="flex w-auto items-center gap-3 font-medium"
              >
                <IoCalendarClearOutline className="text-slate-600 2xl:size-6 2xl:min-w-6" />
                <p className="text-slate-600 2xl:text-lg">Lunes a Sábados</p>
              </motion.div>
              <div className="h-5 w-0.5 bg-slate-600"></div>
              <motion.div
                variants={itemsData}
                className="flex w-auto items-center gap-3 font-medium"
              >
                <FaRegClock className="text-slate-600 2xl:size-6 2xl:min-w-6" />
                <p className="text-slate-600 2xl:text-lg">
                  9:30 a.m - 19:00 p.m
                </p>
              </motion.div>
            </div>
          </div>
          <div className="flex w-full flex-col justify-between gap-16 pb-4 2xl:absolute 2xl:bottom-4 2xl:left-0">
            <ul className="flex items-center gap-2">
              {socialMedias.map((socialMedia) => (
                <li
                  className="rounded-full bg-slate-600 p-2"
                  key={socialMedia?.id}
                >
                  <socialMedia.icon className="size-5 min-w-5 text-white" />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </article>
      <article className="h-full w-full bg-blue-200"></article>
    </section>
  );
}
