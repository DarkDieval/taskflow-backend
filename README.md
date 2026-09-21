# ⚙️ TaskFlow · Backend

**API REST para la aplicación TaskFlow.** Gestiona autenticación con JWT y CRUD de tareas con aislamiento entre usuarios.

## 🔗 API en vivo

- **URL base:** https://taskflow-backend-tpgr.onrender.com
- **Frontend (demo):** https://sparkly-alpaca-e58384.netlify.app/
- **Repositorio del frontend:** https://github.com/DarkDieval/taskflow-frontend

> ⚠️ **IMPORTANTE:** Para ver el frontend es necesario **iniciar sesión con una cuenta de Netlify** primero. Ve a https://app.netlify.com, inicia sesión, y luego abre la URL del demo.
>
> ⏱️ **Nota técnica:** el plan Free de Render "duerme" el servidor tras 15 minutos sin uso. La primera petición puede tardar ~50 segundos.

## 🚀 Cómo probar la API

Puedes usar **Postman**, **Thunder Client** o cualquier cliente HTTP.

**Registro:**
POST https://taskflow-backend-tpgr.onrender.com/api/signup
Content-Type: application/json

{
"email": "tucorreo@ejemplo.com",
"password": "123456",
"name": "Tu Nombre"
}

text

**Login:**
POST https://taskflow-backend-tpgr.onrender.com/api/signin
Content-Type: application/json

{
"email": "tucorreo@ejemplo.com",
"password": "123456"
}

text

La respuesta incluye un **JWT** que debes enviar en el header `Authorization: Bearer <token>` para acceder a las rutas protegidas.

## 🛠️ Tecnologías

- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose** (Atlas en producción)
- **JWT** (`jsonwebtoken`)
- **bcryptjs** para el hash de contraseñas
- **cors**, **dotenv**, **nodemon**

## 📡 Endpoints

| Método | Ruta             | Descripción                   | Auth |
| ------ | ---------------- | ----------------------------- | :--: |
| POST   | `/api/signup`    | Registrar usuario             |  ❌  |
| POST   | `/api/signin`    | Login (devuelve JWT)          |  ❌  |
| GET    | `/api/users/me`  | Perfil del usuario            |  ✅  |
| GET    | `/api/tasks`     | Tareas del usuario            |  ✅  |
| POST   | `/api/tasks`     | Crear tarea                   |  ✅  |
| PATCH  | `/api/tasks/:id` | Actualizar tarea              |  ✅  |
| DELETE | `/api/tasks/:id` | Eliminar una tarea            |  ✅  |
| DELETE | `/api/tasks`     | Eliminar varias tareas (bulk) |  ✅  |

### 🗑️ Eliminación múltiple

DELETE /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
"taskIds": ["<id1>", "<id2>", "<id3>"]
}

text

**Respuesta:**
{
"message": "3 tarea(s) eliminada(s)",
"deletedCount": 3
}

text

> 🔐 Solo elimina las tareas que pertenecen al **usuario autenticado**. Si se envían IDs ajenos, se ignoran.

## 📁 Estructura del proyecto

controllers/ users.js, tasks.js
middlewares/ auth.js, errors.js
models/ user.js, task.js
routes/ auth.js, users.js, tasks.js
config.js valida JWT_SECRET al arrancar
app.js servidor principal

text

## 🧑‍💻 Instalación local

1. Clona el repositorio:
   git clone https://github.com/DarkDieval/taskflow-backend.git

text

2. Instala dependencias:
   npm install

text

3. Crea un archivo `.env` en la raíz:
   MONGODB_URI=mongodb://127.0.0.1:27017/taskflowdb
   JWT_SECRET=tu_clave_secreta_aqui

text

4. Arranca el servidor:
   npm run dev

text

La API quedará disponible en `http://localhost:3000`

## 🔐 Seguridad aplicada

- **Contraseñas hasheadas** con bcrypt (10 rondas).
- **JWT firmado** con `JWT_SECRET` — el servidor falla al arrancar si la variable no está configurada.
- **Verificación de propiedad** (`owner`): un usuario no puede modificar ni eliminar tareas ajenas.
- **Filtrado por `owner`** en queries de MongoDB (`findOneAndUpdate({ _id, owner })`).
- **Manejo centralizado de errores**; nunca se expone el stack trace al cliente.
- **`.env` excluido de Git**.

## 🔗 Repositorio relacionado

- **Frontend (React):** https://github.com/DarkDieval/taskflow-frontend

## 👤 Autor

**Diego Valencia** ([@DarkDieval](https://github.com/DarkDieval))
