export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export type Board = {
  name: string;
  tasks: Task[];
};
