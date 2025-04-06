import { motion } from "motion/react";
import { AiFillBank } from "react-icons/ai";
import { FaCcVisa, FaInstagram, FaMoneyBills } from "react-icons/fa6";
import { MdDiscount } from "react-icons/md";
import { SiMercadopago } from "react-icons/si";
import { mqs, useMediaQueries } from "../utils/functions";
import {
  appearTop,
  containerObserverAnimation,
} from "../utils/images/animations";
import { BiSolidOffer } from "react-icons/bi";
import { BsCalendar4Week } from "react-icons/bs";

export default function PaymentMethods() {
  const paymentMethods = [
    {
      name: "Dinero en efectivo",
      description:
        "Pagá en nuestro local al momento de tu cita de forma rápida y sencilla",
      icon: FaMoneyBills,
    },
    {
      name: "Transferencia bancaria",
      description: "Transferí desde tu banco favorito y aprovecha las promos",
      icon: AiFillBank,
    },
    {
      name: "Tarjetas de crédito/débito",
      description: "Aceptamos Visa y Mastercard para que pagues cómodamente",
      icon: FaCcVisa,
    },
    {
      name: "Mercado Pago",
      description: "Pagá con tarjeta de Débito/Crédito",
      icon: SiMercadopago,
    },
  ];

  const mq = useMediaQueries();

  return (
    <section className="mx-auto flex h-auto w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
      {/* Payment methods article */}
      <motion.article
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: mq > mqs.sm ? 0.4 : 0.2, once: true }}
        variants={containerObserverAnimation}
        className=""
      >
        <div className="text flex h-auto w-full flex-col gap-2">
          <motion.h4
            variants={appearTop}
            className="text-primary text-center text-4xl font-bold text-pretty md:text-left"
          >
            Paga de la manera más facil
          </motion.h4>
          <motion.p
            variants={appearTop}
            className="text-primary text-center font-semibold md:text-left"
          >
            Te brindamos las siguientes formas de pago
          </motion.p>
        </div>
        <div>
          <ul className="grid w-full grid-cols-1 place-items-center gap-8 py-8 min-[1070px]:!grid-cols-4 min-[1070px]:grid-rows-1 min-[1070px]:gap-16 sm:py-10 md:grid-cols-2">
            {paymentMethods.map((method) => (
              <motion.li
                variants={appearTop}
                key={method?.name}
                className="text flex w-full flex-col items-center gap-4 rounded-md p-4 px-6"
              >
                <div className="flex flex-col items-center gap-2">
                  <method.icon className="text-primary size-16 min-w-16" />
                  <p className="text-primary/70 w-64 text-center text-xl font-semibold">
                    {method?.name}
                  </p>
                </div>
                <p className="text-primary/70 h-16 max-w-80 text-center text-sm font-medium text-balance">
                  {method?.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.article>

      {/* Offers and promos article */}
      <motion.article
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.4, once: true }}
        variants={containerObserverAnimation}
        className="text flex w-full flex-col items-center justify-center gap-6"
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <motion.div
              variants={appearTop}
              className="text-primary bg-secondary/60 flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2"
            >
              <MdDiscount className="size-3 min-w-3 sm:size-4 sm:min-w-4" />
              <p className="text-xs font-semibold">Promos y descuentos</p>
            </motion.div>
            <motion.h4
              variants={appearTop}
              className="text-primary text-center text-3xl font-bold text-pretty"
            >
              ¡No te pierdas ninguna oferta!
            </motion.h4>
          </div>
          <motion.div
            variants={appearTop}
            className="bg-secondary/70 relative flex w-96 max-w-2xl flex-col items-center justify-between gap-4 rounded-md p-4 sm:h-24 sm:w-full sm:flex-row sm:gap-0 sm:rounded-full"
          >
            <div className="flex h-full w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-start">
                <div className="bg-primary flex w-auto items-center justify-center rounded-md px-2 py-1 sm:h-14 sm:w-14 sm:rounded-full sm:p-2">
                  <p className="pl-1 text-white sm:text-lg">15%</p>
                  <p className="pl-1 text-white sm:hidden">OFF</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-2 py-1 sm:hidden">
                  <BiSolidOffer className="text-primary size-4 min-w-4" />
                  <p className="text-primary text-xs">Descuento imperdible</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-0.5 text-lg sm:items-start md:items-center">
                <p className="text-primary font-semibold">
                  Descuento en efectivo/transferencia
                </p>
                <p className="text-primary/90 text-xs font-medium">
                  En todos nuestros servicios
                </p>
                <p></p>
              </div>
            </div>
            <div className="flex h-full w-full items-center md:w-fit">
              <a
                target="_blank"
                href="https://api.whatsapp.com/send?phone=541127210827&text=hola%F0%9F%91%8B%20quiero%20solicitar%20un%20turno!%20"
                className="bg-primary transition-al flex w-full min-w-36 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-nowrap text-white md:w-fit"
              >
                <BsCalendar4Week className="size-4 min-w-4 text-white" />
                Solicitar turno
              </a>
            </div>
          </motion.div>
          <motion.p
            variants={appearTop}
            className="text-primary text-center font-medium"
          >
            Seguínos en Instagram para estar al tanto de descuentos y
            promociones que realizamos
          </motion.p>
        </div>

        <motion.div
          variants={appearTop}
          className="bg-primary relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 shadow-2xl !transition-none"
        >
          <a
            className="relative flex w-full items-center gap-2"
            target="_blank"
            href="https://www.instagram.com/staffmodernpeluquerias?igsh=MTAwcXpmcmgyaWlnZg%3D%3D"
          >
            <FaInstagram className="size-5 min-w-5 text-white" />
            <p className="text-xs font-medium tracking-wide text-white">
              Ir a Instagram
            </p>
          </a>
        </motion.div>
      </motion.article>
    </section>
  );
}
