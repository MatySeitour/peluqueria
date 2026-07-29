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
            <ServiceCategory
              title="LAVADO"
              services={[
                { name: "COMÚN", price: "$19550" },
                { name: "LOREAL", price: "$28750" },
                { name: "KERASTASSE", price: "$40250" },
                { name: "OLAPLEX", price: "$42550" },
                { name: "APLICACION (nutricion) LOREAL", price: "$31050" },
                { name: "APLICACION (nutricion) OLAPLEX", price: "$40250" },
                { name: "APLICACION (nutricion) KERASTASSE", price: "$37950" },
                { name: "APLICACION LAVADO (shampoo/acond)", price: "$23000" },
              ]}
            />
            <ServiceCategory
              title="NUTRICIONES"
              services={[
                { name: "LOREAL TODOS", price: "$43700" },
                { name: "KARSELL ", price: "$41400" },
                { name: "KERASTASSE", price: "$59800" },
              ]}
            />
            <ServiceCategory
              title="AMPOLLAS"
              services={[
                { name: "ALFAPARF", price: "$36800" },
                { name: "KERASTASSE (solo ampolla)", price: "$49450" },
                { name: "KERASTASSE + BOSTER", price: "$60500" },
                { name: "APLICACION AMPOLLAS", price: "$34500" },
              ]}
            />
            <ServiceCategory
              title="TRATAMIENTOS"
              services={[
                { name: "OLAPLEX PARA RULOS", price: "$138000" },
                { name: "OLAPLEX 4 EN 1", price: "$82800" },
                { name: "OLAPLEX profesional", price: "$138000" },
                { name: "LOREAL (vitamino/absolut repair)", price: "$82500" },
                { name: "LOREAL MOLECULAR / METAL DETOX", price: "$89700" },
                { name: "LOREAL VITAMINO SPECTRUM", price: "$109250" },
                { name: "KERASTASSE professional", price: "$112700" },
                { name: "KERASTASSE GLOSS ABSOLUT", price: "$112700" },
                { name: "KERASTASSE CRONOLOGISTE", price: "$126500" },
              ]}
            />
            <ServiceCategory
              title="KERATINA"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$82800" },
                { name: "LARGO (cintura)", price: "$108100" },
                { name: "EXTRA LARGO", price: "$133400" },
                { name: "FLEQUILLO/CONTORNO", price: "$57500" },
              ]}
            />
            <ServiceCategory
              title="ALISADOS"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$108100" },
                { name: "LARGO (cintura)", price: "$179400" },
                { name: "EXTRA LARGO", price: "$253000" },
                { name: "FLEQUILLO / CONTORNO", price: "$71300" },
              ]}
            />
            <ServiceCategory
              title="BOTOX"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$82800" },
                { name: "LARGO (cintura)", price: "$108100" },
                { name: "EXTRA LARGO", price: "$133400" },
                { name: "FLEQUILLO/CONTORNO", price: "$57500" },
              ]}
            />
            <ServiceCategory
              title="CORTES"
              services={[
                { name: "DAMA", price: "$37950" },
                { name: "CABALLEROS", price: "$37950" },
                { name: "NIÑO HASTA 12 AÑOS", price: "$34500" },
                { name: "BARBA", price: "$33350" },
                { name: "CORTE + BARBA", price: "$49450" },
                { name: "FLEQUILLO", price: "$23000" },
              ]}
            />
            <ServiceCategory
              title="BRUSHING"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$29900" },
                { name: "LARGO (cintura)", price: "$32200" },
                { name: "EXTRA LARGO", price: "$37950" },
                { name: "MAS PLANCHITA CORTO/MEDIO", price: "$34500" },
                { name: "MAS PLANCHITA LARGO", price: "$37950" },
                { name: "MAS PLANCHITA EXTRA LARGO", price: "$43700" },
              ]}
            />
            <ServiceCategory
              title="SECADO MODELADO"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$18400" },
                { name: "LARGO (cintura)", price: "$21850" },
                { name: "EXTRA LARGO", price: "$27600" },
              ]}
            />
            <ServiceCategory
              title="ONDAS"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$51750" },
                { name: "LARGO (cintura)", price: "$64400" },
                { name: "EXTRA LARGO", price: "$69000" },
              ]}
            />
            <ServiceCategory
              title="PEINADOS"
              services={[
                { name: "PEINADOS/RECOGIDOS DESDE", price: "$75900" },
              ]}
            />
            <ServiceCategory title="COLORACION">
              <ServiceCategory
                title="INOA"
                services={[
                  { name: "RAIZ/MEDIO", price: "$113850" },
                  { name: "LARGO (completo)", price: "$132250" },
                  { name: "EXTRA LARGO", price: "$155250" },
                ]}
              />
              <ServiceCategory
                title="MAJIREL"
                services={[
                  { name: "RAIZ/MEDIO", price: "$89700" },
                  { name: "LARGO (completo)", price: "$102350" },
                  { name: "EXTRA LARGO", price: "$119600" },
                ]}
              />
              <ServiceCategory
                title="WELLA (color perfect)"
                services={[
                  { name: "RAIZ/MEDIO", price: "$97750" },
                  { name: "LARGO (completo)", price: "$108100" },
                  { name: "EXTRA LARGO", price: "$124200" },
                ]}
              />
              <ServiceCategory
                title="COLOR TOUCH"
                services={[
                  { name: "RAIZ/MEDIO", price: "$97750" },
                  { name: "LARGO", price: "$108100" },
                  { name: "EXTRA LARGO", price: "$124200" },
                ]}
              />
              <ServiceCategory
                title="IGORA"
                services={[
                  { name: "RAIZ/MEDIO", price: "$74750" },
                  { name: "LARGO (completo)", price: "$86250" },
                  { name: "EXTRA LARGO", price: "$102350" },
                  { name: "APLICACION DE HENNA (todos los largos)", price: "$69000" },
                  { name: "APLICACION DE TINTURA (desde)", price: "$69000" },
                  { name: "BAÑO DE LUZ (desde)", price: "$71300" },
                  { name: "VINCHA RETOQUE", price: "$65550" },
                ]}
              />
              <ServiceCategory
                title="IGORA ZERO"
                services={[
                  { name: "RAIZ/MEDIO", price: "$108100" },
                  { name: "LARGO (completo)", price: "$126500" },
                  { name: "EXTRA LARGO", price: "$132250" },
                ]}
              />
            </ServiceCategory>
            <ServiceCategory
              title="MECHAS LOCALIZADAS"
              services={[
                { name: "CORTO/MEDIO", price: "$172500" },
                { name: "LARGO (cintura)", price: "$189750" },
                { name: "EXTRA LARGO", price: "$212750" },
                { name: "MEDIA CABEZA", price: "$109250" },
                { name: "CONTORNO", price: "$63250" },
              ]}
            />
            <ServiceCategory
              title="REFLEJOS CON GORRA"
              services={[
                { name: "CORTO/MEDIO", price: "$172500" },
                { name: "LARGO (cintura)", price: "$189750" },
                { name: "EXTRA LARGO", price: "$212750" },
              ]}
            />
            <ServiceCategory
              title="BALAYAGE"
              services={[{ name: "DESDE", price: "$207000" }]}
            />
            <ServiceCategory
              title="DECOLORACIÓN"
              services={[
                { name: "CORTO/MEDIO", price: "$98900" },
                { name: "LARGO (cintura)", price: "$105800" },
                { name: "EXTRA LARGO", price: "$112700" },
              ]}
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
                  { name: "Manicuria c/ esmalte tradicional", price: "$28750" },
                  { name: "Manicuria c/esmalte semi french", price: "$39100" },
                  { name: "Manicuria c/esmalte tradicional french", price: "$32200" },
                  { name: "Manicuria c/ esmalte semi", price: "$34500" },
                  { name: "Capping gel nivelacion", price: "$42550" },
                  { name: "Capping con poligel", price: "$44850" },
                  { name: "Soft gel por uña", price: "$14950" },
                  { name: "Capping por uña", price: "$9200" },
                  { name: "Cambio de esmalte tradicional", price: "$16100" },
                  { name: "Cambio de esmalte semi", price: "$23000" },
                  { name: "Retiro esmalte semi", price: "$17250" },
                  { name: "Retiro capping", price: "$19550" },
                  { name: "Manicuria hombres", price: "$26450" },
                  { name: "Manicuria niñas", price: "$20700" },
                  { name: "Retiro de esculpidas", price: "$26450" },
                  { name: "Soft Gel DESDE", price: "$46000" },
                ]}
              />
              <ServiceCategory
                title="PIES"
                services={[
                  { name: "Belleza de pies semi french", price: "$42550" },
                  { name: "Belleza de pies tradicional french", price: "$33350" },
                  { name: "Belleza de pies c/esmalte tradicional", price: "$31050" },
                  { name: "Belleza de pies c/esmalte semi", price: "$37950" },
                  { name: "Pedicuria c/ esmalte tradicional", price: "$46000" },
                  { name: "Pedicuria básica", price: "$43700" },
                  { name: "Pedicuria c/esmalte semi", price: "$50600" },
                  { name: "Pedicuria hombres", price: "$43700" },
                  { name: "Belleza pies niñas", price: "$26450" },
                  { name: "Corte de uñas", price: "$25300" },
                  { name: "Esculpidas por uña", price: "$23000" },
                ]}
              />
              <ServiceCategory
                title="Diseño Nail Art"
                services={[
                  { name: "Adicional decoracion de uñas", price: "$11500" },
                  { name: "Adicional por uña", price: "$3450" },
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
                  { name: "Pedicura básica", price: "$40250" },
                  { name: "Basica Micosis", price: "$42550" },
                  { name: "Fresado profundo de uña micoticas", price: "$51750" },
                  { name: "onocofosis y helomas interdigitales", price: "$51750" },
                  { name: "hiperqueratosis generalizada", price: "$40250" },
                  { name: "Uña encarnada basica", price: "$40250" },
                  { name: "Uña encarnada unilateral granuloma", price: "$64400" },
                  { name: "Uña encarnada bilateral granuloma", price: "$85100" },
                  { name: "Encarrilado con teflon/o pae/tapa acrilica", price: "$40250" },
                  { name: "Carrilla inmovilizadora o puente pae", price: "$40250" },
                  { name: "Lengueta expansora", price: "$40250" },
                  { name: "Implantes temporarios o sellados antimicotico", price: "$40250" },
                  { name: "Tratamiento verrugas c/u", price: "$31050" },
                  { name: "Sesion alta frecuencia", price: "$31050" },
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
                  { name: "Cejas (cera/pinzita)", price: "$28750" },
                  { name: "Orejas", price: "$16100" },
                  { name: "Fosas", price: "$16100" },
                  { name: "Hombros", price: "$23500" },
                  { name: "Axilas", price: "$26450" },
                  { name: "Pecho", price: "$28750" },
                  { name: "Abdomen", price: "$27600" },
                  { name: "Torso", price: "$33350" },
                  { name: "Cintura", price: "$27600" },
                  { name: "Espalda", price: "$33350" },
                  { name: "Brazos", price: "$29900" },
                  { name: "Glúteos", price: "$29900" },
                  { name: "Pelvis completa", price: "$29900" },
                  { name: "Piernas", price: "$40250" },
                  { name: "Pies", price: "$17250" },
                ]}
              />
              <ServiceCategory title="MUJER">
                  <ServiceCategory title="ROSTRO"
                    services={[
                      { name: "Cejas (cera/pinzita)", price: "$26450" },
                      { name: "Bozo", price: "$16100" },
                      { name: "Patillas", price: "$16100" },
                      { name: "Pómulo", price: "$16100" },
                      { name: "Mentón", price: "$16100" },
                      { name: "Nuca", price: "$16100" },
                      { name: "Fosas", price: "$16100" },
                      { name: "Entrecejo", price: "$16100" },
                      { name: "Rostro compl. (no incluye cejas)", price: "$28750" },
                    ]}
                  />

                  <ServiceCategory
                    title="TORSO"
                    services={[
                      { name: "Espalda", price: "$20700" },
                      { name: "Cintura", price: "$16100" },
                      { name: "Abdomen", price: "$17250" },
                      { name: "Axila", price: "$16100" },
                      { name: "Busto", price: "$16100" },
                      { name: "Tiras varias", price: "$16100" },
                      { name: "Hombros", price: "$16100" },
                    ]}
                  />

                  <ServiceCategory
                    title="BRAZOS-PIERNAS-PELVIS"
                    services={[
                      { name: "Brazo completo", price: "$23000" },
                      { name: "Medio brazo", price: "$16100" },
                      { name: "Manos", price: "$16100" },
                      { name: "Media pierna", price: "$25300" },
                      { name: "Media con bikini", price: "$25300" },
                      { name: "Media pierna con cav. profundo", price: "$26450" },
                      { name: "Pierna entera", price: "$28750" },
                      { name: "Pierna entera con cav", price: "$28750" },
                      { name: "Pierna entera con cav profundo", price: "$33350" },
                      { name: "Bikini", price: "$14950" },
                      { name: "Bikini profundo", price: "$20700" },
                      { name: "Pelvis completa", price: "$26450" },
                      { name: "Muslo", price: "$23000" },
                      { name: "Muslo con bikini", price: "$29900" },
                      { name: "Muslo con bikini profundo", price: "$34500" },
                      { name: "Tira de cola", price: "$20700" },
                      { name: "Glúteos", price: "$26450" },
                      { name: "Tira de glúteos", price: "$20700" },
                      { name: "Pies", price: "$20700" },
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
                  { name: "Diseño personalizado", price: "$28750" },
                  { name: "Depilación (cera, pinzita)", price: "$26450" },
                  { name: "Perfilado / Laminado", price: "$34500" },
                  { name: "Perfilado / Diseño / Color", price: "$40250" },
                ]}
              />
              <ServiceCategory
                title="PESTAÑAS"
                services={[
                  { name: "Lifting + Color (Con perfilado cejas)", price: "$52900" },
                  { name: "Color + Botox", price: "$40250" },
                  { name: "Solo Color o Solo Lifting", price: "$34500" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
