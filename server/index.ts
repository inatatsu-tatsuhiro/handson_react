import express from "express";
import cors from "cors";
import mysql from "mysql";
const app: express.Express = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logData = `
2023/12/19 13:01:12 leave 教員森山 1moriyama7 リアル研究室
2023/12/19 13:43:10 join B4_堀0121 b4_hori リアル研究室
2023/12/19 14:01:41 leave B4堀0121 b4_hori リアル研究室
2023/12/19 14:01:42 join B4堀0121 b4_hori リアル研究室
2023/12/19 14:03:23 message b4_hori データベースにログデータのinser作業
2023/12/19 14:20:30 join M2塩野 M2_塩野0482 バーチャル個室01
2023/12/19 14:20:45 leave M2塩野 M2_塩野0482 バーチャル個室01
2023/12/19 14:59:30 join M2福永0455 hikaru5469 バーチャル会議室
2023/12/19 14:59:37 join 教員森山 1moriyama7 バーチャル会議室
2023/12/19 15:01:07 message 1moriyama7 院生の文献紹介です。
2023/12/19 15:01:13 message hikaru5469 院生、文献紹介
2023/12/19 15:03:19 join M2塩野 M2塩野0482 バーチャル会議室
2023/12/20 8:25:54 join M2塩野 M2_塩野0482 バーチャル個室01
`;

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
  const time1 = "2023/12/19-12:24:16";
  const time2 = "2023/12/19-12:25:06";
  const date1 = new Date(time1).getTime();
  const date2 = new Date(time2).getTime();
  res.send({ sub: date2 - date1, date1, date2 });
});

app.get("/log", (_req, res) => {
  const logs = logData.split("\n");
  const removedMessage = [];
  const result = [];
  for (const l of logs) {
    if (l.indexOf("message") === -1) {
      removedMessage.push(l);
    }
  }

  const insertedJoin = [];

  for (const l of removedMessage) {
    if (l === "") continue;
    if (l.indexOf("join")) {
      console.log({ l });
      const tmp = l.split(" ");
      const j = {
        join_at: `${tmp[0]}-${tmp[1]}`,
        leave_at: `${tmp[0]}-${tmp[1]}`,
        user_id: tmp[4],
      };
      insertedJoin.push(j);
    }
  }
  // for (const l of logs) {
  //   if (l.indexOf("leave")) {
  //     const tmp = l.split(" ");
  //     const j = {
  //       join_at: `${tmp[0]}-${tmp[1]}`,
  //       leave_at: `${tmp[0]}-${tmp[1]}`,
  //       user_id: tmp[4],
  //     };
  //     insertedJoin.push(j);
  //   }
  // }

  res.send({ result: insertedJoin });
});

app.get("/todos", (_req, res) => {
  res.send(json);
});
app.get("/todos/:id", (req, res) => {
  res.send({
    id: req.params.id,
  });
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
