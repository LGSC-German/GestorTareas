import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getUserId } from "@/lib/auth";
import { Task, listTasks} from "@/models/task.model";

export async function GET(req: NextRequest) {
  try {
    const { tipo } = await req.json();

    if (!tipo ) {
      return NextResponse.json(
        { error: "Error en carga de tareas" },
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
    
    // Listar tareas
    const tareas: Task[] = await listTasks(id_usuario, tipo);
    return NextResponse.json(
      { tareas },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al listar tareas" },
      { status: 500 }
    );
  }
}