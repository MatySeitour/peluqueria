import { useEffect, useMemo, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import type { EmployeeSkill } from "../config/staff";
import { PRODUCTS, SKILL_LABELS } from "../config/staff";
import { cn } from "../utils/functions";

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DOWS = ["D", "L", "M", "M", "J", "V", "S"];
const WHATSAPP_NUMBER = "541127210827";
const SKILL_ORDER: EmployeeSkill[] = ["peluqueria", "unas", "estetica"];

type Step = "products" | "day" | "time" | "contact" | "review" | "confirmed";
const STEPS: Step[] = ["products", "day", "time", "contact", "review"];

interface DaySlot {
  time: string;
  available: boolean;
}

interface Confirmation {
  employeeName: string;
  date: string;
  time: string;
  products: string[];
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
  const [step, setStep] = useState<Step>("products");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [activeSkillTab, setActiveSkillTab] = useState<EmployeeSkill>("peluqueria");

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
  const [contactError, setContactError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const selectedProducts = useMemo(
    () => PRODUCTS.filter((p) => selectedProductIds.includes(p.id)),
    [selectedProductIds],
  );
  const totalDuration = selectedProducts.reduce((sum, p) => sum + p.durationMinutes, 0);
  const productIdsParam = selectedProductIds.join(",");

  useEffect(() => {
    if (selectedProductIds.length === 0) {
      setMonthDays({});
      return;
    }
    let cancelled = false;
    setMonthLoading(true);
    setMonthDays(null);
    fetch(
      `/api/availability/month?year=${viewYear}&month=${viewMonth + 1}&productIds=${productIdsParam}`,
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
  }, [productIdsParam, selectedProductIds.length, viewYear, viewMonth]);

  function fetchDaySlots(date: string) {
    setDayLoading(true);
    setDaySlots(null);
    fetch(`/api/availability/day?date=${date}&productIds=${productIdsParam}`)
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

  function toggleProduct(id: string) {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
    setSelectedDate(null);
    setSelectedTime(null);
    setDaySlots(null);
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

  function handleContinueToContact() {
    if (!selectedTime) return;
    goToStep("contact");
  }

  function handleReview() {
    if (!name.trim() || !phone.trim()) {
      setContactError("Completá nombre y teléfono para continuar.");
      return;
    }
    setContactError(null);
    goToStep("review");
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
          productIds: selectedProductIds,
          name: name.trim(),
          phone: phone.trim(),
        }),
      });

      if (response.status === 409) {
        setBookingError("Ese horario ya no está disponible. Elegí otro, por favor.");
        fetchDaySlots(selectedDate);
        setSelectedTime(null);
        goToStep("time");
        return;
      }

      if (!response.ok) {
        setBookingError("No pudimos confirmar tu turno. Probá de nuevo en unos minutos.");
        return;
      }

      const data = await response.json();
      setConfirmation({
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

  function resetFlow() {
    setSelectedProductIds([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setDaySlots(null);
    setName("");
    setPhone("");
    setContactError(null);
    setBookingError(null);
    setConfirmation(null);
    goToStep("products");
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

  return (
    <section className="mt-16 flex min-h-screen flex-col items-center bg-third/40 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-primary/20 bg-third p-6">
        <div className="mb-6 text-center">
          <h1 className="text text-2xl">Reservá tu turno</h1>
          <p className="mt-1 text-sm text-primary/70">
            Elegí qué te querés hacer, el día y el horario
          </p>
        </div>

        {step !== "confirmed" && (
          <div className="mb-6 flex gap-1.5">
            {STEPS.map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1 flex-1 rounded-full bg-primary/20",
                  STEPS.indexOf(step) >= STEPS.indexOf(s) && "bg-primary",
                )}
              />
            ))}
          </div>
        )}

        {step === "products" && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-primary">
              1. Elegí qué te querés hacer
            </h2>

            <div className="mb-3 grid grid-cols-3 gap-1.5">
              {SKILL_ORDER.map((skill) => {
                const countInSkill = selectedProducts.filter((p) => p.skill === skill).length;
                return (
                  <button
                    key={skill}
                    onClick={() => setActiveSkillTab(skill)}
                    className={cn(
                      "relative rounded-full border border-primary/30 py-2 text-xs font-medium text-primary",
                      activeSkillTab === skill && "bg-primary text-white",
                    )}
                  >
                    {SKILL_LABELS[skill]}
                    {countInSkill > 0 && (
                      <span
                        className={cn(
                          "ml-1 rounded-full bg-secondary px-1.5 text-primary",
                          activeSkillTab === skill && "bg-white",
                        )}
                      >
                        {countInSkill}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="max-h-80 space-y-1.5 overflow-y-auto pr-1">
              {PRODUCTS.filter((p) => p.skill === activeSkillTab).map((product) => {
                const checked = selectedProductIds.includes(product.id);
                return (
                  <label
                    key={product.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-primary",
                      checked && "border-primary bg-secondary/50 font-semibold",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleProduct(product.id)}
                        className="accent-primary"
                      />
                      {product.name}
                    </span>
                    <span className="text-xs text-primary/50">{product.durationMinutes} min</span>
                  </label>
                );
              })}
            </div>

            {selectedProducts.length > 0 && (
              <p className="mt-3 text-center text-xs text-primary/60">
                {selectedProducts.map((p) => p.name).join(", ")} — duración estimada:{" "}
                <span className="font-semibold">{totalDuration} min</span>
              </p>
            )}

            <button
              disabled={selectedProducts.length === 0}
              onClick={() => goToStep("day")}
              className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:bg-secondary disabled:text-primary/50"
            >
              Continuar
            </button>
          </div>
        )}

        {step === "day" && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-primary">2. Elegí el día</h2>

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

            <button
              disabled={!selectedDate}
              onClick={() => goToStep("time")}
              className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:bg-secondary disabled:text-primary/50"
            >
              Continuar
            </button>
            <button
              onClick={() => goToStep("products")}
              className="mt-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary"
            >
              Volver
            </button>
          </div>
        )}

        {step === "time" && selectedDate && (
          <div>
            <h2 className="mb-1 text-sm font-semibold text-primary">3. Elegí el horario</h2>
            <p className="mb-3 text-xs text-primary/60 capitalize">{formatDiaTexto(selectedDate)}</p>

            {bookingError && (
              <p className="mb-3 rounded-lg bg-red-50 p-2 text-xs text-red-600">{bookingError}</p>
            )}

            {dayLoading && <p className="py-6 text-center text-sm text-primary/50">Cargando horarios...</p>}

            {!dayLoading && daySlots && daySlots.length === 0 && (
              <p className="py-6 text-center text-sm text-primary/50">No hay turnos disponibles este día.</p>
            )}

            {!dayLoading && daySlots && daySlots.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
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

            <button
              disabled={!selectedTime}
              onClick={handleContinueToContact}
              className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:bg-secondary disabled:text-primary/50"
            >
              Continuar
            </button>
            <button
              onClick={() => goToStep("day")}
              className="mt-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary"
            >
              Volver
            </button>
          </div>
        )}

        {step === "contact" && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-primary">4. Tus datos</h2>

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

            {contactError && <p className="mt-2 text-xs text-red-600">{contactError}</p>}

            <button
              onClick={handleReview}
              className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white"
            >
              Revisar reserva
            </button>
            <button
              onClick={() => goToStep("time")}
              className="mt-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary"
            >
              Volver
            </button>
          </div>
        )}

        {step === "review" && selectedDate && selectedTime && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-primary">5. Confirmá tu reserva</h2>

            <div className="mb-4 space-y-1.5 rounded-xl bg-secondary/50 p-4">
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-primary/60">Servicios</span>
                <span className="text-right font-semibold text-primary">
                  {selectedProducts.map((p) => p.name).join(", ")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary/60">Día</span>
                <span className="font-semibold text-primary capitalize">
                  {formatDiaTexto(selectedDate)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary/60">Horario</span>
                <span className="font-semibold text-primary">{selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary/60">Nombre</span>
                <span className="font-semibold text-primary">{name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary/60">Teléfono</span>
                <span className="font-semibold text-primary">{phone}</span>
              </div>
            </div>

            {bookingError && (
              <p className="mb-3 rounded-lg bg-red-50 p-2 text-xs text-red-600">{bookingError}</p>
            )}

            <button
              disabled={submitting}
              onClick={handleConfirm}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {submitting ? "Confirmando..." : "Confirmar turno"}
            </button>
            <button
              onClick={() => goToStep("contact")}
              className="mt-2 w-full rounded-xl border border-primary/30 py-3 text-sm font-semibold text-primary"
            >
              Volver
            </button>
          </div>
        )}

        {step === "confirmed" && confirmation && (
          <div>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl text-primary">
              ✓
            </div>
            <h2 className="text text-center text-lg">¡Turno reservado!</h2>
            <p className="mb-5 text-center text-sm text-primary/70">
              Te espera <span className="font-semibold">{confirmation.employeeName}</span> el{" "}
              {formatDiaTexto(confirmation.date)} a las {confirmation.time} para{" "}
              {confirmation.products.join(", ")}.
            </p>

            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white"
            >
              <BsWhatsapp className="size-4" />
              Avisar por WhatsApp
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
    </section>
  );
}
