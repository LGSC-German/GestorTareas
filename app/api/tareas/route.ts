import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { crearToken } from "@/lib/auth";
import {User, findUserByEmail} from "@/models/user.model";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const user: User = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { mensaje: "Correo inválido" },
        { status: 401 }
      );
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { mensaje: "Contraseña inválida" },
        { status: 401 }
      );
    }

    const token = crearToken(user.id, user.nombre);
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}