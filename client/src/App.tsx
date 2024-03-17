/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './App.css'
import axios, { AxiosResponse } from 'axios'
import { Board } from './models/Todo'
import { TaskBoard } from './features/TaskBoard'
import { css } from '@emotion/css'
import { Empty } from './features/Empty'

const styles = {
  root: css({
    marginTop: '80px'
  })
}
type Log = {
  join_at: string
  leave_at: string
  user_id: string
}
type Data = {
  result: Log[]
}

function App() {
  const [taskBoard, setTaskBoard] = useState<Board | null>(null)
  const [logs, setLogs] = useState<Log[]>([])

  const update = () => {
    // axios
    //   .get('http://localhost:3000/todos')
    //   .then((res: AxiosResponse<Board>) => {
    //     console.log(res.data)
    //     setTaskBoard(res.data)
    //   })
  }

  useEffect(() => {
    // update()
    axios.get('http://localhost:3000/log').then((res: AxiosResponse<Data>) => {
      console.log(res.data)
      setLogs(res.data.result)
    })
  }, [])

  // if (taskBoard === null) {
  //   return <Empty />
  // }

  return (
    <div className={styles.root}>
      {/* <TaskBoard taskBoard={taskBoard} update={update} /> */}
      <div>
        {logs.map((log) => (
          <div key={log.join_at}>
            <div>{log.user_id}</div>
            <div>{log.join_at}</div>
            <div>{log.leave_at}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
