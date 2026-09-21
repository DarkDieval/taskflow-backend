# TaskFlow - Backend

API REST para la aplicación TaskFlow. Gestiona autenticación con JWT y CRUD de tareas con aislamiento entre usuarios.

## 🔗 API en vivo

- **URL Base:** [https://taskflow-backend-tpgr.onrender.com](https://taskflow-backend-tpgr.onrender.com)
- **Frontend (demo):** [https://sparkly-alpaca-e58384.netlify.app/](https://sparkly-alpaca-e58384.netlify.app/)
- **Repositorio Frontend:** [https://github.com/DarkDieval/taskflow-frontend](https://github.com/DarkDieval/taskflow-frontend)

### 🚀 Cómo probar la API

Puedes probar los endpoints con **Postman**, **Thunder Client** o cualquier cliente HTTP.

**Ejemplo de registro:**

```http
POST https://taskflow-backend-tpgr.onrender.com/api/signup
Content-Type: application/json

{
  "email": "tucorreo@ejemplo.com",
  "password": "123456",
  "name": "Tu Nombre"
}
Ejemplo de login:

http
POST https://taskflow-backend-tpgr.onrender.com/api/signin
Content-Type: application/json

{
  "email": "tucorreo@ejemplo.com",
  "password": "123456"
}
La respuesta incluirá un JWT que debes enviar en el header Authorization: Bearer <token> para las rutas protegidas.

Nota: El plan Free de Render "duerme" el servidor tras 15 min sin uso. El primer request tarda ~50 segundos en despertar.

🚀 Tecnologías
Node.js + Express 5

MongoDB + Mongoose 9 (Atlas en producción)

JWT (jsonwebtoken)

bcryptjs (hash de contraseñas)

CORS, dotenv, nodemon

📡 Endpoints
Método	Ruta	Descripción	Auth
POST	/api/signup	Registrar usuario	❌
POST	/api/signin	Login (devuelve JWT)	❌
GET	/api/users/me	Perfil del usuario	✅
GET	/api/tasks	Tareas del usuario	✅
POST	/api/tasks	Crear tarea	✅
PATCH	/api/tasks/:id	Actualizar tarea	✅
DELETE	/api/tasks/:id	Eliminar tarea	✅
📁 Estructura del proyecto
text
├── controllers/   (users.js, tasks.js)
├── middlewares/   (auth.js, errors.js)
├── models/        (user.js, task.js)
├── routes/        (auth.js, users.js, tasks.js)
├── config.js      (valida JWT_SECRET al arrancar)
└── app.js         (servidor principal)
🛠️ Instalación local
Clona el repositorio:

bash
git clone https://github.com/DarkDieval/taskflow-backend.git
Instala dependencias:

bash
npm install
Crea un archivo .env en la raíz:

env
MONGODB_URI=mongodb://127.0.0.1:27017/taskflowdb
JWT_SECRET=tu_clave_secreta_aqui
Arranca el servidor:

bash
npm run dev
La API estará en http://localhost:3000

🔐 Seguridad aplicada
Contraseñas hasheadas con bcrypt (10 rondas).

JWT firmado con JWT_SECRET (falla al arrancar si no está configurado).

Verificación de propiedad: los usuarios no pueden modificar/eliminar tareas ajenas.

Manejo centralizado de errores (no expone stack traces).

.env excluido de Git.

🔗 Repositorio relacionado
Frontend (React): https://github.com/DarkDieval/taskflow-frontend

👤 Autor
Diego Valencia (@DarkDieval)
```
