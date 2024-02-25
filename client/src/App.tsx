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

function App() {
  const [taskBoard, setTaskBoard] = useState<Board | null>(null)

  useEffect(() => {
    axios
      .get('http://localhost:3000/todos')
      .then((res: AxiosResponse<Board>) => {
        setTaskBoard(res.data)
      })
  }, [])

  const create = () => {
    const params = new URLSearchParams()
    params.append('title', 'test')
    axios.post('http://localhost:3000/todos/create', params)
  }

  if (taskBoard === null) {
    return <Empty />
  }

  return (
    <div className={styles.root}>
      <TaskBoard taskBoard={taskBoard} />
      <button onClick={create}>ボタン</button>
    </div>
  )
}

export default App
