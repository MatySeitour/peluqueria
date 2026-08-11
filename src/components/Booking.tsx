import { useEffect, useMemo, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { ChevronDown, ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { CATALOG } from "../config/catalog";
import { EMPLOYEES, PRODUCTS } from "../config/staff";
import { isEmployeeQualified } from "../lib/availability";
import { cn } from "../utils/functions";

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DOWS = ["D", "L", "M", "M", "J", "V", "S"];
const WHATSAPP_NUMBER = "541127210827";

type Step = "categories" | "services" | "cart" | "employee" | "schedule" | "contact" | "confirmed";
// Pasos que cuentan para la barra de progreso ("services" pertenece al mismo tramo que "categories").
const PROGRESS_STEPS: Step[] = ["categories", "cart", "employee", "schedule", "contact"];

interface DaySlot {
  time: string;
  available: boolean;
}

interface Confirmation {
  eventIds: string[];
  employeeName: string;
  date: string;
  time: string;
  products: string[];
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-AR")}`;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function dateKey(year: number, monthIndex0: number, day: number): string {
  return `${year}-${pad(monthIndex0 + 1)}-${pad(day)}`;
}

function todayKey(): string {
  const now = new Date();
  return dateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatDiaTexto(date: string): string {
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const [y, m, d] = date.split("-").map(Number);
  const local = new Date(y, m - 1, d);
  return `${dias[local.getDay()]} ${d} de ${MONTHS[m - 1]}`;
}

export default function Booking() {
  const [step, setStep] = useState<Step>("categories");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [selectedVariantIds, setSelectedVariantIds] = useState<string[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [monthDays, setMonthDays] = useState<Record<string, boolean> | null>(null);
  const [monthLoading, setMonthLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [daySlots, setDaySlots] = useState<DaySlot[] | null>(null);
  const [dayLoading, setDayLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [whatsappConfirmed, setWhatsappConfirmed] = useState(false);

  const selectedProducts = useMemo(
    () => selectedVariantIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p) => p !== undefined),
    [selectedVariantIds],
  );
  const totalDuration = selectedProducts.reduce((sum, p) => sum + p.durationMinutes, 0);
  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const productIdsParam = selectedVariantIds.join(",");
  const requiredSkills = useMemo(
    () => Array.from(new Set(selectedProducts.map((p) => p.skill))),
    [selectedProducts],
  );
  const qualifiedEmployees = useMemo(
    () => EMPLOYEES.filter((e) => isEmployeeQualified(e, requiredSkills)),
    [requiredSkills],
  );
  // Nadie individualmente cubre todas las habilidades pedidas: el turno se arma
  // combinando empleadas distintas por tramo (ver resolveProducts.legs en el backend).
  const isCombinedBooking = requiredSkills.length > 1 && qualifiedEmployees.length === 0;
  const employeeIdParam = selectedEmployeeId ? `&employeeId=${selectedEmployeeId}` : "";
  const activeCategory = CATALOG.find((c) => c.id === activeCategoryId) ?? null;
  const selectedEmployeeName = selectedEmployeeId
    ? (EMPLOYEES.find((e) => e.id === selectedEmployeeId)?.name ?? "Primero disponible")
    : "Primero disponible";

  // Si cambia la combinación de servicios y la empleada elegida deja de calificar, volvemos a "primero disponible".
  useEffect(() => {
    if (selectedEmployeeId && !qualifiedEmployees.some((e) => e.id === selectedEmployeeId)) {
      setSelectedEmployeeId(null);
    }
  }, [qualifiedEmployees, selectedEmployeeId]);

  useEffect(() => {
    if (selectedVariantIds.length === 0) {
      setMonthDays({});
      return;
    }
    let cancelled = false;
    setMonthLoading(true);
    setMonthDays(null);
    fetch(
      `/api/availability/month?year=${viewYear}&month=${viewMonth + 1}&productIds=${productIdsParam}${employeeIdParam}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setMonthDays(data.days ?? {});
      })
      .catch(() => {
        if (!cancelled) setMonthDays({});
      })
      .finally(() => {
        if (!cancelled) setMonthLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productIdsParam, selectedVariantIds.length, viewYear, viewMonth, employeeIdParam]);

  function fetchDaySlots(date: string) {
    setDayLoading(true);
    setDaySlots(null);
    fetch(`/api/availability/day?date=${date}&productIds=${productIdsParam}${employeeIdParam}`)
      .then((r) => r.json())
      .then((data) => setDaySlots(data.slots ?? []))
      .catch(() => setDaySlots([]))
      .finally(() => setDayLoading(false));
  }

  function changeMonth(delta: number) {
    let month = viewMonth + delta;
    let year = viewYear;
    if (month < 0) {
      month = 11;
      year -= 1;
    } else if (month > 11) {
      month = 0;
      year += 1;
    }
    setViewMonth(month);
    setViewYear(year);
  }

  function toggleVariant(id: string) {
    setSelectedVariantIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
    setSelectedDate(null);
    setSelectedTime(null);
    setDaySlots(null);
  }

  function toggleGroupOpen(title: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  function openCategory(categoryId: string) {
    setActiveCategoryId(categoryId);
    setOpenGroups(new Set());
    goToStep("services");
  }

  function handleSelectDay(date: string) {
    setSelectedDate(date);
    setSelectedTime(null);
    fetchDaySlots(date);
  }

  function goToStep(next: Step) {
    setBookingError(null);
    setStep(next);
  }

  function handleContactSubmit() {
    if (!name.trim() || !phone.trim()) {
      setContactError("Completá nombre y teléfono para continuar.");
      return;
    }
    setContactError(null);
    handleConfirm();
  }

  async function handleConfirm() {
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    setBookingError(null);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          productIds: selectedVariantIds,
          name: name.trim(),
          phone: phone.trim(),
          ...(notes.trim() ? { notes: notes.trim() } : {}),
          ...(selectedEmployeeId ? { employeeId: selectedEmployeeId } : {}),
        }),
      });

      if (response.status === 409) {
        setBookingError("Ese horario ya no está disponible. Elegí otro, por favor.");
        fetchDaySlots(selectedDate);
        setSelectedTime(null);
        goToStep("schedule");
        return;
      }

      if (!response.ok) {
        setBookingError("No pudimos confirmar tu turno. Probá de nuevo en unos minutos.");
        return;
      }

      const data = await response.json();
      setConfirmation({
        eventIds: data.ids,
        employeeName: data.employeeName,
        date: selectedDate,
        time: selectedTime,
        products: data.products ?? selectedProducts.map((p) => p.name),
      });
      goToStep("confirmed");
    } catch {
      setBookingError("No pudimos conectar con el servidor. Probá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleWhatsappClick() {
    if (!confirmation || whatsappConfirmed) return;
    setWhatsappConfirmed(true);
    fetch("/api/bookings/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventIds: confirmation.eventIds }),
    }).catch(() => {
      // Best-effort: si falla, el turno queda tentativo y la dueña lo confirma a mano.
    });
  }

  function resetFlow() {
    setSelectedVariantIds([]);
    setActiveCategoryId(null);
    setSelectedEmployeeId(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setDaySlots(null);
    setName("");
    setPhone("");
    setNotes("");
    setContactError(null);
    setWhatsappConfirmed(false);
    setBookingError(null);
    setConfirmation(null);
    goToStep("categories");
  }

  function whatsappHref() {
    if (!confirmation) return "#";
    const diaTexto = formatDiaTexto(confirmation.date);
    const msg = `Hola! Quiero confirmar mi turno de ${confirmation.products.join(", ")} para el ${diaTexto} a las ${confirmation.time}. Mi nombre es ${name.trim()}.`;
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
  }

  const today = todayKey();
  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const progressIndex = PROGRESS_STEPS.indexOf(step === "services" ? "categories" : step);
  const showSidebar = selectedVariantIds.length > 0 && step !== "categories" && step !== "services";

  function SummarySidebar() {
    return (
      <div className="space-y-4 rounded-2xl border border-primary/20 bg-white p-4 lg:sticky lg:top-24">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wide text-primary/60 uppercase">
            Servicio(s)
          </p>
          <ul className="space-y-2">
            {selectedProducts.map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-2 text-sm">
                <span className="text-primary">
                  {p.name}
                  <span className="block text-xs text-primary/50">{p.durationMinutes} min</span>
                </span>
                <span className="shrink-0 font-semibold text-primary">{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-primary/10 pt-3 text-sm">
          <span className="text-primary/60">Profesional</span>
          {isCombinedBooking ? (
            <span className="text-right font-semibold text-primary">
              Según cada servicio
            </span>
          ) : (
            <button
              onClick={() => goToStep("employee")}
              className="flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              {selectedEmployeeName}
              <Pencil className="size-3" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-primary/10 pt-3 text-sm">
          <span className="text-primary/60">Fecha y hora</span>
          {selectedDate && selectedTime ? (
            <button
              onClick={() => goToStep("schedule")}
              className="flex items-center gap-1 text-right font-semibold text-primary hover:underline"
            >
              <span className="capitalize">
                {formatDiaTexto(selectedDate)}, {selectedTime}
              </span>
              <Pencil className="size-3 shrink-0" />
            </button>
          ) : (
            <span className="text-primary/40">Aún por seleccionar</span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-primary/10 pt-3">
          <span className="text-sm font-semibold text-primary">
            Importe total
            <span className="block text-xs font-normal text-primary/50">{totalDuration} min en total</span>
          </span>
          <span className="text-base font-bold text-primary">{formatPrice(totalPrice)}</span>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-16 flex min-h-screen flex-col items-center bg-third/40 px-4 py-10">
      <div className="w-full max-w-5xl">
        <div className="mb-6 text-center">
          <h1 className="text text-2xl">Reserva tu turno</h1>
          <p className="mt-1 text-sm text-primary/70">
            Elegí qué te querés hacer, con quién y el horario
          </p>
        </div>

        {step !== "confirmed" && (
          <div className="mx-auto mb-6 flex max-w-md gap-1.5">
            {PROGRESS_STEPS.map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1 flex-1 rounded-full bg-primary/20",
                  progressIndex >= PROGRESS_STEPS.indexOf(s) && "bg-primary",
                )}
              />
            ))}
          </div>
        )}

        <div className={cn("gap-6", showSidebar && "lg:grid lg:grid-cols-3")}>
          <div className={cn("rounded-3xl border border-primary/20 bg-third p-6", showSidebar && "lg:col-span-2")}>
            {step === "categories" && (
              <div className={cn(selectedVariantIds.length > 0 && "pb-20 sm:pb-0")}>
                <h2 className="mb-4 text-sm font-semibold text-primary">
                  1. Explorá nuestros servicios
                </h2>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {CATALOG.map((category) => {
                    const count = category.groups.reduce((n, g) => n + g.variants.length, 0);
                    const selectedInCategory = selectedProducts.filter(
                      (p) => p.categoryId === category.id,
                    ).length;
                    return (
                      <button
                        key={category.id}
                        onClick={() => openCategory(category.id)}
                        className="group relative aspect-4/5 overflow-hidden rounded-2xl text-left"
                      >
                        <img
                          src={category.image}
                          alt={category.label}
                          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                        {selectedInCategory > 0 && (
                          <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                            {selectedInCategory}
                          </span>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <p className="text-sm font-semibold text-white">{category.label}</p>
                          <p className="text-xs text-white/80">{count} servicios</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedVariantIds.length > 0 && (
                  <div className="fixed inset-x-0 bottom-0 z-30 border-t border-primary/15 bg-third p-4 sm:static sm:mt-5 sm:border-0 sm:p-0">
                    <button
                      onClick={() => goToStep("cart")}
                      className="mx-auto block w-full max-w-5xl rounded-xl bg-primary py-3 text-sm font-semibold text-white"
                    >
                      Ver selección ({selectedVariantIds.length}) · {formatPrice(totalPrice)}
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === "services" && activeCategory && (
              <div>
                <button
                  onClick={() => goToStep("categories")}
                  className="mb-3 flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  <ChevronLeft className="size-4" />
                  {activeCategory.label}
                </button>

                <div className="max-h-[45vh] space-y-2 overflow-y-auto pr-1 pb-24 sm:max-h-[28rem] sm:pb-0">
                  {activeCategory.groups
                    .map((group) => ({
                      ...group,
                      variants: group.variants.filter((v) => v.bookable !== false),
                    }))
                    .filter((group) => group.variants.length > 0)
                    .map((group) => {
                    const isOpen = openGroups.has(group.title);
                    const countInGroup = group.variants.filter((v) =>
                      selectedVariantIds.includes(v.id),
                    ).length;
                    return (
                      <div key={group.title}>
                        <button
                          onClick={() => toggleGroupOpen(group.title)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg border border-primary/20 bg-white px-3 py-2.5 text-left text-sm font-semibold text-primary",
                            isOpen && "rounded-b-none border-b-0",
                            countInGroup > 0 && "border-primary",
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {group.title}
                            {countInGroup > 0 && (
                              <span className="rounded-full bg-secondary px-1.5 text-xs">
                                {countInGroup}
                              </span>
                            )}
                          </span>
                          <ChevronDown
                            className={cn("size-4 text-primary/60 transition-transform", isOpen && "rotate-180")}
                          />
                        </button>

                        {isOpen && (
                          <ul className="space-y-1.5 rounded-b-lg border border-t-0 border-primary/20 bg-secondary/20 p-2">
                            {group.variants.map((variant) => {
                              const checked = selectedVariantIds.includes(variant.id);
                              return (
                                <li key={variant.id}>
                                  <label
                                    className={cn(
                                      "flex cursor-pointer items-center justify-between rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-primary",
                                      checked && "border-primary bg-secondary/50 font-semibold",
                                    )}
                                  >
                                    <span className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleVariant(variant.id)}
                                        className="accent-primary"
                                      />
                                      <span>
                                        {variant.name}
                                        <span className="block text-xs text-primary/50">
                                          {variant.durationMinutes} min
                                        </span>
                                      </span>
                                    </span>
                                    <span className="shrink-0 text-xs font-semibold text-primary/70">
                                      {formatPrice(variant.price)}
                                    </span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="fixed inset-x-0 bottom-0 z-30 border-t border-primary/15 bg-third p-4 sm:static sm:mt-5 sm:border-0 sm:p-0">
                <button
                  disabled={selectedVariantIds.length === 0}
                  onClick={() => goToStep("cart")}
                  className="mx-auto block w-full max-w-5xl rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:bg-secondary disabled:text-primary/50"
                >
                  Ver selección ({selectedVariantIds.length}) · {formatPrice(totalPrice)}
                </button>
                </div>
              </div>
            )}

            {step === "cart" && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-primary">Revisá tu selección</h2>

                {selectedProducts.length === 0 ? (
                  <p className="py-6 text-center text-sm text-primary/50">
                    Todavía no elegiste ningún servicio.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {selectedProducts.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-primary/20 bg-white p-3"
                      >
                        <div className="text-sm">
                          <p className="font-semibold text-primary">{p.name}</p>
                          <p className="text-xs text-primary/50">{p.durationMinutes} min</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="text-sm font-semibold text-primary">{formatPrice(p.price)}</span>
                          <button
                            onClick={() => toggleVariant(p.id)}
                            aria-label={`Quitar ${p.name}`}
                            className="text-primary/50 hover:text-red-600"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {selectedProducts.length > 0 && (
                  <div className="mt-4 flex items-center justify-between border-t border-primary/10 pt-3">
                    <span className="text-sm font-semibold text-primary">Importe total</span>
                    <span className="text-base font-bold text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                )}

                <button
                  onClick={() => goToStep("categories")}
                  className="mt-5 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary"
                >
                  Añada otro servicio
                </button>
                <button
                  disabled={selectedProducts.length === 0}
                  onClick={() => goToStep(isCombinedBooking ? "schedule" : "employee")}
                  className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:bg-secondary disabled:text-primary/50"
                >
                  Siguiente
                </button>
              </div>
            )}

            {step === "employee" && !isCombinedBooking && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-primary">
                  Elegí con quién atenderte
                </h2>

                <div className="space-y-1.5">
                  <label
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg border border-primary/20 bg-white px-3 py-2.5 text-sm text-primary",
                      selectedEmployeeId === null && "border-primary bg-secondary/50 font-semibold",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="employee"
                        checked={selectedEmployeeId === null}
                        onChange={() => setSelectedEmployeeId(null)}
                        className="accent-primary"
                      />
                      Primero disponible
                    </span>
                  </label>

                  {qualifiedEmployees.map((employee) => (
                    <label
                      key={employee.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-lg border border-primary/20 bg-white px-3 py-2.5 text-sm text-primary",
                        selectedEmployeeId === employee.id && "border-primary bg-secondary/50 font-semibold",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="employee"
                          checked={selectedEmployeeId === employee.id}
                          onChange={() => setSelectedEmployeeId(employee.id)}
                          className="accent-primary"
                        />
                        {employee.name}
                      </span>
                    </label>
                  ))}
                </div>

                {qualifiedEmployees.length === 0 && (
                  <p className="mt-3 text-center text-xs text-primary/50">
                    No hay profesionales disponibles para esta combinación de servicios.
                  </p>
                )}

                <button
                  onClick={() => goToStep("schedule")}
                  className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white"
                >
                  Continuar
                </button>
                <button
                  onClick={() => goToStep("cart")}
                  className="mt-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary"
                >
                  Volver
                </button>
              </div>
            )}

            {step === "schedule" && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-primary">Elegí el día y el horario</h2>

                {bookingError && (
                  <p className="mb-3 rounded-lg bg-red-50 p-2 text-xs text-red-600">{bookingError}</p>
                )}

                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="lg:w-72 lg:shrink-0">
                    <div className="mb-2 flex items-center justify-between">
                      <button onClick={() => changeMonth(-1)} className="px-2 text-lg text-primary">
                        ‹
                      </button>
                      <span className="text-sm font-semibold text-primary capitalize">
                        {MONTHS[viewMonth]} {viewYear}
                      </span>
                      <button onClick={() => changeMonth(1)} className="px-2 text-lg text-primary">
                        ›
                      </button>
                    </div>

                    <div className="mb-1 grid grid-cols-7 gap-1">
                      {DOWS.map((d, i) => (
                        <div key={i} className="pb-1 text-center text-[10px] text-primary/60">
                          {d}
                        </div>
                      ))}
                      {Array.from({ length: firstDow }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                        const key = dateKey(viewYear, viewMonth, day);
                        const isPast = key < today;
                        const isAvailable = !isPast && monthDays?.[key] === true;
                        const isSelected = selectedDate === key;
                        return (
                          <button
                            key={day}
                            disabled={!isAvailable}
                            onClick={() => handleSelectDay(key)}
                            className={cn(
                              "aspect-square rounded-lg text-sm",
                              isPast && "text-primary/20",
                              !isPast && !isAvailable && "bg-secondary/40 text-primary/40",
                              isAvailable && "bg-secondary font-semibold text-primary hover:bg-primary/20",
                              isSelected && "bg-primary text-white",
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    {monthLoading && (
                      <p className="mt-2 text-center text-xs text-primary/50">Buscando disponibilidad...</p>
                    )}
                  </div>

                  <div className="flex-1">
                    {!selectedDate && (
                      <p className="py-6 text-center text-sm text-primary/50">
                        Elegí un día para ver los horarios disponibles.
                      </p>
                    )}

                    {selectedDate && (
                      <>
                        <p className="mb-3 text-xs font-semibold text-primary/60 capitalize">
                          {formatDiaTexto(selectedDate)}
                        </p>

                        {dayLoading && (
                          <p className="py-6 text-center text-sm text-primary/50">Cargando horarios...</p>
                        )}

                        {!dayLoading && daySlots && daySlots.length === 0 && (
                          <p className="py-6 text-center text-sm text-primary/50">
                            No hay turnos disponibles este día.
                          </p>
                        )}

                        {!dayLoading && daySlots && daySlots.length > 0 && (
                          <div className="grid max-h-80 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
                            {daySlots.map((slot) => (
                              <button
                                key={slot.time}
                                disabled={!slot.available}
                                onClick={() => setSelectedTime(slot.time)}
                                className={cn(
                                  "rounded-lg border border-primary/20 py-2.5 text-sm",
                                  !slot.available && "cursor-not-allowed bg-secondary/40 text-primary/30",
                                  slot.available && "bg-white text-primary hover:border-primary",
                                  selectedTime === slot.time && "border-primary bg-primary font-semibold text-white",
                                )}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <button
                  disabled={!selectedTime}
                  onClick={() => goToStep("contact")}
                  className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:bg-secondary disabled:text-primary/50"
                >
                  Continuar
                </button>
                <button
                  onClick={() => goToStep(isCombinedBooking ? "cart" : "employee")}
                  className="mt-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary"
                >
                  Volver
                </button>
              </div>
            )}

            {step === "contact" && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-primary">Ingresá tus datos</h2>

                <label className="mb-1.5 block text-xs text-primary/70" htmlFor="nombre">
                  Nombre y apellido
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ana Pérez"
                  className="w-full rounded-lg border border-primary/30 bg-white px-3 py-2.5 text-sm text-primary focus:border-primary focus:outline-none"
                />

                <label className="mt-3.5 mb-1.5 block text-xs text-primary/70" htmlFor="telefono">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="11 2345 6789"
                  className="w-full rounded-lg border border-primary/30 bg-white px-3 py-2.5 text-sm text-primary focus:border-primary focus:outline-none"
                />

                <label className="mt-3.5 mb-1.5 block text-xs text-primary/70" htmlFor="notas">
                  Información adicional (opcional)
                </label>
                <textarea
                  id="notas"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="¿Hay algo que quieras que sepamos antes de tu cita?"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-primary/30 bg-white px-3 py-2.5 text-sm text-primary focus:border-primary focus:outline-none"
                />

                {contactError && <p className="mt-2 text-xs text-red-600">{contactError}</p>}

                <div className="mt-4 rounded-xl border-2 border-red-400 bg-red-50 p-3 text-center">
                  <p className="text-sm font-bold text-red-700">
                    ¡Atención! Tu turno NO queda reservado hasta que lo confirmes por WhatsApp.
                  </p>
                  <p className="mt-1 text-xs text-red-600">
                    Después de reservar acá, te vamos a pedir que toques el botón de WhatsApp. Si no
                    confirmás, tu horario puede ser ocupado por otra persona.
                  </p>
                </div>

                {bookingError && (
                  <p className="mt-3 rounded-lg bg-red-50 p-2 text-xs text-red-600">{bookingError}</p>
                )}

                <button
                  disabled={submitting}
                  onClick={handleContactSubmit}
                  className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {submitting ? "Reservando..." : "Reservar turno"}
                </button>
                <button
                  onClick={() => goToStep("schedule")}
                  className="mt-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary"
                >
                  Volver
                </button>
              </div>
            )}

            {step === "confirmed" && confirmation && (
              <div className="mx-auto max-w-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl text-primary">
                  ✓
                </div>
                <h2 className="text text-center text-lg">¡Casi listo!</h2>
                <p className="mb-4 text-center text-sm text-primary/70">
                  Reservamos con <span className="font-semibold">{confirmation.employeeName}</span> el{" "}
                  {formatDiaTexto(confirmation.date)} a las {confirmation.time} para{" "}
                  {confirmation.products.join(", ")}.
                </p>

                {!whatsappConfirmed ? (
                  <div className="mb-4 rounded-xl border-2 border-red-400 bg-red-50 p-3 text-center">
                    <p className="text-sm font-bold text-red-700">
                      Tu turno todavía NO está confirmado.
                    </p>
                    <p className="mt-1 text-xs text-red-600">
                      Tocá el botón de abajo y enviá el mensaje de WhatsApp para confirmar tu lugar. Si
                      no lo hacés, no queda reservado.
                    </p>
                  </div>
                ) : (
                  <div className="mb-4 rounded-xl border-2 border-primary/40 bg-secondary/50 p-3 text-center">
                    <p className="text-sm font-bold text-primary">Turno confirmado ✓</p>
                  </div>
                )}

                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsappClick}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white"
                >
                  <BsWhatsapp className="size-4" />
                  {whatsappConfirmed ? "Volver a abrir WhatsApp" : "Confirmar por WhatsApp"}
                </a>
                <button
                  onClick={resetFlow}
                  className="mt-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary"
                >
                  Reservar otro turno
                </button>
              </div>
            )}
          </div>

          {showSidebar && (
            <div className="mt-6 lg:mt-0">
              <SummarySidebar />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
