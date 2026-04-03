import { supabase } from "@/lib/supabaseClient";

export interface Task {
  id: number;
  id_usuario: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  fecha_vencimiento: string;
}
// Crear tarea
export async function createTask(data: { id_usuario: number; nombre: string; descripcion: string; tipo: string; fecha_vencimiento: string; }) {
  const { data: tasks, error } = await supabase
    .from("tareas")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return tasks;
}

// Buscar tarea por id
export async function findTaskById(id: number) {
  const { data: tasks, error } = await supabase
    .from("tareas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return tasks;
}

// Actualizar tarea por id
export async function updateTask(id: number, data: { nombre?: string; descripcion?: string; tipo?: string; fecha_vencimiento?: string; }) {
  const { data: tasks, error } = await supabase
    .from("tareas")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return tasks;
}

// Listar tareas por usuario y
export async function listTasks(id_usuario: number, tipo: string) {
  const { data: tasks, error } = await supabase
    .from("tareas")
    .select("*")
    .eq("id_usuario", id_usuario)
    .eq("tipo", tipo);

  if (error) throw error;
  return tasks;
}