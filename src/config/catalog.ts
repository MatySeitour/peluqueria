// Catálogo completo de servicios (categorías -> grupos -> variantes con precio y
// duración). Es la fuente única de verdad: tanto /servicios (lista de precios)
// como el flujo de reservas leen de acá para no mantener dos copias.
// No importar nada de React/DOM/Node acá para que sea usable desde ambos lados.

export type EmployeeSkill = "peluqueria" | "unas" | "estetica";

export const SKILL_LABELS: Record<EmployeeSkill, string> = {
  peluqueria: "Peluquería",
  unas: "Uñas",
  estetica: "Estética",
};

export interface ServiceVariant {
  /** Slug estable, único en todo el catálogo. No renombrar una vez que haya reservas creadas. */
  id: string;
  name: string;
  /** TODO: son estimaciones de arranque, ajustar con los tiempos reales del salón. */
  durationMinutes: number;
  /** Precio en pesos argentinos. Actualizado: 01/07/2026. */
  price: number;
  /**
   * false = solo informativo en /servicios, no se puede reservar como turno
   * independiente (ej. adicionales que van pegados a otro servicio). Default true.
   */
  bookable?: boolean;
}

export interface ServiceGroup {
  title: string;
  variants: ServiceVariant[];
}

export interface ServiceCategoryDef {
  id: string;
  label: string;
  /** Habilidad que necesita la empleada para atender cualquier servicio de esta categoría. */
  skill: EmployeeSkill;
  /** Foto de portada para la grilla de categorías. */
  image: string;
  groups: ServiceGroup[];
}

export const CATALOG: ServiceCategoryDef[] = [
  {
    id: "peluqueria",
    label: "Peluquería",
    skill: "peluqueria",
    image: "/peinado.webp",
    groups: [
      {
        title: "Cortes",
        variants: [
          { id: "pelu-cortes-dama", name: "Dama", durationMinutes: 45, price: 37950 },
          { id: "pelu-cortes-caballeros", name: "Caballeros", durationMinutes: 45, price: 37950 },
          { id: "pelu-cortes-nino", name: "Niño hasta 12 años", durationMinutes: 30, price: 34500 },
          { id: "pelu-cortes-barba", name: "Barba", durationMinutes: 20, price: 33350 },
          { id: "pelu-cortes-corte-barba", name: "Corte + Barba", durationMinutes: 60, price: 49450 },
          { id: "pelu-cortes-flequillo", name: "Flequillo", durationMinutes: 15, price: 23000 },
        ],
      },
      {
        title: "Lavado",
        variants: [
          { id: "pelu-lavado-comun", name: "Común", durationMinutes: 20, price: 19550 },
          { id: "pelu-lavado-loreal", name: "Loreal", durationMinutes: 20, price: 28750 },
          { id: "pelu-lavado-kerastasse", name: "Kerastasse", durationMinutes: 20, price: 40250 },
          { id: "pelu-lavado-olaplex", name: "Olaplex", durationMinutes: 20, price: 42550 },
          { id: "pelu-lavado-nutricion-loreal", name: "Aplicación (nutrición) Loreal", durationMinutes: 35, price: 31050 },
          { id: "pelu-lavado-nutricion-olaplex", name: "Aplicación (nutrición) Olaplex", durationMinutes: 35, price: 40250 },
          { id: "pelu-lavado-nutricion-kerastasse", name: "Aplicación (nutrición) Kerastasse", durationMinutes: 35, price: 37950 },
          { id: "pelu-lavado-aplicacion", name: "Aplicación lavado (shampoo/acond.)", durationMinutes: 20, price: 23000 },
        ],
      },
      {
        title: "Nutriciones",
        variants: [
          { id: "pelu-nutriciones-loreal", name: "Loreal (todos)", durationMinutes: 30, price: 43700 },
          { id: "pelu-nutriciones-karsell", name: "Karsell", durationMinutes: 30, price: 41400 },
          { id: "pelu-nutriciones-kerastasse", name: "Kerastasse", durationMinutes: 35, price: 59800 },
        ],
      },
      {
        title: "Ampollas",
        variants: [
          { id: "pelu-ampollas-alfaparf", name: "Alfaparf", durationMinutes: 20, price: 36800 },
          { id: "pelu-ampollas-kerastasse", name: "Kerastasse (solo ampolla)", durationMinutes: 20, price: 49450 },
          { id: "pelu-ampollas-kerastasse-boster", name: "Kerastasse + Boster", durationMinutes: 30, price: 60500 },
          { id: "pelu-ampollas-aplicacion", name: "Aplicación ampollas", durationMinutes: 20, price: 34500 },
        ],
      },
      {
        title: "Tratamientos capilares",
        variants: [
          { id: "pelu-tratam-olaplex-rulos", name: "Olaplex para rulos", durationMinutes: 60, price: 138000 },
          { id: "pelu-tratam-olaplex-4en1", name: "Olaplex 4 en 1", durationMinutes: 50, price: 82800 },
          { id: "pelu-tratam-olaplex-profesional", name: "Olaplex profesional", durationMinutes: 60, price: 138000 },
          { id: "pelu-tratam-loreal-absolut", name: "Loreal (vitamino/absolut repair)", durationMinutes: 45, price: 82500 },
          { id: "pelu-tratam-loreal-metal-detox", name: "Loreal molecular / metal detox", durationMinutes: 50, price: 89700 },
          { id: "pelu-tratam-loreal-spectrum", name: "Loreal vitamino spectrum", durationMinutes: 55, price: 109250 },
          { id: "pelu-tratam-kerastasse-professional", name: "Kerastasse professional", durationMinutes: 55, price: 112700 },
          { id: "pelu-tratam-kerastasse-gloss", name: "Kerastasse gloss absolut", durationMinutes: 55, price: 112700 },
          { id: "pelu-tratam-kerastasse-cronologiste", name: "Kerastasse cronologiste", durationMinutes: 60, price: 126500 },
        ],
      },
      {
        title: "Keratina",
        variants: [
          { id: "pelu-keratina-corto-medio", name: "Corto/Medio (hombros)", durationMinutes: 150, price: 82800 },
          { id: "pelu-keratina-largo", name: "Largo (cintura)", durationMinutes: 180, price: 108100 },
          { id: "pelu-keratina-extra-largo", name: "Extra largo", durationMinutes: 210, price: 133400 },
          { id: "pelu-keratina-flequillo", name: "Flequillo/contorno", durationMinutes: 60, price: 57500 },
        ],
      },
      {
        title: "Alisados",
        variants: [
          { id: "pelu-alisados-corto-medio", name: "Corto/Medio (hombros)", durationMinutes: 150, price: 108100 },
          { id: "pelu-alisados-largo", name: "Largo (cintura)", durationMinutes: 180, price: 179400 },
          { id: "pelu-alisados-extra-largo", name: "Extra largo", durationMinutes: 210, price: 253000 },
          { id: "pelu-alisados-flequillo", name: "Flequillo / contorno", durationMinutes: 60, price: 71300 },
        ],
      },
      {
        title: "Botox capilar",
        variants: [
          { id: "pelu-botox-corto-medio", name: "Corto/Medio (hombros)", durationMinutes: 90, price: 82800 },
          { id: "pelu-botox-largo", name: "Largo (cintura)", durationMinutes: 110, price: 108100 },
          { id: "pelu-botox-extra-largo", name: "Extra largo", durationMinutes: 130, price: 133400 },
          { id: "pelu-botox-flequillo", name: "Flequillo/contorno", durationMinutes: 45, price: 57500 },
        ],
      },
      {
        title: "Brushing",
        variants: [
          { id: "pelu-brushing-corto-medio", name: "Corto/Medio (hombros)", durationMinutes: 40, price: 29900 },
          { id: "pelu-brushing-largo", name: "Largo (cintura)", durationMinutes: 50, price: 32200 },
          { id: "pelu-brushing-extra-largo", name: "Extra largo", durationMinutes: 60, price: 37950 },
          { id: "pelu-brushing-planchita-corto-medio", name: "Más planchita corto/medio", durationMinutes: 55, price: 34500 },
          { id: "pelu-brushing-planchita-largo", name: "Más planchita largo", durationMinutes: 65, price: 37950 },
          { id: "pelu-brushing-planchita-extra-largo", name: "Más planchita extra largo", durationMinutes: 75, price: 43700 },
        ],
      },
      {
        title: "Secado modelado",
        variants: [
          { id: "pelu-secado-corto-medio", name: "Corto/Medio (hombros)", durationMinutes: 30, price: 18400 },
          { id: "pelu-secado-largo", name: "Largo (cintura)", durationMinutes: 40, price: 21850 },
          { id: "pelu-secado-extra-largo", name: "Extra largo", durationMinutes: 50, price: 27600 },
        ],
      },
      {
        title: "Ondas",
        variants: [
          { id: "pelu-ondas-corto-medio", name: "Corto/Medio (hombros)", durationMinutes: 45, price: 51750 },
          { id: "pelu-ondas-largo", name: "Largo (cintura)", durationMinutes: 55, price: 64400 },
          { id: "pelu-ondas-extra-largo", name: "Extra largo", durationMinutes: 65, price: 69000 },
        ],
      },
      {
        title: "Peinados",
        variants: [
          { id: "pelu-peinados-recogidos", name: "Peinados / recogidos (desde)", durationMinutes: 60, price: 75900 },
        ],
      },
      {
        title: "Coloración · Inoa",
        variants: [
          { id: "pelu-color-inoa-raiz", name: "Raíz/Medio", durationMinutes: 90, price: 113850 },
          { id: "pelu-color-inoa-largo", name: "Largo (completo)", durationMinutes: 120, price: 132250 },
          { id: "pelu-color-inoa-extra-largo", name: "Extra largo", durationMinutes: 150, price: 155250 },
        ],
      },
      {
        title: "Coloración · Majirel",
        variants: [
          { id: "pelu-color-majirel-raiz", name: "Raíz/Medio", durationMinutes: 90, price: 89700 },
          { id: "pelu-color-majirel-largo", name: "Largo (completo)", durationMinutes: 120, price: 102350 },
          { id: "pelu-color-majirel-extra-largo", name: "Extra largo", durationMinutes: 150, price: 119600 },
        ],
      },
      {
        title: "Coloración · Wella (Color Perfect)",
        variants: [
          { id: "pelu-color-wella-raiz", name: "Raíz/Medio", durationMinutes: 90, price: 97750 },
          { id: "pelu-color-wella-largo", name: "Largo (completo)", durationMinutes: 120, price: 108100 },
          { id: "pelu-color-wella-extra-largo", name: "Extra largo", durationMinutes: 150, price: 124200 },
        ],
      },
      {
        title: "Coloración · Color Touch",
        variants: [
          { id: "pelu-color-touch-raiz", name: "Raíz/Medio", durationMinutes: 90, price: 97750 },
          { id: "pelu-color-touch-largo", name: "Largo", durationMinutes: 120, price: 108100 },
          { id: "pelu-color-touch-extra-largo", name: "Extra largo", durationMinutes: 150, price: 124200 },
        ],
      },
      {
        title: "Coloración · Igora",
        variants: [
          { id: "pelu-color-igora-raiz", name: "Raíz/Medio", durationMinutes: 90, price: 74750 },
          { id: "pelu-color-igora-largo", name: "Largo (completo)", durationMinutes: 120, price: 86250 },
          { id: "pelu-color-igora-extra-largo", name: "Extra largo", durationMinutes: 150, price: 102350 },
          { id: "pelu-color-igora-henna", name: "Aplicación de Henna (todos los largos)", durationMinutes: 60, price: 69000 },
          { id: "pelu-color-igora-tintura", name: "Aplicación de tintura (desde)", durationMinutes: 90, price: 69000 },
          { id: "pelu-color-igora-bano-luz", name: "Baño de luz (desde)", durationMinutes: 60, price: 71300 },
          { id: "pelu-color-igora-vincha", name: "Vincha retoque", durationMinutes: 45, price: 65550 },
        ],
      },
      {
        title: "Coloración · Igora Zero",
        variants: [
          { id: "pelu-color-igora-zero-raiz", name: "Raíz/Medio", durationMinutes: 90, price: 108100 },
          { id: "pelu-color-igora-zero-largo", name: "Largo (completo)", durationMinutes: 120, price: 126500 },
          { id: "pelu-color-igora-zero-extra-largo", name: "Extra largo", durationMinutes: 150, price: 132250 },
        ],
      },
      {
        title: "Mechas localizadas",
        variants: [
          { id: "pelu-mechas-corto-medio", name: "Corto/Medio", durationMinutes: 150, price: 172500 },
          { id: "pelu-mechas-largo", name: "Largo (cintura)", durationMinutes: 180, price: 189750 },
          { id: "pelu-mechas-extra-largo", name: "Extra largo", durationMinutes: 210, price: 212750 },
          { id: "pelu-mechas-media-cabeza", name: "Media cabeza", durationMinutes: 120, price: 109250 },
          { id: "pelu-mechas-contorno", name: "Contorno", durationMinutes: 60, price: 63250 },
        ],
      },
      {
        title: "Reflejos con gorra",
        variants: [
          { id: "pelu-reflejos-corto-medio", name: "Corto/Medio", durationMinutes: 120, price: 172500 },
          { id: "pelu-reflejos-largo", name: "Largo (cintura)", durationMinutes: 150, price: 189750 },
          { id: "pelu-reflejos-extra-largo", name: "Extra largo", durationMinutes: 180, price: 212750 },
        ],
      },
      {
        title: "Balayage",
        variants: [
          { id: "pelu-balayage-desde", name: "Balayage (desde)", durationMinutes: 150, price: 207000 },
        ],
      },
      {
        title: "Decoloración",
        variants: [
          { id: "pelu-decoloracion-corto-medio", name: "Corto/Medio", durationMinutes: 120, price: 98900 },
          { id: "pelu-decoloracion-largo", name: "Largo (cintura)", durationMinutes: 150, price: 105800 },
          { id: "pelu-decoloracion-extra-largo", name: "Extra largo", durationMinutes: 180, price: 112700 },
        ],
      },
    ],
  },
  {
    id: "unas",
    label: "Uñas",
    skill: "unas",
    image: "/manicura.webp",
    groups: [
      {
        title: "Manos",
        variants: [
          { id: "unas-manos-tradicional", name: "Manicuria c/esmalte tradicional", durationMinutes: 45, price: 28750 },
          { id: "unas-manos-semi-french", name: "Manicuria c/esmalte semi french", durationMinutes: 60, price: 39100 },
          { id: "unas-manos-tradicional-french", name: "Manicuria c/esmalte tradicional french", durationMinutes: 50, price: 32200 },
          { id: "unas-manos-semi", name: "Manicuria c/esmalte semi", durationMinutes: 55, price: 34500 },
          { id: "unas-manos-capping-gel", name: "Capping gel nivelación", durationMinutes: 70, price: 42550 },
          { id: "unas-manos-capping-poligel", name: "Capping con poligel", durationMinutes: 75, price: 44850 },
          { id: "unas-manos-soft-gel-unia", name: "Soft gel por uña", durationMinutes: 20, price: 14950 },
          { id: "unas-manos-capping-unia", name: "Capping por uña", durationMinutes: 15, price: 9200 },
          { id: "unas-manos-cambio-tradicional", name: "Cambio de esmalte tradicional", durationMinutes: 25, price: 16100 },
          { id: "unas-manos-cambio-semi", name: "Cambio de esmalte semi", durationMinutes: 35, price: 23000 },
          { id: "unas-manos-retiro-semi", name: "Retiro esmalte semi", durationMinutes: 20, price: 17250 },
          { id: "unas-manos-retiro-capping", name: "Retiro capping", durationMinutes: 25, price: 19550 },
          { id: "unas-manos-hombres", name: "Manicuria hombres", durationMinutes: 40, price: 26450 },
          { id: "unas-manos-ninas", name: "Manicuria niñas", durationMinutes: 30, price: 20700 },
          { id: "unas-manos-retiro-esculpidas", name: "Retiro de esculpidas", durationMinutes: 25, price: 26450 },
          { id: "unas-manos-soft-gel-desde", name: "Soft Gel (desde)", durationMinutes: 80, price: 46000 },
        ],
      },
      {
        title: "Pies",
        variants: [
          { id: "unas-pies-semi-french", name: "Belleza de pies semi french", durationMinutes: 60, price: 42550 },
          { id: "unas-pies-tradicional-french", name: "Belleza de pies tradicional french", durationMinutes: 50, price: 33350 },
          { id: "unas-pies-tradicional", name: "Belleza de pies c/esmalte tradicional", durationMinutes: 45, price: 31050 },
          { id: "unas-pies-semi", name: "Belleza de pies c/esmalte semi", durationMinutes: 55, price: 37950 },
          { id: "unas-pies-pedicuria-tradicional", name: "Pedicuria c/esmalte tradicional", durationMinutes: 60, price: 46000 },
          { id: "unas-pies-pedicuria-basica", name: "Pedicuria básica", durationMinutes: 45, price: 43700 },
          { id: "unas-pies-pedicuria-semi", name: "Pedicuria c/esmalte semi", durationMinutes: 70, price: 50600 },
          { id: "unas-pies-pedicuria-hombres", name: "Pedicuria hombres", durationMinutes: 50, price: 43700 },
          { id: "unas-pies-ninas", name: "Belleza pies niñas", durationMinutes: 30, price: 26450 },
          { id: "unas-pies-corte-unias", name: "Corte de uñas", durationMinutes: 20, price: 25300 },
          { id: "unas-pies-esculpidas-unia", name: "Esculpidas por uña", durationMinutes: 15, price: 23000 },
        ],
      },
      {
        title: "Diseño Nail Art",
        variants: [
          { id: "unas-nailart-decoracion", name: "Adicional decoración de uñas", durationMinutes: 15, price: 11500, bookable: false },
          { id: "unas-nailart-por-unia", name: "Adicional por uña", durationMinutes: 5, price: 3450, bookable: false },
        ],
      },
      {
        title: "Tratamientos pedicura",
        variants: [
          { id: "unas-tratam-basica", name: "Pedicura básica", durationMinutes: 45, price: 40250 },
          { id: "unas-tratam-basica-micosis", name: "Básica micosis", durationMinutes: 50, price: 42550 },
          { id: "unas-tratam-fresado", name: "Fresado profundo de uña micóticas", durationMinutes: 60, price: 51750 },
          { id: "unas-tratam-onicofosis", name: "Onicofosis y helomas interdigitales", durationMinutes: 60, price: 51750 },
          { id: "unas-tratam-hiperqueratosis", name: "Hiperqueratosis generalizada", durationMinutes: 45, price: 40250 },
          { id: "unas-tratam-unia-encarnada-basica", name: "Uña encarnada básica", durationMinutes: 45, price: 40250 },
          { id: "unas-tratam-unia-encarnada-unilateral", name: "Uña encarnada unilateral granuloma", durationMinutes: 60, price: 64400 },
          { id: "unas-tratam-unia-encarnada-bilateral", name: "Uña encarnada bilateral granuloma", durationMinutes: 75, price: 85100 },
          { id: "unas-tratam-encarrilado", name: "Encarrilado con teflón/o pae/tapa acrílica", durationMinutes: 45, price: 40250 },
          { id: "unas-tratam-carrilla", name: "Carrilla inmovilizadora o puente pae", durationMinutes: 45, price: 40250 },
          { id: "unas-tratam-lengueta", name: "Lengüeta expansora", durationMinutes: 45, price: 40250 },
          { id: "unas-tratam-implantes", name: "Implantes temporarios o sellados antimicótico", durationMinutes: 45, price: 40250 },
          { id: "unas-tratam-verrugas", name: "Tratamiento verrugas c/u", durationMinutes: 30, price: 31050 },
          { id: "unas-tratam-alta-frecuencia", name: "Sesión alta frecuencia", durationMinutes: 30, price: 31050 },
        ],
      },
    ],
  },
  {
    id: "depilacion",
    label: "Depilación",
    skill: "estetica",
    image: "/placeholder.webp",
    groups: [
      {
        title: "Hombre",
        variants: [
          { id: "depi-hombre-cejas", name: "Cejas (cera/pinzita)", durationMinutes: 15, price: 28750 },
          { id: "depi-hombre-orejas", name: "Orejas", durationMinutes: 10, price: 16100 },
          { id: "depi-hombre-fosas", name: "Fosas", durationMinutes: 10, price: 16100 },
          { id: "depi-hombre-hombros", name: "Hombros", durationMinutes: 15, price: 23500 },
          { id: "depi-hombre-axilas", name: "Axilas", durationMinutes: 15, price: 26450 },
          { id: "depi-hombre-pecho", name: "Pecho", durationMinutes: 20, price: 28750 },
          { id: "depi-hombre-abdomen", name: "Abdomen", durationMinutes: 20, price: 27600 },
          { id: "depi-hombre-torso", name: "Torso", durationMinutes: 25, price: 33350 },
          { id: "depi-hombre-cintura", name: "Cintura", durationMinutes: 15, price: 27600 },
          { id: "depi-hombre-espalda", name: "Espalda", durationMinutes: 25, price: 33350 },
          { id: "depi-hombre-brazos", name: "Brazos", durationMinutes: 20, price: 29900 },
          { id: "depi-hombre-gluteos", name: "Glúteos", durationMinutes: 15, price: 29900 },
          { id: "depi-hombre-pelvis", name: "Pelvis completa", durationMinutes: 20, price: 29900 },
          { id: "depi-hombre-piernas", name: "Piernas", durationMinutes: 30, price: 40250 },
          { id: "depi-hombre-pies", name: "Pies", durationMinutes: 10, price: 17250 },
        ],
      },
      {
        title: "Mujer · Rostro",
        variants: [
          { id: "depi-mujer-rostro-cejas", name: "Cejas (cera/pinzita)", durationMinutes: 15, price: 26450 },
          { id: "depi-mujer-rostro-bozo", name: "Bozo", durationMinutes: 10, price: 16100 },
          { id: "depi-mujer-rostro-patillas", name: "Patillas", durationMinutes: 10, price: 16100 },
          { id: "depi-mujer-rostro-pomulo", name: "Pómulo", durationMinutes: 10, price: 16100 },
          { id: "depi-mujer-rostro-menton", name: "Mentón", durationMinutes: 10, price: 16100 },
          { id: "depi-mujer-rostro-nuca", name: "Nuca", durationMinutes: 10, price: 16100 },
          { id: "depi-mujer-rostro-fosas", name: "Fosas", durationMinutes: 10, price: 16100 },
          { id: "depi-mujer-rostro-entrecejo", name: "Entrecejo", durationMinutes: 10, price: 16100 },
          { id: "depi-mujer-rostro-completo", name: "Rostro completo (no incluye cejas)", durationMinutes: 20, price: 28750 },
        ],
      },
      {
        title: "Mujer · Torso",
        variants: [
          { id: "depi-mujer-torso-espalda", name: "Espalda", durationMinutes: 20, price: 20700 },
          { id: "depi-mujer-torso-cintura", name: "Cintura", durationMinutes: 15, price: 16100 },
          { id: "depi-mujer-torso-abdomen", name: "Abdomen", durationMinutes: 15, price: 17250 },
          { id: "depi-mujer-torso-axila", name: "Axila", durationMinutes: 15, price: 16100 },
          { id: "depi-mujer-torso-busto", name: "Busto", durationMinutes: 15, price: 16100 },
          { id: "depi-mujer-torso-tiras", name: "Tiras varias", durationMinutes: 15, price: 16100 },
          { id: "depi-mujer-torso-hombros", name: "Hombros", durationMinutes: 15, price: 16100 },
        ],
      },
      {
        title: "Mujer · Brazos, piernas y pelvis",
        variants: [
          { id: "depi-mujer-bpp-brazo-completo", name: "Brazo completo", durationMinutes: 20, price: 23000 },
          { id: "depi-mujer-bpp-medio-brazo", name: "Medio brazo", durationMinutes: 15, price: 16100 },
          { id: "depi-mujer-bpp-manos", name: "Manos", durationMinutes: 10, price: 16100 },
          { id: "depi-mujer-bpp-media-pierna", name: "Media pierna", durationMinutes: 20, price: 25300 },
          { id: "depi-mujer-bpp-media-pierna-bikini", name: "Media pierna con bikini", durationMinutes: 25, price: 25300 },
          { id: "depi-mujer-bpp-media-pierna-cav", name: "Media pierna con cavitación profundo", durationMinutes: 25, price: 26450 },
          { id: "depi-mujer-bpp-pierna-entera", name: "Pierna entera", durationMinutes: 30, price: 28750 },
          { id: "depi-mujer-bpp-pierna-entera-cav", name: "Pierna entera con cavitación", durationMinutes: 30, price: 28750 },
          { id: "depi-mujer-bpp-pierna-entera-cav-profundo", name: "Pierna entera con cavitación profundo", durationMinutes: 35, price: 33350 },
          { id: "depi-mujer-bpp-bikini", name: "Bikini", durationMinutes: 15, price: 14950 },
          { id: "depi-mujer-bpp-bikini-profundo", name: "Bikini profundo", durationMinutes: 20, price: 20700 },
          { id: "depi-mujer-bpp-pelvis", name: "Pelvis completa", durationMinutes: 20, price: 26450 },
          { id: "depi-mujer-bpp-muslo", name: "Muslo", durationMinutes: 20, price: 23000 },
          { id: "depi-mujer-bpp-muslo-bikini", name: "Muslo con bikini", durationMinutes: 25, price: 29900 },
          { id: "depi-mujer-bpp-muslo-bikini-profundo", name: "Muslo con bikini profundo", durationMinutes: 30, price: 34500 },
          { id: "depi-mujer-bpp-tira-cola", name: "Tira de cola", durationMinutes: 15, price: 20700 },
          { id: "depi-mujer-bpp-gluteos", name: "Glúteos", durationMinutes: 15, price: 26450 },
          { id: "depi-mujer-bpp-tira-gluteos", name: "Tira de glúteos", durationMinutes: 15, price: 20700 },
          { id: "depi-mujer-bpp-pies", name: "Pies", durationMinutes: 10, price: 20700 },
        ],
      },
    ],
  },
  {
    id: "cejas-pestanas",
    label: "Cejas y Pestañas",
    skill: "estetica",
    image: "/placeholder.webp",
    groups: [
      {
        title: "Cejas",
        variants: [
          { id: "cyp-cejas-diseno", name: "Diseño personalizado", durationMinutes: 20, price: 28750 },
          { id: "cyp-cejas-depilacion", name: "Depilación (cera, pinzita)", durationMinutes: 15, price: 26450 },
          { id: "cyp-cejas-perfilado-laminado", name: "Perfilado / Laminado", durationMinutes: 30, price: 34500 },
          { id: "cyp-cejas-perfilado-color", name: "Perfilado / Diseño / Color", durationMinutes: 35, price: 40250 },
        ],
      },
      {
        title: "Pestañas",
        variants: [
          { id: "cyp-pestanas-lifting-color", name: "Lifting + Color (con perfilado cejas)", durationMinutes: 60, price: 52900 },
          { id: "cyp-pestanas-color-botox", name: "Color + Botox", durationMinutes: 45, price: 40250 },
          { id: "cyp-pestanas-color-lifting", name: "Solo Color o Solo Lifting", durationMinutes: 35, price: 34500 },
        ],
      },
    ],
  },
];

export interface Product {
  id: string;
  /** "Grupo · Variante", para mostrar en resúmenes y en la descripción del evento de Calendar. */
  name: string;
  skill: EmployeeSkill;
  durationMinutes: number;
  price: number;
  categoryId: string;
  groupTitle: string;
  /** false = no se puede reservar como turno independiente, solo aparece en /servicios. */
  bookable: boolean;
}

/** Vista plana del catálogo: un Product por cada variante, para lookup por id (reservas). */
export const PRODUCTS: Product[] = CATALOG.flatMap((category) =>
  category.groups.flatMap((group) =>
    group.variants.map(
      (variant): Product => ({
        id: variant.id,
        name: `${group.title} · ${variant.name}`,
        skill: category.skill,
        durationMinutes: variant.durationMinutes,
        price: variant.price,
        categoryId: category.id,
        groupTitle: group.title,
        bookable: variant.bookable ?? true,
      }),
    ),
  ),
);