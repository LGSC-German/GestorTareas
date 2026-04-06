import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { Task, findTaskById} from "@/models/task.model";

export async function GET(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id ) {
      return NextResponse.json(
        { error: "Error en carga de tarea" },
        { status: 400 }
      );
    }

    const tarea: Task = await findTaskById(id);
    return NextResponse.json(
      { tarea },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al listar tareas" },
      { status: 500 }
    );
  }
}