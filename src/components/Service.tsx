import ServiceCategory from "../components/ServiceCategory";
import { CATALOG } from "../config/catalog";

function formatPrice(price: number): string {
  return `$${price}`;
}

function getCategory(id: string) {
  const category = CATALOG.find((c) => c.id === id);
  if (!category) throw new Error(`Categoría "${id}" no encontrada en el catálogo.`);
  return category;
}

const peluqueria = getCategory("peluqueria");
const unas = getCategory("unas");
const depilacion = getCategory("depilacion");
const cejasPestanas = getCategory("cejas-pestanas");

// La Coloración se agrupa por marca dentro de un acordeón padre "COLORACION".
const coloracionGroups = peluqueria.groups.filter((g) => g.title.startsWith("Coloración"));
const peluqueriaGroupsSinColoracion = peluqueria.groups.filter((g) => !g.title.startsWith("Coloración"));

// Dentro de Depilación, "Mujer" agrupa Rostro/Torso/Brazos-piernas-pelvis.
const depilacionMujerGroups = depilacion.groups.filter((g) => g.title.startsWith("Mujer"));
const depilacionHombreGroups = depilacion.groups.filter((g) => !g.title.startsWith("Mujer"));

const unasManosPiesGroups = unas.groups.filter((g) => g.title !== "Tratamientos pedicura");
const unasTratamientosGroup = unas.groups.find((g) => g.title === "Tratamientos pedicura")!;

export default function ServiciosPage() {
  return (
    <section className="flex flex-col min-h-screen mt-16"> {/* Agregamos mt-16 */}
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row h-[70vh]">
        {/* Left Side - Red Background with Image */}
        <div className="relative w-full md:w-3/5 h-full ">
          <div className="absolute top-6 left-6 z-10">
            <h1 className="font-display text-5xl text-white">STAFF MODERN</h1>
          </div>
          <img
            src="/services.webp"
            alt="PHOTO"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-0 left-0 bg-black/40 h-full w-full" />
        </div>

        {/* Right Side - Black Background with Title */}
        <div className="w-full md:w-2/5 bg-black h-full flex flex-col justify-center items-start p-6 md:p-12">
          <div className="mt-auto">
            <div className="w-16 h-0.5 bg-white mb-6"></div>
            <h2 className="text-4xl font-bold text-white">SERVICIOS</h2>
            <p className="text-s mx-auto mt-4 max-w-xl text-gray-600">
              Precio Actualizado: 01/07/2026
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div
        id="servicios"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 lg:p-10 scroll-mt-24"
      >
        {/* Left Column - Peluqueria Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">PELUQUERIA</h3>
          <div className="space-y-2">
            {peluqueriaGroupsSinColoracion.map((group) => (
              <ServiceCategory
                key={group.title}
                title={group.title}
                services={group.variants.map((v) => ({ name: v.name, price: formatPrice(v.price) }))}
              />
            ))}
            <ServiceCategory title="COLORACION">
              {coloracionGroups.map((group) => (
                <ServiceCategory
                  key={group.title}
                  title={group.title.replace("Coloración · ", "")}
                  services={group.variants.map((v) => ({ name: v.name, price: formatPrice(v.price) }))}
                />
              ))}
            </ServiceCategory>
          </div>
        </div>

        {/* Right Column - Other Sections */}
        <div className="space-y-8">
          {/* MANOS Y PIES Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">MANOS Y PIES</h3>
            <div className="space-y-2">
              {unasManosPiesGroups.map((group) => (
                <ServiceCategory
                  key={group.title}
                  title={group.title}
                  services={group.variants.map((v) => ({ name: v.name, price: formatPrice(v.price) }))}
                />
              ))}
            </div>
          </div>
          {/* Tratamientos Pedicura Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">TRATAMIENTOS PEDICURA</h3>
            <div className="space-y-2">
              <ServiceCategory
                title="Tratamientos"
                services={unasTratamientosGroup.variants.map((v) => ({ name: v.name, price: formatPrice(v.price) }))}
              />
            </div>
          </div>
          {/* Depilacion Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">DEPILACION</h3>
            <div className="space-y-2">
              {depilacionHombreGroups.map((group) => (
                <ServiceCategory
                  key={group.title}
                  title={group.title.toUpperCase()}
                  services={group.variants.map((v) => ({ name: v.name, price: formatPrice(v.price) }))}
                />
              ))}
              <ServiceCategory title="MUJER">
                {depilacionMujerGroups.map((group) => (
                  <ServiceCategory
                    key={group.title}
                    title={group.title.replace("Mujer · ", "").toUpperCase()}
                    services={group.variants.map((v) => ({ name: v.name, price: formatPrice(v.price) }))}
                  />
                ))}
              </ServiceCategory>
            </div>
          </div>
          {/* CEJAS Y PESTAÑAS Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              CEJAS, PESTAÑAS Y COSMETOLOGIA
            </h3>
            <div className="space-y-2">
              {cejasPestanas.groups.map((group) => (
                <ServiceCategory
                  key={group.title}
                  title={group.title.toUpperCase()}
                  services={group.variants.map((v) => ({ name: v.name, price: formatPrice(v.price) }))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
