# TaskFlow · Backend

API REST para la aplicación TaskFlow. Gestiona autenticación con JWT y CRUD de tareas con aislamiento entre usuarios.

## 🔗 API en vivo

- **URL base:** [https://taskflow-backend-tpgr.onrender.com](https://taskflow-backend-tpgr.onrender.com)
- **Frontend (demo):** [https://sparkly-alpaca-e58384.netlify.app/](https://sparkly-alpaca-e58384.netlify.app/)
- **Repositorio del frontend:** [taskflow-frontend](https://github.com/DarkDieval/taskflow-frontend)

> **Nota:** el plan Free de Render "duerme" el servidor tras 15 minutos sin uso. La primera petición puede tardar ~50 segundos en responder mientras el servidor despierta.

## 🚀 Cómo probar la API

Puedes usar **Postman**, **Thunder Client** o cualquier cliente HTTP.

**Registro:**

```http
POST https://taskflow-backend-tpgr.onrender.com/api/signup
Content-Type: application/json

{
  "email": "tucorreo@ejemplo.com",
  "password": "123456",
  "name": "Tu Nombre"
}
```

**Login:**

```http
POST https://taskflow-backend-tpgr.onrender.com/api/signin
Content-Type: application/json

{
  "email": "tucorreo@ejemplo.com",
  "password": "123456"
}
```

La respuesta incluye un JWT que debes enviar en el header `Authorization: Bearer <token>` para acceder a las rutas protegidas.

## 🛠️ Tecnologías

- Node.js + Express 5
- MongoDB + Mongoose (Atlas en producción)
- JWT (`jsonwebtoken`)
- `bcryptjs` para el hash de contraseñas
- `cors`, `dotenv`, `nodemon`

## 📡 Endpoints

| Método | Ruta             | Descripción          | Auth |
| ------ | ---------------- | -------------------- | :--: |
| POST   | `/api/signup`    | Registrar usuario    |  ❌  |
| POST   | `/api/signin`    | Login (devuelve JWT) |  ❌  |
| GET    | `/api/users/me`  | Perfil del usuario   |  ✅  |
| GET    | `/api/tasks`     | Tareas del usuario   |  ✅  |
| POST   | `/api/tasks`     | Crear tarea          |  ✅  |
| PATCH  | `/api/tasks/:id` | Actualizar tarea     |  ✅  |
| DELETE | `/api/tasks/:id` | Eliminar tarea       |  ✅  |

## 📁 Estructura del proyecto

```text
├── controllers/   (users.js, tasks.js)
├── middlewares/   (auth.js, errors.js)
├── models/        (user.js, task.js)
├── routes/        (auth.js, users.js, tasks.js)
├── config.js      (valida JWT_SECRET al arrancar)
└── app.js         (servidor principal)
```

## 🧑‍💻 Instalación local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DarkDieval/taskflow-backend.git
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/taskflowdb
   JWT_SECRET=tu_clave_secreta_aqui
   ```
4. Arranca el servidor:
   ```bash
   npm run dev
   ```
   La API quedará disponible en `http://localhost:3000`.

## 🔐 Seguridad aplicada

- Contraseñas hasheadas con bcrypt (10 rondas).
- JWT firmado con `JWT_SECRET` — el servidor falla al arrancar si la variable no está configurada.
- Verificación de propiedad (`owner`): un usuario no puede modificar ni eliminar tareas ajenas.
- Manejo centralizado de errores; nunca se expone el stack trace al cliente.
- `.env` excluido de Git.

## 🔗 Repositorio relacionado

Frontend (React): [taskflow-frontend](https://github.com/DarkDieval/taskflow-frontend)

## 👤 Autor

Diego Valencia ([@DarkDieval](https://github.com/DarkDieval))
