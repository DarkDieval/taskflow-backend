const Task = require("../models/task");

module.exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    return res.send(tasks);
  } catch (err) {
    return next(err);
  }
};

module.exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      owner: req.user._id,
    });
    return res.status(201).send(task);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Datos de la tarea inválidos" });
    }
    return next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, isCompleted } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, owner: req.user._id },
      { title, description, isCompleted },
      { new: true, runValidators: true },
    );

    if (!task) {
      return res.status(404).send({ message: "Tarea no encontrada" });
    }

    return res.send(task);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "ID de tarea inválido" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Datos de la tarea inválidos" });
    }
    return next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).select("+owner");

    if (!task) {
      return res.status(404).send({ message: "Tarea no encontrada" });
    }

    if (task.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .send({ message: "No puedes eliminar tareas de otros usuarios" });
    }

    await task.deleteOne();
    return res.send({ message: "Tarea eliminada correctamente" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "ID de tarea inválido" });
    }
    return next(err);
  }
};
