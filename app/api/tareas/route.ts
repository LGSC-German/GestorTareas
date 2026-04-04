import { NextRequest, NextResponse } from "next/server";
import {Task} from "@/models/task.model";

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    return NextResponse.json({status: 200});
  } catch {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}