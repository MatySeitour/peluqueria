import ServiceCategory from "../components/ServiceCategory"

export default function ServiciosPage() {
  return (
    <section 
    className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row h-[70vh]">
        {/* Left Side - Red Background with Image */}
        <div className="relative w-full md:w-3/5 h-full ">
          <img src="/services.webp" alt="PHOTO" className="w-full h-full object-cover object-center" />
          <div className="absolute top-0 left-0 bg-black/40 h-full w-full" />
        </div>

        {/* Right Side - Black Background with Title */}
        <div className="w-full md:w-2/5 bg-black h-full flex flex-col justify-center items-start p-6 md:p-12">
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
      <div
      id="servicios"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 lg:p-10 scroll-mt-24">
        {/* Left Column - Peluqueria Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">PELUQUERIA</h3>
          <div className="space-y-2">
            <ServiceCategory title="LAVADO" 
            services={[
              { name: "COMÚN", price: "$9200" },
              { name: "LOREAL", price: "$18400" },
              { name: "KERASTASSE", price: "$27600" },
              { name: "CON MASAJES", price: "$17250" },
            ]}
            />
            <ServiceCategory title="NUTRICIONES" 
            services={[
              { name: "HAIR THERAPY", price: "$23000" },
              { name: "LOREAL", price: "$31050" },
              { name: "KERASTASSE", price: "$41400" },
            ]}
            />
            <ServiceCategory title="AMPOLLAS" 
            services={[
              { name: "ALFAPARF", price: "$25300" },
              { name: "LOREAL", price: "$28750" },
              { name: "KERASTASSE", price: "-" },
            ]}
            />
            <ServiceCategory title="KERATINA" 
            services={[
              { name: "CORTO/MEDIO (hombros)", price: "$55200" },
              { name: "LARGO", price: "$64400" },
            ]}
            />
            <ServiceCategory title="ALISADOS" 
            services={[
              { name: "CORTO/MEDIO (hombros)", price: "$80500" },
              { name: "LARGO", price: "$138000" },
              { name: " FEQUILLO/CONTORNO", price: "$47150" },
            ]}
            />
            <ServiceCategory title="BOTOX" 
            services={[
              { name: "CORTO/MEDIO (hombros)", price: "$53250" },
              { name: "LARGO", price: "$97750" },
            ]}
            />
            <ServiceCategory title="CORTES" 
            services={[
              { name: "DAMA", price: "$20700" },
              { name: "CABALLEROS", price: "$20700" },
              { name: "NIÑO HASTA 12 AÑOS", price: "$18400" },
              { name: "BARBA", price: "$18400" },
              { name: "CORTE + BARBA", price: "$28750" },
              { name: "FLEQUILLO", price: "$13800" },
            ]}
            />
            <ServiceCategory title="BRUSHING" 
            services={[
            { name: "CORTO/MEDIO (hombros)", price: "$17250" },
            { name: "LARGO", price: "$24150" },
            { name: "MAS PLANCHITA CORTO/MEDIO", price: "$23000" },
            { name: "MAS PLANCHITA LARGO", price: "$29900" }
            ]}
            />
            <ServiceCategory title="SECADO MODELADO" 
            services={[
              { name: "CORTO/MEDIO (hombros)", price: "$10350" },
              { name: "LARGO", price: "$14950" },
            ]}
            />
            <ServiceCategory title="ONDAS" 
            services={[
              { name: "CORTO/MEDIO (hombros)", price: "$31050" },
              { name: "LARGO", price: "$40250" },
            ]}/>
            <ServiceCategory title="TRENZAS"
            services={[
              { name: "HASTA 2", price: "$0" },
              { name: "MAS DE 2", price: "$0"},
              { name: "PEINADOS/RECOGIDOS DESDE", price: "$46000" },
            ]} />
            <ServiceCategory title="COLORACION">
              <ServiceCategory title="INOA" 
              services={[
                { name: "RAIZ/MEDIO", price: "$80500" },
                { name: "LARGO (completo)", price: "$97750"},
              ]}
              />
              <ServiceCategory title="MAJIREL" 
              services={[
                { name: "RAIZ/MEDIO", price: "$63250" },
                { name: "LARGO (completo)", price: "$86250"},
              ]}
              />
              <ServiceCategory title="WELLA" 
              services={[
                { name: "RAIZ/MEDIO", price: "$57500" },
                { name: "LARGO (completo)", price: "$74750"},
              ]}
              />
              <ServiceCategory title="SILKEY" 
              services={[
                { name: "RAIZ/MEDIO", price: "$51750" },
                { name: "LARGO (completo)", price: "$69000"},
                { name: "APLICACION DE TINTURA", price: "$46000" },
                { name: "BAÑO DE LUZ", price: "$51750"},
              ]}
              />
            </ServiceCategory>
            <ServiceCategory title="MECHAS LOCALIZADAS" 
            services={[
              { name: "RAIZ/MEDIO", price: "$103500" },
              { name: "LARGO (completo)", price: "$138000"},
              { name: "MEDIA CABEZA", price: "$74750" },
              { name: "CONTORNO", price: "$51750"},
            ]}
            />
            <ServiceCategory title="REFLEJOS CON GORRA" 
            services={[
              { name: "RAIZ/MEDIO", price: "$97750" },
              { name: "LARGO", price: "$132250"},           
            ]}/>
            <ServiceCategory title="BALAYAGE" 
            services={[
              { name: "DESDE", price: "$149500" }
            ]}/>
          </div>
        </div>

        {/* Right Column - Other Sections */}
        <div className="space-y-8">
          {/* MANOS Y PIES Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">MANOS Y PIES</h3>
            <div className="space-y-2">
            <ServiceCategory title="MANOS" 
            services={[
              { name: "Manicuria c/ esmalte tradicional", price: "$17250" },
              { name: "Manicuria c/esmalte semi french", price: "$26450" },
              { name: "Manicuria c/esmalte tradicional french", price: "$18400" },
              { name: "Manicuria c/ esmalte semi", price: "$23000" },
              { name: "Capping gel nivelacion", price: "$25300" },
              { name: "Capping con poligel", price: "$28750" },
              { name: "Soft gel por uña", price: "$8050" },
              { name: "Capping por uña", price: "$5750" },
              { name: "Cambio de esmalte tradicional", price: "$9200" },
              { name: "Cambio de esmalte semi", price: "$13800" },
              { name: "Retiro esmalte semi", price: "$10350" },
              { name: "Retiro capping", price: "$11500" },
              { name: "Manicuria hombres", price: "$17250" },
              { name: "Manicuria niñas", price: "$13800" },
              { name: "Esculpidas c/semi DESDE", price: "$40250" },
              { name: "Servis esculpidas", price: "$34500" },
              { name: "Baby boomer esculpidas", price: "--" },
              { name: "Baby boomer capping", price: "--" },
              { name: "Retiro de esculpidas", price: "$17250" },
              { name: "Soft Gel", price: "$28750" },
              { name: "Esculpidas por uña", price: "$11500" },
            ]}
            />
            <ServiceCategory title="PIES" 
            services={[
              { name: "Belleza de pies c/esmalte tradicional", price: "$20700" },
              { name: "Belleza de pies c/esmalre semi", price: "$23000" },
              { name: "Pedicuria c/ esmalte tradicional", price: "$32200" },
              { name: "Pedicuria básica", price: "$28750" },
              { name: "Pedicuria c/esmalte semi", price: "$34500" },
              { name: "Pedicuria hombres", price: "$28750" },
              { name: "Belleza pies niñas", price: "$17250" },
              { name: "Corte de uñas", price: "$13800" },
            ]}
            />
            </div>
          </div>
          {/* Depilacion Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">DEPILACION</h3>
            <div className="space-y-2">
              <ServiceCategory title="ZONAS" 
              services={[
                { name: "Cejas (cera/pinzita)", price: "$13800" },
                { name: "Orejas", price: "$10350" },
                { name: "Fosas", price: "$10350" },
                { name: "Hombros", price: "$13800" },
                { name: "Axilas", price: "$10350" },
                { name: "Pecho", price: "$17250" },
                { name: "Abdomen", price: "$17250" },
                { name: "Torso", price: "$21850" },
                { name: "Cintura", price: "$17250" },
                { name: "Espalda", price: "$21850" },
                { name: "Brazos", price: "$17250" },
                { name: "Glúteos", price: "$17250" },
                { name: "Pelvis completa", price: "$18400" },
                { name: "Piernas", price: "$21850" },
                { name: "Pies", price: "$10350" },
              ]}
              />
              <ServiceCategory title="MUJER">
                <ServiceCategory title="ROSTRO" 
                services={[
                  // ROSTRO
                  { name: "Cejas (cera/pinzita)", price: "$11500" },
                  { name: "Bozo", price: "$10350" },
                  { name: "Patillas", price: "$10350" },
                  { name: "Pómulo", price: "$10350" },
                  { name: "Mentón", price: "$10350" },
                  { name: "Nuca", price: "$10350" },
                  { name: "Fosas", price: "$10350" },
                  { name: "Entrecejo", price: "$10350" },
                  { name: "Rostro compl. (no incluye cejas)", price: "$10350" }, // (¿error en el precio? Es más bajo que cejas solas)
                ]}
                />
                <ServiceCategory title="TORSO" 
                services={[
                  { name: "Espalda", price: "$11500" },
                  { name: "Cintura", price: "$10350" },
                  { name: "Abdomen", price: "$10350" },
                  { name: "Axila", price: "$10350" },
                  { name: "Busto", price: "$10350" },
                  { name: "Tiras varias", price: "$10350" },
                  { name: "Hombros", price: "$10350" },
                ]}
                />
                <ServiceCategory title="BRAZOS-PIERNAS-PELVIS" 
                services={[
                  { name: "Brazo completo", price: "$14950" },
                  { name: "Medio brazo", price: "$10350" },
                  { name: "Manos", price: "$9200" },
                  { name: "Media pierna", price: "$13800" },
                  { name: "Media con bikini", price: "$16100" },
                  { name: "Media pierna con cav. profundo", price: "$17250" },
                  { name: "Pierna entera", price: "$19550" },
                  { name: "Pierna entera con cav", price: "$18400" },
                  { name: "Pierna entera con cav profundo", price: "$21850" },
                  { name: "Bikini", price: "$10350" },
                  { name: "Bikini profundo", price: "$10350" },
                  { name: "Pelvis completa", price: "$12350" },
                  { name: "Muslo", price: "$12350" },
                  { name: "Muslo con bikini", price: "$13800" },
                  { name: "Muslo con bikini profundo", price: "$16100" },
                  { name: "Tira de cola", price: "$10350" },
                  { name: "Glúteos", price: "$10350" },
                  { name: "Tira de glúteos", price: "$10350" },
                  { name: "Pies", price: "$10350" },
                ]}
                />
              </ServiceCategory>
            </div>
          </div>
          {/* CEJAS Y PESTAÑAS Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">CEJAS, PESTAÑAS Y COSMETOLOGIA</h3>
            <div className="space-y-2">
            <ServiceCategory title="CEJAS" 
              services={[
                { name: "Disaño personalizado", price: "$17250" },
                { name: "Depilación (cera, pinzita)", price: "$11500" },
                { name: "Perfilado / Laminado", price: "$23000" },
                { name: "Perfilado / Diseño / Color", price: "$28750" },
              ]}
              />
              <ServiceCategory title="PESTAÑAS" 
              services={[
                { name: "Lifting + Color (Con perfilado cejas)", price: "$40250" },
                { name: "Color + Botox", price: "$28750" },
                { name: "Solo Color o Solo Lifting", price: "$23000" },
              ]}
              />
              {/* <ServiceCategory title="COSMETOLOGIA" 
              services={[
                { name: "Limpieza facial basica", price: "-" },
                { name: "Limpieza facial profunda ", price: "-" },
                { name: "Dermapen facial", price: "-" },
                { name: "Dermapen corporal", price: "-" },
                { name: "Dermaplaning", price: "-" },
                { name: "Peeling quimico", price: "-" },
                { name: "BB lips", price: "-" },
                { name: "BB glow", price: "-" },
              ]}
              /> */}
            </div>
          </div>
          {/* TRATAMIENTOS Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">TRATAMIENTOS</h3>
            <div className="space-y-2"></div>
          <ServiceCategory title="TRATAMIENTOS" 
              services={[
                { name: "Pedicuria básica", price: "$28750" },
                { name: "Básica micosis", price: "$31050" },
                { name: "Fresado profundo de uñas micóticas", price: "$39100" },
                { name: "Onicofosis y helomas interdigitales", price: "$39100" },
                { name: "Hiperqueratosis generalizada", price: "$29900" },
                { name: "Uña encarnada básica", price: "$29900" },
                { name: "Uña encarnada unilateral granuloma", price: "$48300" },
                { name: "Uña encarnada bilateral granuloma", price: "$64400" },
                { name: "Encarrilado con teflón / PAE / tapa acrílica", price: "$29900" },
                { name: "Carrilla inmovilizadora o puente PAE", price: "$29900" },
                { name: "Lengüeta expansora", price: "$29900" },
                { name: "Implantes temporarios o sellados antimicótico", price: "$29900" },
                { name: "Tratamiento verrugas c/u", price: "$23000" },
                { name: "Sesión alta frecuencia", price: "$23000" },
              ]}
            />
        </div>
      </div>
    </div>
    </section>
  )
}

