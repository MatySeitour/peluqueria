import { useEffect, useState } from "react";
import { cn } from "../utils/functions";
import { GoHome } from "react-icons/go";
import { PiHairDryerLight } from "react-icons/pi";
import { IoCardOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { SocialMedia } from "./SocialMedia";

export function Nav() {
  const [navDesktopEffect, setNavDesktopEffect] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const newScroll = window.scrollY > 40;
      return navDesktopEffect !== newScroll && setNavDesktopEffect(newScroll);
    };

    document.addEventListener(`scroll`, onScroll);
    return () => document.removeEventListener(`scroll`, onScroll);
  }, [navDesktopEffect]);

  const navItems = [
    {
      id: 1,
      name: "Home",
      href: "#",
      icon: GoHome,
    },
    {
      id: 2,
      name: "Servicios",
      href: "#Services",
      icon: PiHairDryerLight,
    },
    {
      id: 3,
      name: "Medios de pago",
      href: "#",
      icon: IoCardOutline,
    },
    {
      id: 4,
      name: "Contacto",
      href: "#",
      icon: FiPhone,
    },
    {
      id: 5,
      name: "Donde encontrarnos",
      href: "#",
      icon: LiaMapMarkerAltSolid,
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-transparent px-6 transition-all",
        navDesktopEffect
          ? "border-slate-300 bg-slate-100/70 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <figure className="h-8 w-10">
        <img
          src="../../public/logo_peluqueria-removebg-preview.png"
          className="object-cover"
        />
      </figure>
      <nav className="z-10 h-full w-full max-w-2xl">
        <ul className="hidden h-full w-full items-center justify-between min-[880px]:flex">
          {navItems?.map((navItem) => (
            <li
              className={cn(
                "relative cursor-pointer p-1 pb-1.5 font-medium text-slate-700 transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-all hover:text-pink-500 hover:after:bg-pink-500",
              )}
              key={navItem?.id}
            >
              {navItem?.name}
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
                className={
                  !isNavOpen
                    ? "absolute top-0 left-3 h-0.5 w-6 rounded-full bg-slate-800 transition-all"
                    : "absolute top-0 left-3 h-0.5 w-6 rotate-[49deg] rounded-full bg-white transition-all"
                }
              ></div>
              <div
                className={
                  !isNavOpen
                    ? "absolute top-1/2 left-3 h-0.5 w-6 -translate-y-1/2 rounded-full bg-slate-800 transition-all"
                    : "absolute top-1/2 left-3 hidden h-0.5 w-6 rounded-full bg-slate-800 transition-all"
                }
              ></div>
              <div
                className={
                  !isNavOpen
                    ? "absolute bottom-0 left-3 h-0.5 w-6 rounded-full bg-slate-800 transition-all"
                    : "absolute top-0 left-3 h-0.5 w-6 -rotate-[49deg] rounded-full bg-white transition-all"
                }
              ></div>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isNavOpen && (
            <div className="no-doc-scroll fixed top-0 left-0 h-[100dvh] w-[100dvw] overflow-hidden bg-black/30">
              <motion.article
                initial={{
                  x: 600,
                  transition: { ease: "linear", duration: 0.2 },
                }}
                animate={{ x: 0, transition: { ease: "linear" } }}
                exit={{ x: 600, transition: { ease: "linear", duration: 0.2 } }}
                className="absolute top-0 right-0 z-10 flex h-full w-3/4 flex-col justify-between overflow-auto bg-gradient-to-br from-slate-700 to-slate-900 px-4 pt-16 pb-4 backdrop-blur-lg"
              >
                <ul className="flex h-auto w-full flex-col gap-4">
                  {navItems?.map((navItem) => (
                    <li
                      className="flex items-center gap-3 p-2 font-medium text-slate-400 transition-all hover:text-white"
                      key={navItem?.id}
                    >
                      <navItem.icon className="size-5 min-w-5" />
                      {navItem?.name}
                    </li>
                  ))}
                </ul>
                <div className="flex h-12 w-full justify-start">
                  {/* <ul className="flex items-center gap-2">
                    {socialMedias.map((socialMedia) => (
                      <li
                        className={cn(
                          "btn-gradient group group relative flex w-9 cursor-pointer items-center gap-2 rounded-full p-2 text-lg shadow-2xl transition-all",
                          socialMedia?.id === 3 && "hover:!w-36",
                        )}
                        key={socialMedia?.id}
                      >
                        <socialMedia.icon className="size-5 min-w-5 text-white" />

                        {socialMedia?.id === 3 && (
                          <p className="invisible absolute left-1/2 z-10 -translate-x-1/2 pl-4 text-xs font-medium text-nowrap text-white opacity-0 group-hover:visible group-hover:opacity-100 group-hover:transition-all group-hover:delay-300">
                            +54 11 2721-0827
                          </p>
                        )}
                      </li>
                    ))}
                  </ul> */}
                  <SocialMedia />
                </div>
              </motion.article>
            </div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
