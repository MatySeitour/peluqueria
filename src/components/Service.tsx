import ServiceCategory from "../components/ServiceCategory";

export default function ServiciosPage() {
  return (
    <section className="flex flex-col min-h-screen mt-16"> {/* Agregamos mt-16 */}
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row h-[70vh]">
        {/* Left Side - Red Background with Image */}
        <div className="relative w-full md:w-3/5 h-full ">
          <div className="absolute top-6 left-6 z-10">
            <h1 className="text-5xl font-serif italic text-white">STAFF MODERN</h1>
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
              Precio Actualizado: 20/11/2025
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
            <ServiceCategory
              title="LAVADO"
              services={[
                { name: "COMÚN", price: "$13800" },
                { name: "LOREAL", price: "$25300" },
                { name: "KERASTASSE", price: "$34500" },
                { name: "OLAPLEX", price: "$37950" },
                { name: "APLICACION (nutricion) LOREAL", price: "$26450" },
                { name: "APLICACION (nutricion) OLAPLEX", price: "$34500" },
                { name: "APLICACION (nutricion) KERASTASSE", price: "$32200" },
                { name: "APLICACION LAVADO (shampoo/acond)", price: "$18400" },
              ]}
            />
            <ServiceCategory
              title="NUTRICIONES"
              services={[
                { name: "LOREAL TODOS", price: "$36800" },
                { name: "KARSELL ", price: "$34500" },
                { name: "KERASTASSE", price: "$48300" },
              ]}
            />
            <ServiceCategory
              title="AMPOLLAS"
              services={[
                { name: "ALFAPARF", price: "$28750" },
                { name: "LOREAL", price: "$34500" },
                { name: "KERASTASSE", price: "$42550" },
              ]}
            />
            <ServiceCategory
              title="TRATAMIENTOS"
              services={[
                { name: "OLAPLEX PARA RULOS", price: "$112700" },
                { name: "OLAPLEX 4 EN 1", price: "$69000" },
                { name: "OLAPLEX profesional", price: "$112700" },
                { name: "LOREAL (TODOS)", price: "$74750" },
              ]}
            />
            <ServiceCategory
              title="KERATINA"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$74750" },
                { name: "LARGO", price: "$97750" },
              ]}
            />
            <ServiceCategory
              title="ALISADOS"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$97750" },
                { name: "LARGO", price: "$155000" },
                { name: " FEQUILLO/CONTORNO", price: "$63300" },
              ]}
            />
            <ServiceCategory
              title="BOTOX"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$74750" },
                { name: "LARGO", price: "$97750" },
              ]}
            />
            <ServiceCategory
              title="CORTES"
              services={[
                { name: "DAMA", price: "$28750" },
                { name: "CABALLEROS", price: "$28750" },
                { name: "NIÑO HASTA 12 AÑOS", price: "$26450" },
                { name: "BARBA", price: "$25300" },
                { name: "CORTE + BARBA", price: "$37950" },
                { name: "FLEQUILLO", price: "$20700" },
              ]}
            />
            <ServiceCategory
              title="BRUSHING"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$27600" },
                { name: "LARGO", price: "$29900" },
                { name: "MAS PLANCHITA CORTO/MEDIO", price: "$32200" },
                { name: "MAS PLANCHITA LARGO", price: "$34500" },
              ]}
            />
            <ServiceCategory
              title="SECADO MODELADO"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$17250" },
                { name: "LARGO", price: "$20700" },
              ]}
            />
            <ServiceCategory
              title="ONDAS"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$43700" },
                { name: "LARGO", price: "$52900" },
              ]}
            />
            <ServiceCategory
              title="TRENZAS"
              services={[
                { name: "HASTA 2", price: "$0" },
                { name: "MAS DE 2", price: "$0" },
                { name: "PEINADOS/RECOGIDOS DESDE", price: "$55200" },
              ]}
            />
            <ServiceCategory title="COLORACION">
              <ServiceCategory
                title="INOA"
                services={[
                  { name: "RAIZ/MEDIO", price: "$89700" },
                  { name: "LARGO (completo)", price: "$105800" },
                ]}
              />
              <ServiceCategory
                title="MAJIREL"
                services={[
                  { name: "RAIZ/MEDIO", price: "$71300" },
                  { name: "LARGO (completo)", price: "$89700" },
                ]}
              />
              <ServiceCategory
                title="WELLA (color perfect)"
                services={[
                  { name: "RAIZ/MEDIO", price: "$78200" },
                  { name: "LARGO (completo)", price: "$93150" },
                ]}
              />
              <ServiceCategory
                title="SILKEY"
                services={[
                  { name: "RAIZ/MEDIO", price: "$57500" },
                  { name: "LARGO", price: "$74750" },
                  { name: "APLICACION DE HENNA (todos los largos)", price: "$57000" },
                  { name: "APLICACION DE TINTURA", price: "$57000" },
                  { name: "BAÑO DE LUZ (desde)", price: "$55200" },
                  { name: "VINCHA RETOQUE", price: "$51750" },
                ]}
              />
            </ServiceCategory>
            <ServiceCategory
              title="MECHAS LOCALIZADAS"
              services={[
                { name: "CORTO/MEDIO", price: "$143750" },
                { name: "LARGO (completo)", price: "$161000" },
                { name: "MEDIA CABEZA", price: "$97750" },
                { name: "CONTORNO", price: "$54050" },
              ]}
            />
            <ServiceCategory
              title="REFLEJOS CON GORRA"
              services={[
                { name: "CORTO/MEDIO", price: "$143750" },
                { name: "LARGO", price: "$161000" },
              ]}
            />
            <ServiceCategory
              title="BALAYAGE"
              services={[{ name: "DESDE", price: "$172500" }]}
            />
             <ServiceCategory
              title="DECOLORACIÓN"
              services={[
                { name: "CORTO/MEDIO", price: "$86250" }, 
                { name: "LARGO", price: "$92000" }]}
            />
          </div>
        </div>

        {/* Right Column - Other Sections */}
        <div className="space-y-8">
          {/* MANOS Y PIES Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">MANOS Y PIES</h3>
            <div className="space-y-2">
              <ServiceCategory
                title="MANOS"
                services={[
                  { name: "Manicuria c/ esmalte tradicional", price: "$23000" },
                  { name: "Manicuria c/esmalte semi french", price: "$31050" },
                  { name: "Manicuria c/esmalte tradicional french", price: "$25300" },
                  { name: "Manicuria c/ esmalte semi", price: "$27600" },
                  { name: "Capping gel nivelacion", price: "$33350" },
                  { name: "Capping con poligel", price: "$33350" },
                  { name: "Soft gel por uña", price: "$11500" },
                  { name: "Capping por uña", price: "$6900" },
                  { name: "Cambio de esmalte tradicional", price: "$11500" },
                  { name: "Cambio de esmalte semi", price: "$17250" },
                  { name: "Retiro esmalte semi", price: "$12650" },
                  { name: "Retiro capping", price: "$13800" },
                  { name: "Manicuria hombres", price: "$20700" },
                  { name: "Manicuria niñas", price: "$16100" },
                  { name: "Retiro de esculpidas", price: "$20700" },
                  { name: "Soft Gel", price: "$37950" }
                ]}
              />
              <ServiceCategory
                title="PIES"
                services={[
                  { name: "Belleza de pies semi french", price: "$34500" },
                  { name: "Belleza de pies tradicional french", price: "$26450" },
                  { name: "Belleza de pies c/esmalte tradicional", price: "$25300" },
                  { name: "Belleza de pies c/esmalte semi", price: "$29900" },
                  { name: "Pedicuria c/ esmalte tradicional", price: "$37950" },
                  { name: "Pedicuria básica", price: "$34500" },
                  { name: "Pedicuria c/esmalte semi", price: "$40250" },
                  { name: "Pedicuria hombres", price: "$34500" },
                  { name: "Belleza pies niñas", price: "$20700" },
                  { name: "Corte de uñas", price: "$17000" },
                  { name: "Esculpidas por uña", price: "$13800" },
                ]}
              />
            </div>
          </div>
          {/* Tratamientos Pedicura Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">TRATAMIENTOS PEDICURA</h3>
            <div className="space-y-2">
              <ServiceCategory
                title="Tratamientos"
                services={[
                  { name: "Pedicura básica", price: "$34500" },
                  { name: "Basica Micosis", price: "$36800" },
                  { name: "Fresado profundo de uña micoticas", price: "$44850" },
                  { name: "onocofosis y helemas interdigitales", price: "$44850" },
                  { name: "hiperqueratosis generalizada", price: "$44850" },
                  { name: "Uña encarnada basica", price: "$34500" },
                  { name: "Uña encarnada unilateral granuloma", price: "$55800" },
                  { name: "Uña encarnada bilateral granuloma", price: "$74200" },
                  { name: "Encarrilado con teflon/o pae/tapa acrilica", price: "$34500" },
                  { name: "Carrilla inmovilizadora o puente pae", price: "$34500" },
                  { name: "Lengueta expansora", price: "$34500" },
                  { name: "Implantes temporarios o sellados antimicotico", price: "$34500" },
                  { name: "Tratamiento verrugas c/u", price: "$26450" },
                  { name: "Sesion alta frecuencia", price: "$26450" },
                ]}
              />
            </div>
          </div>
          {/* Depilacion Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">DEPILACION</h3>
            <div className="space-y-2">
              <ServiceCategory
                title="HOMBRE"
                services={[
                  { name: "Cejas (cera/pinzita)", price: "$23000" },
                  { name: "Orejas", price: "$11500" },
                  { name: "Fosas", price: "$11500" },
                  { name: "Hombros", price: "$18400" },
                  { name: "Axilas", price: "$18400" },
                  { name: "Pecho", price: "$20700" },
                  { name: "Abdomen", price: "$20700" },
                  { name: "Torso", price: "$24150" },
                  { name: "Cintura", price: "$20700" },
                  { name: "Espalda", price: "$24150" },
                  { name: "Brazos", price: "$23000" },
                  { name: "Glúteos", price: "$23000" },
                  { name: "Pelvis completa", price: "$23000" },
                  { name: "Piernas", price: "$28750" },
                  { name: "Pies", price: "$11500" },
                ]}
              />
              <ServiceCategory title="MUJER">
                  <ServiceCategory title="ROSTRO"
                    services={[
                      { name: "Cejas (cera/pinzita)", price: "$17250" },
                      { name: "Bozo", price: "$11500" },
                      { name: "Patillas", price: "$11500" },
                      { name: "Pómulo", price: "$11500" },
                      { name: "Mentón", price: "$11500" },
                      { name: "Nuca", price: "$11500" },
                      { name: "Fosas", price: "$11500" },
                      { name: "Entrecejo", price: "$11500" },
                      { name: "Rostro compl. (no incluye cejas)", price: "$21850" },
                    ]}
                  />

                  <ServiceCategory
                    title="TORSO"
                    services={[
                      { name: "Espalda", price: "$12650" },
                      { name: "Cintura", price: "$11500" },
                      { name: "Abdomen", price: "$12650" },
                      { name: "Axila", price: "$11500" },
                      { name: "Busto", price: "$11500" },
                      { name: "Tiras varias", price: "$11500" },
                      { name: "Hombros", price: "$11500" },
                    ]}
                  />

                  <ServiceCategory
                    title="BRAZOS-PIERNAS-PELVIS"
                    services={[
                      { name: "Brazo completo", price: "$16100" },
                      { name: "Medio brazo", price: "$11500" },
                      { name: "Manos", price: "$11500" },
                      { name: "Media pierna", price: "$17250" },
                      { name: "Media con bikini", price: "$18400" },
                      { name: "Media pierna con cav. profundo", price: "$19550" },
                      { name: "Pierna entera", price: "$21850" },
                      { name: "Pierna entera con cav", price: "$21850" },
                      { name: "Pierna entera con cav profundo", price: "$24150" },
                      { name: "Bikini", price: "$10350" },
                      { name: "Bikini profundo", price: "$11500" },
                      { name: "Pelvis completa", price: "$13800" },
                      { name: "Muslo", price: "$16100" },
                      { name: "Muslo con bikini", price: "$18400" },
                      { name: "Muslo con bikini profundo", price: "$19550" },
                      { name: "Tira de cola", price: "$11500" },
                      { name: "Glúteos", price: "$14950" },
                      { name: "Tira de glúteos", price: "$11500" },
                      { name: "Pies", price: "$10350" },
                    ]}
                  />
              </ServiceCategory>
            </div>
          </div>
          {/* CEJAS Y PESTAÑAS Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              CEJAS, PESTAÑAS Y COSMETOLOGIA
            </h3>
            <div className="space-y-2">
              <ServiceCategory
                title="CEJAS"
                services={[
                  { name: "Disaño personalizado", price: "$23000" },
                  { name: "Depilación (cera, pinzita)", price: "$17250" },
                  { name: "Perfilado / Laminado", price: "$28750" },
                  { name: "Perfilado / Diseño / Color", price: "$34500" },
                ]}
              />
              <ServiceCategory
                title="PESTAÑAS"
                services={[
                  { name: "Lifting + Color (Con perfilado cejas)", price: "$46000" },
                  { name: "Color + Botox", price: "$34500" },
                  { name: "Solo Color o Solo Lifting", price: "$28750" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

