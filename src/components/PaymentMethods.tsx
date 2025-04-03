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
      name: "Billeteras virtuales",
      description:
        "Podés abonar con Mercado Pago, Ualá, Naranja X y otras más de forma rápida y segura",
      icon: SiMercadopago,
    },
  ];

  const mq = useMediaQueries();

  return (
    <section className="mx-auto flex h-auto w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8 xl:gap-14">
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
            className="text-center text-4xl font-bold text-pretty text-slate-800 md:text-left"
          >
            Paga de la manera más facil
          </motion.h4>
          <motion.p
            variants={appearTop}
            className="text-center font-semibold text-slate-500 md:text-left"
          >
            Te brindamos las siguientes formas de pago
          </motion.p>
        </div>
        <div>
          <ul className="grid w-full grid-cols-1 place-items-center gap-8 py-8 min-[1070px]:!grid-cols-4 min-[1070px]:grid-rows-1 min-[1070px]:gap-16 sm:py-14 md:grid-cols-2">
            {paymentMethods.map((method) => (
              <motion.li
                variants={appearTop}
                key={method?.name}
                className="text flex w-full flex-col items-center gap-4 rounded-md p-4 px-6"
              >
                <div className="flex flex-col items-center gap-2">
                  <method.icon className="size-16 min-w-16 text-slate-800" />
                  <p className="w-64 text-center text-xl font-semibold text-slate-700">
                    {method?.name}
                  </p>
                </div>
                <p className="h-16 max-w-80 text-center text-sm font-medium text-balance text-slate-600">
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
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <motion.div
              variants={appearTop}
              className="flex w-fit items-center gap-2 rounded-full bg-slate-200 px-3.5 py-1.5 text-slate-600 sm:px-4 sm:py-2"
            >
              <MdDiscount className="size-3 min-w-3 sm:size-4 sm:min-w-4" />
              <p className="text-xs font-semibold">Promos y descuentos</p>
            </motion.div>
            <motion.h4
              variants={appearTop}
              className="text-center text-3xl font-bold text-pretty text-slate-800"
            >
              ¡No te pierdas ninguna oferta!
            </motion.h4>
          </div>
          <motion.p
            variants={appearTop}
            className="text-center font-medium text-slate-500"
          >
            Seguínos en Instagram para estar al tanto de descuentos y
            promociones que realizamos
          </motion.p>
        </div>

        <motion.div
          variants={appearTop}
          className="btn-gradient relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 shadow-2xl !transition-none"
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
