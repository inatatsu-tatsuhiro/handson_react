import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { Board } from "../models/Todo";
import { css } from "@emotion/css";

type Props = {
  name: string;
  age: number;
};

const styles = {
  root: css({
    background: "#BB5090",
    width: "800px",
    height: "600px",
    padding: "32px",
    borderRadius: "16px",
  }),
};

export const TaskBoard: FC<Props> = () => {
  const [isShowDone, setIsShowDone] = useState(true);
  const [taskBoard, setTaskBoard] = useState<Board | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((res: AxiosResponse<Board>) => {
        setTaskBoard(res.data);
      });
  }, []);

  const handleClick = () => {
    setIsShowDone((prev) => !prev);
  };

  if (taskBoard === null) {
    return <div>タスクボードが見つかりません</div>;
  }

  return (
    <div className={styles.root}>
      <div>{taskBoard.name}</div>
      <div>タスク:{taskBoard.tasks.length}個</div>
      <div>
        完了ずみタスク:{taskBoard.tasks.filter((task) => task.isDone).length}個
      </div>
    </div>
  );
};
