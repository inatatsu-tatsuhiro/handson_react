import express from "express";
import cors from "cors";
const app: express.Express = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const json = {
  name: "タスクボード",
  tasks: [
    {
      title: "環境構築",
      isDone: true,
      id: 1,
    },
    {
      title: "JavaScriptを学ぶ",
      isDone: true,
      id: 2,
    },
    {
      title: "TypeScriptを学ぶ",
      isDone: false,
      id: 3,
    },
    {
      title: "Expressを学ぶ",
      isDone: false,
      id: 4,
    },
    {
      title: "Reactを学ぶ",
      isDone: false,
      id: 5,
    },
    {
      title: "Todoアプリを作る",
      isDone: false,
      id: 6,
    },
  ],
};

let nextId = 7;

const increment = () => {
  nextId++;
};

const addTask = (title: string) => {
  json.tasks.push({
    title: title,
    isDone: false,
    id: nextId,
  });
  increment();
};

const removeTask = (id: string) => {
  const updatedTasks = json.tasks.filter((task) => task.id !== Number(id));
  json.tasks = updatedTasks;
};

const updateTask = (id: string) => {
  const updatedTasks = json.tasks.map((task) => {
    return task.id === Number(id)
      ? {
          ...task,
          isDone: !task.isDone,
        }
      : {
          ...task,
        };
  });
  json.tasks = updatedTasks;
};

app.get("/", (_req, res) => {
  res.send("Hello World!");
});
app.get("/todos", (_req, res) => {
  res.send(json);
});

app.post("/todos/create", (req, res) => {
  const title = req.body.title;
  addTask(title);
  res.send({ status: 200 });
});

app.post("/todos/delete", (req, res) => {
  const id = req.body.id;
  removeTask(id);
  res.send({ status: 200 });
});
app.post("/todos/update", (req, res) => {
  const id = req.body.id;
  updateTask(id);
  res.send({ status: 200 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
