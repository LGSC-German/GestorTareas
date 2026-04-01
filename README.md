# Gestor de Tareas con Drag & Drop

Aplicación web para organizar tareas en columnas estilo Kanban.

## Tecnologías
- Frontend: React + TypeScript + Tailwind CSS
- Backend: Next.js API Routes
- Base de datos: Postgres (Supabase)
- Despliegue: Vercel
- Propuesta: Pantallas (Stitch)

## Funcionalidades
- Crear, editar y eliminar tareas
- Arrastrar y soltar entre columnas
- Autenticación de usuarios
- Persistencia en base de datos

## Estructura 
```
Desarrollo-Equipo1/
├── README.md
├── schema.sql                        ← Script de creación de BD (Postgres)
├── .env                              ← Plantilla de variables de entorno
├── package.json
├── next.config.ts
├── propuesta/
│   └── screens/                      ← Imágenes exportadas de Stitch
├── README.md                         ← Pantallas y modelo de BD explicados
├── app/
│   ├── layout.tsx                    ← Layout raíz
│   ├── page.tsx                      ← Login / Registro (/)
│   └── api/
│       ├─ auth/
│       |   ├── register/route.ts     ← POST /api/auth/register
│       |   └── login/route.ts        ← POST /api/auth/login
│       ├─ usuarios/route.ts          ← POST /api/usuarios
│       └── tareas/
|           ├── route.ts              ← POST /api/tareas
│           └── [id_user]/route.ts    ← POST /api/tareas/
|         
├── lib/
│   ├── db.js                         ← Pool de conexión a Posgress
│   └── auth.ts                       ← Helpers JWT
├── models/
│   └── user.model.ts                 ← Queries de usuarios
├── proxy.ts                          ← Verificación JWT (Next.js proxy)
└── public/                           ← Assets estáticos
```

### Posible escalamiento con conexion a calendario personal

*Proyecto · Desarrollo Web 2026 LGSC*
