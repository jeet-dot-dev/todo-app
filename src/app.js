import express from "express";

const app = express();
const todos = [
  {
    id: 1,
    title: "Buy groceries",
    completed: false,
  },
  {
    id: 2,
    title: "Finish Express API setup",
    completed: true,
  },
  {
    id: 3,
    title: "Read for 20 minutes",
    completed: false,
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    msg: "Hi from server ",
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
  });
});

app.get("/api/todos", (req, res) => {
  return res.status(200).json({
    data: todos,
  });
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      message: "title is required and must be a string",
    });
  }

  const nextId =
    todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

  const todo = {
    id: nextId,
    title,
    completed: false,
  };

  todos.push(todo);

  return res.status(201).json({
    message: "Todo created",
    data: todo,
  });
});

export default app;
