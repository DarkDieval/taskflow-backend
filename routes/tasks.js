const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteManyTasks,
} = require("../controllers/tasks");

router.use(auth);

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/", deleteManyTasks);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
