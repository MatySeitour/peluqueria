import {
    Scissors,
  } from "lucide-react"

import { BsCalendar4Week } from "react-icons/bs";

export default function Footer() {
    return (
        <section className="bg-black py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold">Lista para un nuevo Look?</h2>
                <p className="mt-4 text-gray-300">
                  Nuestro equipo de estilistas expertos está listo para ayudarte a lograr el estilo perfecto. Reserva tu cita hoy.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="flex items-center rounded-md bg-white px-4 py-2 text-black transition-colors hover:bg-gray-200">
                  <BsCalendar4Week className="mr-2 h-4 w-4" />
                  Solicitar Turno
                </button>
                <button className="flex items-center rounded-md border border-white bg-transparent px-4 py-2 text-white transition-colors hover:bg-white hover:text-black">
                  <Scissors className="mr-2 h-4 w-4" />
                  Ver mas Servicios
                </button>
              </div>
            </div>
          </div>
        </section>) 
    }