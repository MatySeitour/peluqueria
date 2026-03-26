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
              Precio Actualizado: 26/03/2026
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
                { name: "COMÚN", price: "$17500" },
                { name: "LOREAL", price: "$28750" },
                { name: "KERASTASSE", price: "$36800" },
                { name: "OLAPLEX", price: "$40250" },
                { name: "APLICACION (nutricion) LOREAL", price: "$28750" },
                { name: "APLICACION (nutricion) OLAPLEX", price: "$36800" },
                { name: "APLICACION (nutricion) KERASTASSE", price: "$34500" },
                { name: "APLICACION LAVADO (shampoo/acond)", price: "$20700" },
              ]}
            />
            <ServiceCategory
              title="NUTRICIONES"
              services={[
                { name: "LOREAL TODOS", price: "$40250" },
                { name: "KARSELL ", price: "$39100" },
                { name: "KERASTASSE", price: "$54050" },
              ]}
            />
            <ServiceCategory
              title="AMPOLLAS"
              services={[
                { name: "ALFAPARF", price: "$32200" },
                { name: "LOREAL", price: "$37950" },
                { name: "KERASTASSE", price: "$47150" },
                { name: "APLICACION AMPOLLAS", price: "$32200" },
              ]}
            />
            <ServiceCategory
              title="TRATAMIENTOS"
              services={[
                { name: "OLAPLEX PARA RULOS", price: "$124200" },
                { name: "OLAPLEX 4 EN 1", price: "$75900" },
                { name: "OLAPLEX profesional", price: "$124200" },
                { name: "LOREAL (TODOS)", price: "$82800" },
              ]}
            />
            <ServiceCategory
              title="KERATINA"
              services={[
                { name: "CORTO/MEDIO (hombros)", price: "$82800" },
                { name: "LARGO (cintura)", price: "$108100" },
                { name: "EXTRA LARGO", price: "$133400" },
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
              ]}
            />
            <ServiceCategory
              title="CORTES"
              services={[
                { name: "DAMA", price: "$32200" },
                { name: "CABALLEROS", price: "$32200" },
                { name: "NIÑO HASTA 12 AÑOS", price: "$29900" },
                { name: "BARBA", price: "$28750" },
                { name: "CORTE + BARBA", price: "$43700" },
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
                { name: "CORTO/MEDIO (hombros)", price: "$48300" },
                { name: "LARGO (cintura)", price: "$58650" },
                { name: "EXTRA LARGO", price: "$64400" },
              ]}
            />
            <ServiceCategory
              title="TRENZAS"
              services={[
                { name: "HASTA 2", price: "$0" },
                { name: "MAS DE 2", price: "$0" },
                { name: "PEINADOS/RECOGIDOS DESDE", price: "$69000" },
              ]}
            />
            <ServiceCategory title="COLORACION">
              <ServiceCategory
                title="INOA"
                services={[
                  { name: "RAIZ/MEDIO", price: "$103500" },
                  { name: "LARGO (completo)", price: "$120750" },
                  { name: "EXTRA LARGO", price: "$143750" },
                ]}
              />
              <ServiceCategory
                title="MAJIREL"
                services={[
                  { name: "RAIZ/MEDIO", price: "$81650" },
                  { name: "LARGO (completo)", price: "$102350" },
                  { name: "EXTRA LARGO", price: "$119600" },
                ]}
              />
              <ServiceCategory
                title="WELLA (color perfect)"
                services={[
                  { name: "RAIZ/MEDIO", price: "$89700" },
                  { name: "LARGO (completo)", price: "$106950" },
                  { name: "EXTRA LARGO", price: "$124200" },
                ]}
              />
              <ServiceCategory
                title="COLOR TOUCH"
                services={[
                  { name: "RAIZ/MEDIO", price: "$89700" },
                  { name: "LARGO", price: "$106950" },
                  { name: "EXTRA LARGO", price: "$124200" },
                ]}
              />
              <ServiceCategory
                title="SILKEY"
                services={[
                  { name: "RAIZ/MEDIO", price: "$69000" },
                  { name: "LARGO", price: "$85100" },
                  { name: "EXTRA LARGO", price: "$102350" },
                  { name: "APLICACION DE HENNA (todos los largos)", price: "$66700" },
                  { name: "APLICACION DE TINTURA (desde)", price: "$66700" },
                  { name: "BAÑO DE LUZ (desde)", price: "$63250" },
                  { name: "VINCHA RETOQUE", price: "$59800" },
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
                { name: "CONTORNO", price: "$59800" },
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
              services={[{ name: "DESDE", price: "$212750" }]}
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
                  { name: "Manicuria c/ esmalte tradicional", price: "$26450" },
                  { name: "Manicuria c/esmalte semi french", price: "$35650" },
                  { name: "Manicuria c/esmalte tradicional french", price: "$29900" },
                  { name: "Manicuria c/ esmalte semi", price: "$32200" },
                  { name: "Capping gel nivelacion", price: "$39100" },
                  { name: "Capping con poligel", price: "$41400" },
                  { name: "Soft gel por uña", price: "$13800" },
                  { name: "Capping por uña", price: "$8050" },
                  { name: "Cambio de esmalte tradicional", price: "$13800" },
                  { name: "Cambio de esmalte semi", price: "$20700" },
                  { name: "Retiro esmalte semi", price: "$13800" },
                  { name: "Retiro capping", price: "$17250" },
                  { name: "Manicuria hombres", price: "$24150" },
                  { name: "Manicuria niñas", price: "$18400" },
                  { name: "Retiro de esculpidas", price: "$24150" },
                  { name: "Soft Gel DESDE", price: "$43700" },
                ]}
              />
              <ServiceCategory
                title="PIES"
                services={[
                  { name: "Belleza de pies semi french", price: "$39100" },
                  { name: "Belleza de pies tradicional french", price: "$31050" },
                  { name: "Belleza de pies c/esmalte tradicional", price: "$28750" },
                  { name: "Belleza de pies c/esmalte semi", price: "$34500" },
                  { name: "Pedicuria c/ esmalte tradicional", price: "$43700" },
                  { name: "Pedicuria básica", price: "$40250" },
                  { name: "Pedicuria c/esmalte semi", price: "$46000" },
                  { name: "Pedicuria hombres", price: "$40250" },
                  { name: "Belleza pies niñas", price: "$24150" },
                  { name: "Corte de uñas", price: "$21850" },
                  { name: "Esculpidas por uña", price: "$17250" },
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
                  { name: "onocofosis y helemas interdigitales", price: "$51750" },
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
                  { name: "Cejas (cera/pinzita)", price: "$23000" },
                  { name: "Orejas", price: "$13800" },
                  { name: "Fosas", price: "$13800" },
                  { name: "Hombros", price: "$21850" },
                  { name: "Axilas", price: "$21850" },
                  { name: "Pecho", price: "$25300" },
                  { name: "Abdomen", price: "$24150" },
                  { name: "Torso", price: "$28750" },
                  { name: "Cintura", price: "$24150" },
                  { name: "Espalda", price: "$28750" },
                  { name: "Brazos", price: "$26450" },
                  { name: "Glúteos", price: "$26450" },
                  { name: "Pelvis completa", price: "$26450" },
                  { name: "Piernas", price: "$34500" },
                  { name: "Pies", price: "$13800" },
                ]}
              />
              <ServiceCategory title="MUJER">
                  <ServiceCategory title="ROSTRO"
                    services={[
                      { name: "Cejas (cera/pinzita)", price: "$23000" },
                      { name: "Bozo", price: "$13800" },
                      { name: "Patillas", price: "$13800" },
                      { name: "Pómulo", price: "$13800" },
                      { name: "Mentón", price: "$13800" },
                      { name: "Nuca", price: "$13800" },
                      { name: "Fosas", price: "$13800" },
                      { name: "Entrecejo", price: "$13800" },
                      { name: "Rostro compl. (no incluye cejas)", price: "$25300" },
                    ]}
                  />

                  <ServiceCategory
                    title="TORSO"
                    services={[
                      { name: "Espalda", price: "$17250" },
                      { name: "Cintura", price: "$13800" },
                      { name: "Abdomen", price: "$14950" },
                      { name: "Axila", price: "$13800" },
                      { name: "Busto", price: "$13800" },
                      { name: "Tiras varias", price: "$13800" },
                      { name: "Hombros", price: "$13800" },
                    ]}
                  />

                  <ServiceCategory
                    title="BRAZOS-PIERNAS-PELVIS"
                    services={[
                      { name: "Brazo completo", price: "$19550" },
                      { name: "Medio brazo", price: "$13800" },
                      { name: "Manos", price: "$13800" },
                      { name: "Media pierna", price: "$20700" },
                      { name: "Media con bikini", price: "$21850" },
                      { name: "Media pierna con cav. profundo", price: "$23000" },
                      { name: "Pierna entera", price: "$25300" },
                      { name: "Pierna entera con cav", price: "$25300" },
                      { name: "Pierna entera con cav profundo", price: "$28750" },
                      { name: "Bikini", price: "$12650" },
                      { name: "Bikini profundo", price: "$17250" },
                      { name: "Pelvis completa", price: "$23000" },
                      { name: "Muslo", price: "$19550" },
                      { name: "Muslo con bikini", price: "$26450" },
                      { name: "Muslo con bikini profundo", price: "$29900" },
                      { name: "Tira de cola", price: "$17250" },
                      { name: "Glúteos", price: "$23000" },
                      { name: "Tira de glúteos", price: "$17250" },
                      { name: "Pies", price: "$17250" },
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
                  { name: "Depilación (cera, pinzita)", price: "$20700" },
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