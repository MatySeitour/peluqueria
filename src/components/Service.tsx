import ServiceCategory from "../components/ServiceCategory"

export default function ServiciosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row h-[70vh]">
        {/* Left Side - Red Background with Image */}
        <div className="relative w-full md:w-3/5 bg-red-700 h-full">
          <div className="absolute top-6 left-6 z-10">
            <h1 className="text-5xl font-serif italic text-white">STAFF MODERN</h1>
          </div>
          <img src="/placeholder.jpg" alt="PHOTO" className="w-full h-full object-cover object-center" />
        </div>

        {/* Right Side - Black Background with Title */}
        <div className="w-full md:w-2/5 bg-black h-full flex flex-col justify-center items-start p-12">
          <div className="mt-auto">
            <div className="w-16 h-0.5 bg-white mb-6"></div>
            <h2 className="text-4xl font-bold text-white">SERVICIOS</h2>
            <p className="text-s mx-auto mt-4 max-w-xl text-gray-600">
              Precio Actualizado: 01/04/2025
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 md:p-12">
        {/* Peluqueria Section */}
        <div>
          <h3 className="text-xl font-bold mb-6">PELUQUERIA</h3>
          <div className="space-y-2">
            <ServiceCategory title="LAVADO" />
            <ServiceCategory title="NUTRICIONES" />
            <ServiceCategory title="AMPOLLAS" />
            <ServiceCategory title="KERATINA" />
            <ServiceCategory title="ALISADOS" />
            <ServiceCategory title="BOTOX" />
            <ServiceCategory title="CORTES" />
            <ServiceCategory title="BRUSHING" />
            <ServiceCategory title="SECADO MODELADO" />
            <ServiceCategory title="ONDAS" />
            <ServiceCategory title="TRENZAS" />
            <ServiceCategory title="COLORACION">
              <ServiceCategory title="TINTURA COMPLETA" />
              <ServiceCategory title="RAICES" />
              <ServiceCategory title="BAÑO DE COLOR" />
            </ServiceCategory>
            <ServiceCategory title="MECHAS LOCALIZADAS" />
            <ServiceCategory title="REFLEJOS CON GORRA" />
            <ServiceCategory title="BALAYAGE" />
          </div>
        </div>

        {/* Depilacion Section */}
        <div>
          <h3 className="text-xl font-bold mb-6">DEPILACION</h3>
          <div className="space-y-2">
            <ServiceCategory title="HOMBRE" />
            <ServiceCategory title="MUJER">
              <ServiceCategory title="ROSTRO" />
              <ServiceCategory title="TORSO" />
              <ServiceCategory title="BRAZOS-PIERNAS-PELVIS" />
            </ServiceCategory>
          </div>
        </div>
      </div>
    </div>
  )
}

