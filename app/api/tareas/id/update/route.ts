import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { updateTask} from "@/models/task.model";

export async function PUT(req: NextRequest) {
  try {
    const { id, nombre, descripcion, tipo, fecha_vencimiento } = await req.json();

    if (!nombre && !descripcion && !tipo && !fecha_vencimiento) {
      return NextResponse.json(
        { error: "Es requerido al menos un campo" },
        { status: 400 }
      );
    }

    // Actualizar tarea
    await updateTask(id, { nombre, descripcion, tipo, fecha_vencimiento });
    return NextResponse.json(
      { message: "Tarea actualizada exitosamente" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar tarea" },
      { status: 500 }
    );
  }
}