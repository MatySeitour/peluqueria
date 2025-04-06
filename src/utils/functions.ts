import clsx from "clsx";
import { ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { IoCardOutline } from "react-icons/io5";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { MdLocalPhone } from "react-icons/md";
import { PiHairDryerLight } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

type SocialMedia = {
  id: number;
  name: string;
  link: string;
  icon: IconType;
};

export type SMQ = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export const mqs = {
  xxs: 480,
  xs: 560,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};
export function useMediaQueries(): number {
  const [mq, setMq] = useState<number>();

  const mqChange = () => {
    setMq(document.body.clientWidth);
  };

  useEffect(() => {
    setMq(document.body.clientWidth);
    window.addEventListener("resize", mqChange);

    return () => {
      window.removeEventListener("resize", mqChange);
    };
  }, []);

  return mq ?? 0;
}

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args));
};

export const socialMedias: SocialMedia[] = [
  {
    id: 1,
    name: "Instagram",
    link: "https://www.instagram.com/staffmodernpeluquerias?igsh=MTAwcXpmcmgyaWlnZg%3D%3D",
    icon: FaInstagram,
  },
  {
    id: 2,
    name: "WhatsApp",
    link: "https://api.whatsapp.com/send?phone=541127210827",
    icon: FaWhatsapp,
  },
  {
    id: 3,
    name: "Teléfono",
    link: "tel:+541127210827",
    icon: MdLocalPhone,
  },
];

export const navItems = [
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
