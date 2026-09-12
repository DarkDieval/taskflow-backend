require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const { errorHandler } = require("./middlewares/errors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.send("¡Servidor TaskFlow funcionando!");
});

app.use((req, res) => {
  res.status(404).send({ message: "Ruta no encontrada" });
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskflowdb")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
