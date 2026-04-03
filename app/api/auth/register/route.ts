import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { crearToken } from "@/lib/auth";
import { User, createUser, findUserByEmail } from "@/models/user.model";

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, password } = await req.json();
    const user: User = null as any;

    if (!nombre || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 409 }
      );
    }

    // Crear usuario y encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ nombre, email, password: hashedPassword });

    const token = crearToken(user.id, user.nombre);
    return NextResponse.json(
      { token },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}