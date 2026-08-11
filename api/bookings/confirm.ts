import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { confirmEvent } from "../_lib/googleCalendar";

const bodySchema = z.object({
  eventIds: z.array(z.string().min(1)).min(1).max(5),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
    return;
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "VALIDATION_ERROR", details: parsed.error.flatten() });
    return;
  }

  try {
    // Turno combinado = varios eventos ligados; se confirman todos juntos.
    await Promise.all(parsed.data.eventIds.map((id) => confirmEvent(id)));
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error confirmando turno en Google Calendar", error);
    res.status(502).json({ error: "CALENDAR_UNAVAILABLE" });
  }
}
