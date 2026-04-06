import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getUserId } from "@/lib/auth";
import { deleteTask } from "@/models/task.model";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "El ID de la tarea es requerido" },
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

    // Eliminar tarea
    await deleteTask(id);
    return NextResponse.json(
      { message: "Tarea eliminada exitosamente" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar tarea" },
      { status: 500 }
    );
  }
}