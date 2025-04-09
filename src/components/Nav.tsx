import { useEffect, useState } from "react";
import { cn, mqs, navItems, useMediaQueries } from "../utils/functions";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { SocialMedia } from "./SocialMedia";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { MdLocalOffer } from "react-icons/md";
import { BsCalendar4Week } from "react-icons/bs";

export function Nav() {
  const [navDesktopEffect, setNavDesktopEffect] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const mq = useMediaQueries();

  const removeHashNavItemHref = (href: string) => href.split("#")[1];

  useEffect(() => {
    const onScroll = () => {
      const newScroll = window.scrollY > 350;
      return navDesktopEffect !== newScroll && setNavDesktopEffect(newScroll);
    };

    document.addEventListener(`scroll`, onScroll);
    return () => document.removeEventListener(`scroll`, onScroll);
  }, [navDesktopEffect]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 },
    );

    navItems.forEach((navItem) => {
      const section = document.getElementById(
        removeHashNavItemHref(navItem?.href),
      );
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const closeNavMobile = () => setIsNavOpen(false);

  const containerNavAnimation = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const navItemAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <header
      className={cn(
        "border-primary fixed left-0 z-50 flex h-16 w-full items-center justify-between border-b px-6 transition-all",
        navDesktopEffect ? "bg-third top-0" : "-top-full",
        mq !== 0 && mq < mqs.sm && "top-0 border-none",
      )}
    >
      <a
        target="_blank"
        href="https://www.instagram.com/staffmodernpeluquerias?igsh=MTAwcXpmcmgyaWlnZg%3D%3D"
      >
        <figure className="relative flex h-full w-16 items-center pt-2">
          <img
            src="/logo_negro.webp"
            className={cn(
              "object-cover",
              !navDesktopEffect && "brightness-200 invert filter",
            )}
          />
        </figure>
      </a>
      <nav className="z-10 h-full w-full max-w-2xl">
        <ul className="hidden h-full w-full items-center justify-between min-[880px]:flex">
          {navItems?.map((navItem) => (
            <li
              className={cn(
                "hover:after:bg-primary text-primary relative cursor-pointer p-1 pb-1.5 font-medium transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-all",
                activeSection === removeHashNavItemHref(navItem?.href) &&
                  "after:bg-primary",
              )}
              key={navItem?.id}
            >
              <a
                target={navItem?.id !== 5 ? "_self" : "_blank"}
                href={`${navItem?.href}`}
              >
                {navItem?.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex h-full items-center justify-end min-[880px]:hidden">
          <div className="relative top-0 z-[40] flex w-full items-center justify-end">
            <button
              onClick={() => setIsNavOpen((prevState) => !prevState)}
              className="relative z-[50] flex h-4 w-12 items-center justify-center transition-all"
            >
              <div
                className={cn(
                  "bg-primary absolute top-0 left-3 h-0.5 w-6 rounded-full transition-all",
                  isNavOpen && "top-0 rotate-[49deg]",
                  mq < mqs.sm && !navDesktopEffect && "bg-white",
                  isNavOpen && "bg-primary",
                )}
              />
              <div
                className={cn(
                  "bg-primary absolute top-1/2 left-3 h-0.5 w-6 -translate-y-1/2 rounded-full transition-all",
                  isNavOpen && "hidden",
                  mq < mqs.sm && !navDesktopEffect && "bg-white",
                )}
              />
              <div
                className={cn(
                  "bg-primary absolute bottom-0 left-3 h-0.5 w-6 rounded-full transition-all",
                  isNavOpen && "top-0 -rotate-[49deg] transition-all",
                  mq < mqs.sm && !navDesktopEffect && "bg-white",
                  isNavOpen && "bg-primary",
                )}
              ></div>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isNavOpen && (
            <div className="no-doc-scroll fixed top-0 left-0 h-[100dvh] w-[100dvw] overflow-hidden bg-black/30">
              <motion.article
                initial={{
                  x: "100%",
                  transition: { ease: "circOut", duration: 0.2 },
                }}
                animate={{ x: 0, transition: { ease: "circOut" } }}
                exit={{
                  x: "100%",
                  transition: { ease: "circOut", duration: 0.2 },
                }}
                className="bg-secondary absolute top-0 right-0 z-10 flex h-full w-screen flex-col overflow-auto pb-4 backdrop-blur-lg"
              >
                <figure className="relative flex h-20 w-20 items-center">
                  <img src="/logo_nav.webp" className="object-cover" />
                </figure>
                <motion.ul
                  variants={containerNavAnimation}
                  initial="hidden"
                  animate="visible"
                  className="border-primary flex h-auto w-full flex-col gap-2 border-t border-b px-4 py-8"
                >
                  {navItems?.map((navItem) => (
                    <motion.li
                      variants={navItemAnimation}
                      className="text-primary hover:text-primary/70 h-12 w-fit cursor-pointer py-2 font-medium transition-all"
                      key={navItem?.id}
                    >
                      <a
                        target={navItem?.id !== 5 ? "_self" : "_blank"}
                        onClick={closeNavMobile}
                        className="flex h-full items-center gap-3"
                        href={`${navItem?.href}`}
                      >
                        {activeSection ===
                          removeHashNavItemHref(navItem?.href) && (
                          <span className="bg-primary h-full w-1" />
                        )}
                        <navItem.icon className="size-5 min-w-5" />
                        {navItem?.name}
                        {navItem?.id === 2 && (
                          <div className="bg-primary/20 border-primary flex h-full w-fit items-center gap-1 rounded-full px-2 py-1.5">
                            <MdLocalOffer className="text-primary size-4 min-w-4" />
                            <p className="text-primary text-xs text-nowrap">
                              15% desc en efectivo/transferencia
                            </p>
                          </div>
                        )}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="flex h-full w-full flex-col">
                  <div className="h-full w-full">
                    <div className="border-primary flex w-full items-center border-b px-4 py-6">
                      <motion.div
                        variants={containerNavAnimation}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-start justify-center gap-4 min-[880px]:justify-start"
                      >
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, transition: { delay: 0.5 } },
                            visible: { opacity: 1, transition: { delay: 0.5 } },
                          }}
                          className="flex w-auto items-center gap-3 font-medium"
                        >
                          <IoCalendarClearOutline className="text-primary 2xl:size-6 2xl:min-w-6" />
                          <p className="text-primary 2xl:text-lg">
                            Lunes a Sábados
                          </p>
                        </motion.div>

                        <motion.div
                          variants={{
                            hidden: { opacity: 0, transition: { delay: 0.5 } },
                            visible: { opacity: 1, transition: { delay: 0.6 } },
                          }}
                          className="flex w-auto items-center gap-3 font-medium"
                        >
                          <FaRegClock className="text-primary 2xl:size-6 2xl:min-w-6" />
                          <p className="text-primary 2xl:text-lg">
                            9:30 a.m - 19:00 p.m
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.8 },
                    }}
                    className="flex h-12 w-full justify-between px-4"
                  >
                    <SocialMedia />
                    <a
                      target="_blank"
                      href="https://api.whatsapp.com/send?phone=541127210827&text=hola%F0%9F%91%8B%20quiero%20solicitar%20un%20turno!%20"
                      className="bg-primary transition-al flex w-fit min-w-36 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-1 text-xs font-medium text-nowrap text-white"
                    >
                      <BsCalendar4Week className="size-4 min-w-4 text-white" />
                      Solicitar turno
                    </a>
                  </motion.div>
                </div>
              </motion.article>
            </div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
