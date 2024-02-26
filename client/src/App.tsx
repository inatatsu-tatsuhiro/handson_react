import "./App.css";
import { TaskBoard } from "./features/TaskBoard";

function App() {
  return (
    <div>
      <TaskBoard name="今日のタスク" age={24} />
    </div>
  );
}

export default App;
