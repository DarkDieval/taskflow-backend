const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error(
    "❌ Falta la variable de entorno JWT_SECRET. Configúrala en el archivo .env o en el panel de Render.",
  );
}

module.exports = { JWT_SECRET };
