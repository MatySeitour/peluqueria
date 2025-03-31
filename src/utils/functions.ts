import clsx from "clsx";
import { ClassValue } from "clsx";
import { IconType } from "react-icons";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args));
};

type SocialMedia = {
  id: number;
  name: string;
  link: string;
  icon: IconType;
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
