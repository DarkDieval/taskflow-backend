module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (statusCode === 500) {
    console.error("❌ Error 500:", err);
  }

  const responseMessage =
    statusCode === 500 ? "Error interno del servidor" : message;

  res.status(statusCode).send({ message: responseMessage });
};
