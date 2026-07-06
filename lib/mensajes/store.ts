import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Mensaje = {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  mensaje: string;
};

// Interino: persistencia en un archivo local hasta que exista el backend real.
// Misma limitación que lib/reservas/store.ts: solo confiable en local/dev.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "mensajes.json");

async function leerMensajes(): Promise<Mensaje[]> {
  try {
    const contenido = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(contenido) as Mensaje[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function appendMensaje(
  mensaje: Omit<Mensaje, "id" | "fecha">
): Promise<Mensaje> {
  await mkdir(DATA_DIR, { recursive: true });

  const mensajes = await leerMensajes();
  const nuevo: Mensaje = {
    ...mensaje,
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),
  };

  mensajes.push(nuevo);
  await writeFile(DATA_FILE, JSON.stringify(mensajes, null, 2), "utf-8");

  return nuevo;
}
