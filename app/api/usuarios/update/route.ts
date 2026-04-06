import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User, updateUser, findUserByEmail } from "@/models/user.model";

export async function PUT(req: NextRequest) {
  try {
    const { id, nombre, email, password } = await req.json();

    if (!nombre && !email && !password) {
      return NextResponse.json(
        { error: "Es requerido al menos un campo" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: "El correo no es válido" },
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

    // Actualizar usuario y encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUser(id, { nombre, email, password: hashedPassword });

    return NextResponse.json(
      { message: "Usuario actualizado exitosamente" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}