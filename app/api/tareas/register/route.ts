import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getUserId } from "@/lib/auth";
import { createTask} from "@/models/task.model";

export async function POST(req: NextRequest) {
  try {
    const { nombre, descripcion, tipo, fecha_vencimiento } = await req.json();

    if (!nombre || !descripcion || !tipo || !fecha_vencimiento) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
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

    // Crear tarea
    await createTask({id_usuario, nombre, descripcion, tipo, fecha_vencimiento });
    return NextResponse.json(
      { message: "Tarea creada exitosamente" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al crear tarea" },
      { status: 500 }
    );
  }
}