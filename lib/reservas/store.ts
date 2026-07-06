import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Reserva = {
  id: string;
  fecha: string;
  planId: string;
  planNombre: string;
  montoTotal: number;
  paypalOrderId: string;
  contacto: {
    nombreCompleto: string;
    email: string;
    telefono: string;
  };
  viajeros: string[];
};

// Interino: persistencia en un archivo local hasta que exista el backend real.
// En Vercel el filesystem de producción no persiste entre invocaciones — esto
// solo es confiable en `npm run dev` / local. No usar como fuente de verdad en prod.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "reservas.json");

async function leerReservas(): Promise<Reserva[]> {
  try {
    const contenido = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(contenido) as Reserva[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function appendReserva(
  reserva: Omit<Reserva, "id" | "fecha">
): Promise<Reserva> {
  await mkdir(DATA_DIR, { recursive: true });

  const reservas = await leerReservas();
  const nueva: Reserva = {
    ...reserva,
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),
  };

  reservas.push(nueva);
  await writeFile(DATA_FILE, JSON.stringify(reservas, null, 2), "utf-8");

  return nueva;
}
