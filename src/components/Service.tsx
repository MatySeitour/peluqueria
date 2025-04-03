import { Clock } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Corte Mujer",
    description: "Incluye consulta, lavado, corte y peinado",
    price: 65,
    duration: "60 min",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "Corte Hombre",
    description: "Incluye consulta, lavado, corte y peinado",
    price: 45,
    duration: "45 min",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Color y Mechas",
    description: "Color completo o mechas parciales/completas",
    price: 120,
    duration: "120 min",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    name: "Secado y Peinado",
    description: "Lavado, secado y peinado para cualquier ocasión",
    price: 55,
    duration: "45 min",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    name: "Tratamiento Capilar",
    description: "Acondicionamiento profundo y reparación",
    price: 75,
    duration: "60 min",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    name: "Peinado de Novia",
    description: "Consulta y peinado para tu día especial",
    price: 150,
    duration: "90 min",
    image: "/placeholder.svg?height=300&width=400",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Services Section */}
      <section
        id="Services"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-black">SERVICIOS</h2>
          <p className="text-s mx-auto mt-4 max-w-xl text-gray-600">
            Precio Actualizado: 27/03/2025
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-black"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
              >
                <div className="flex h-48 items-center justify-center bg-gray-50">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <span className="text-xl font-bold">${service.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {service.description}
                  </p>
                </div>
                <div className="px-6 pb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className="w-full rounded-md bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800">
                    Reserva Ahora
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
