import jwt from "jsonwebtoken";
import { getToken } from "@/lib/supabaseClient";

interface Payload {
  id: number;
  name: string;
  aleatory?: number;
}

export function crearToken(id: number, name: string, aleatory?: number): string {
  const payload: Payload = { id, name, aleatory: aleatory ?? Math.floor(Math.random() * 1000000) };
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" });
}

export function validarToken(token?: string): Payload {
  if (!token) throw new Error("Acceso denegado");
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as Payload;
  } catch {
    throw new Error("Token inválido o expirado");
  }
}

export async function getUserId() {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No autorizado");
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = await jwt.verify(token, process.env.JWT_SECRET!) as Payload;

    // Supongamos que tu JWT guarda el id en el campo "sub" o "id"
    return payload.id;
  } catch (error) {
    throw new Error("Token inválido");
  }
}