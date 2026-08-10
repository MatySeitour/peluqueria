// Cliente mínimo contra la REST API de Google Calendar v3 vía google-auth-library.
// Se evita el paquete `googleapis` completo (pesado, perjudica el cold-start serverless).

import { JWT } from "google-auth-library";
import type { RawGoogleEvent } from "../../src/lib/availability";

const CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";
const EVENT_FIELDS = "items(status,start,end,extendedProperties)";

let client: JWT | null = null;

function getClient(): JWT {
  if (client) return client;

  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error(
      "Faltan las variables de entorno GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY.",
    );
  }

  client = new JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });
  return client;
}

function getCalendarId(): string {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    throw new Error("Falta la variable de entorno GOOGLE_CALENDAR_ID.");
  }
  return calendarId;
}

export async function listEvents(
  timeMin: string,
  timeMax: string,
): Promise<RawGoogleEvent[]> {
  const url = `${CALENDAR_API_BASE}/calendars/${encodeURIComponent(getCalendarId())}/events`;
  const response = await getClient().request<{ items?: RawGoogleEvent[] }>({
    url,
    params: {
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
      fields: EVENT_FIELDS,
    },
  });
  return response.data.items ?? [];
}

export interface InsertEventPayload {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  timeZone: string;
  extendedProperties: Record<string, string>;
}

export interface InsertedEvent {
  id: string;
}

export async function insertEvent(payload: InsertEventPayload): Promise<InsertedEvent> {
  const url = `${CALENDAR_API_BASE}/calendars/${encodeURIComponent(getCalendarId())}/events`;
  const response = await getClient().request<InsertedEvent>({
    url,
    method: "POST",
    data: {
      summary: payload.summary,
      description: payload.description,
      start: { dateTime: payload.startDateTime, timeZone: payload.timeZone },
      end: { dateTime: payload.endDateTime, timeZone: payload.timeZone },
      extendedProperties: { private: payload.extendedProperties },
    },
  });
  return response.data;
}
