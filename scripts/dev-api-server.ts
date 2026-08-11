// Servidor mínimo para probar las funciones de /api en local sin depender de
// `vercel dev` (que requiere estar logueado en una cuenta de Vercel).
// Solo para desarrollo: envuelve cada handler en un server http plano y le arma
// los campos `query` / `body` que normalmente pone el runtime de Vercel.
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import dayHandler from "../api/availability/day";
import monthHandler from "../api/availability/month";
import bookingsHandler from "../api/bookings";
import bookingsConfirmHandler from "../api/bookings/confirm";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const PORT = 3001;

type Handler = (req: VercelRequest, res: VercelResponse) => unknown;

const routes: Record<string, Handler> = {
  "/api/availability/day": dayHandler as Handler,
  "/api/availability/month": monthHandler as Handler,
  "/api/bookings": bookingsHandler as Handler,
  "/api/bookings/confirm": bookingsConfirmHandler as Handler,
};

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const handler = routes[url.pathname];

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (!handler) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "NOT_FOUND" }));
    return;
  }

  const vercelReq = req as unknown as VercelRequest;
  vercelReq.query = Object.fromEntries(url.searchParams.entries());

  const rawBody = await readBody(req);
  vercelReq.body = rawBody ? JSON.parse(rawBody) : undefined;

  const vercelRes = res as unknown as VercelResponse;
  vercelRes.status = (code: number) => {
    res.statusCode = code;
    return vercelRes;
  };
  vercelRes.json = (payload: unknown) => {
    const body = JSON.stringify(payload);
    if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "application/json");
    (res as ServerResponse).end(body);
    return vercelRes;
  };

  try {
    await handler(vercelReq, vercelRes);
  } catch (error) {
    console.error(`Error en ${url.pathname}`, error);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "INTERNAL_ERROR" }));
    }
  }
});

server.listen(PORT, () => {
  console.log(`API de desarrollo escuchando en http://localhost:${PORT}`);
});
