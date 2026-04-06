import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getUserId } from "@/lib/auth";
import { deleteUser } from "@/models/user.model";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "El ID del usuario es requerido" },
        { status: 400 }
      );
    }

    const id_usuario = await getUserId();
    if (!id_usuario) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    // Eliminar usuario
    await deleteUser(id);
    return NextResponse.json(
      { message: "Usuario eliminado exitosamente" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}