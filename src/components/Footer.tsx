import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { IoCalendarClearOutline } from "react-icons/io5";
import { navItems, socialMedias } from "../utils/functions";
import { MdLocalOffer } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="relative flex h-auto flex-col items-center gap-10 overflow-hidden bg-gradient-to-b from-black/90 via-black to-black p-6 text-white lg:flex-row lg:gap-4"
    >
      <span className="banner absolute right-1/2 -bottom-12 h-28 w-52 translate-x-16 !bg-gradient-to-r !from-transparent !to-white sm:top-0 sm:bottom-0 sm:w-28" />
      {/* Footer title and logo */}
      <div className="relative z-20 flex h-full w-full flex-col justify-between gap-10">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <div className="flex items-center gap-2">
              <figure className="relative flex h-16 w-16 items-center">
                <img
                  src="/logo_negro.webp"
                  className="object-cover brightness-200 invert filter"
                />
              </figure>
              <p className="text text-4xl">STAFF MODERN</p>
            </div>
            <div className="w-full">
              <ul className="flex w-full items-center justify-center gap-4 lg:justify-start">
                {socialMedias?.map((socialMedia) => (
                  <li
                    key={socialMedia?.id}
                    className="flex cursor-pointer items-center justify-between"
                  >
                    <a
                      target="_blank"
                      className="flex gap-1 rounded-full bg-white px-4 py-2 text-black transition-colors hover:bg-white/90"
                      href={socialMedia?.link}
                    >
                      <socialMedia.icon className="size-4 min-w-4 text-black" />
                      <p className="text-xs font-medium">{socialMedia?.name}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="hidden text-xs text-slate-100/40 lg:flex">
          © {new Date().getFullYear()} StaffModern. Todos los derechos
          reservados.
        </p>
      </div>
      {/* Footer navigation and info */}
      <div className="relative z-20 flex h-full w-full flex-col justify-center gap-4">
        <div className="flex flex-col items-center gap-10 sm:flex-row">
          <ul className="flex h-full w-full flex-col items-center justify-center gap-2 sm:items-start sm:border-r sm:pr-10 sm:pb-0 lg:items-end">
            {navItems?.map((navItem) => (
              <li
                key={navItem?.id}
                className="cursor-pointer text-right font-medium text-white transition-colors hover:text-slate-100/70"
              >
                <a
                  target={navItem?.id !== 5 ? "_self" : "_blank"}
                  href={`${navItem?.href}`}
                  className="text-nowrap"
                >
                  {navItem?.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex w-full flex-col items-center gap-4 sm:items-end">
            <div className="flex w-auto items-center gap-3 font-medium text-white">
              <IoCalendarClearOutline className="" />
              <p className="text-sm">Lunes a Sábados</p>
            </div>
            <div className="flex w-auto items-center gap-3 font-medium text-white">
              <FaRegClock className="size-4 min-w-4" />
              <p className="text-sm">9:30 a.m - 19:00 p.m</p>
            </div>
            <a
              href="https://maps.app.goo.gl/vxQkNNbYEvREdFBi7"
              target="_blank"
              className="flex items-center gap-3 text-white hover:underline"
            >
              <FaMapMarkerAlt className="size-5 min-w-5" />
              <p className="text-sm text-nowrap">
                Los Cipreses 02 - Estación Pilar
              </p>
              <div className="rounded-full bg-white p-1 hover:bg-white/80">
                <IoMdOpen className="size-4 min-w-4 text-black" />
              </div>
            </a>
            <div className="flex h-8 w-fit items-center justify-center gap-2 rounded-full bg-slate-800 px-4 text-white">
              <MdLocalOffer className="text-white" />
              <p className="text-xs">15% descuento en efectivo/transferencia</p>
            </div>
            <div className="inline-block w-full p-2 text-center text-xs text-white/70 sm:hidden">
              © {new Date().getFullYear()} StaffModern. Todos los derechos
              reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
