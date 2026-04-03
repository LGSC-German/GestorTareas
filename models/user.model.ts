import { supabase } from "@/lib/supabaseClient";

export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

// Crear usuario
export async function createUser(data: { nombre: string; email: string; password: string }) {
  const { data: user, error } = await supabase
    .from("usuarios")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return user;
}

// Buscar usuario por email
export async function findUserByEmail(email: string) {
  const { data: user, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;
  return user;
}

// Listar usuarios
export async function listUsers() {
  const { data: users, error } = await supabase
    .from("usuarios")
    .select("*");

  if (error) throw error;
  return users;
}

