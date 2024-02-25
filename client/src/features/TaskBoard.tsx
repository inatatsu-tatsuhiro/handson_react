import { FC, useEffect, useState } from 'react'
import { Board, Task } from '../models/Todo'
import { Color } from '../utils/Color'
import { Card } from './Card'
import { css } from '@emotion/css'
import { CheckBox } from './CheckBox'
import { TaskCard } from './TaskCard'
import axios from 'axios'

type Props = {
  taskBoard: Board
}

const styles = {
  root: css({
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column'
  }),
  content: css({
    borderRadius: '8px',
    background: Color.gray_white,
    padding: '15px',
    width: '770px'
  }),
  title: css({
    fontSize: '24px'
  }),
  cards: css({
    display: 'flex',
    gap: '10px',
    margin: '15px 0px'
  }),
  vr: css({
    width: 'calc(100% + 30px)',
    marginLeft: '-15px',
    height: '4px',
    background: Color.white,
    marginBottom: '15px'
  }),
  list: css({
    paddingTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  })
}

export const TaskBoard: FC<Props> = ({ taskBoard }) => {
  const [checked, setChecked] = useState(false)

  const [tasks, setTasks] = useState<Task[]>(taskBoard.tasks)

  const clickCheckBox = () => {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  const taskRemove = (id: number) => {
    const params = new URLSearchParams()
    params.append('id', `${id}`)
    axios.post('http://localhost:3000/todos/delete', params)
    const updatedTasks = tasks.filter((task) => id !== task.id)
    setTasks(updatedTasks)
  }

  const changeStatus = (id: number) => {
    const params = new URLSearchParams()
    params.append('id', `${id}`)
    axios.post('http://localhost:3000/todos/update', params)
    const updatedTasks = tasks.map((task) => {
      return task.id === id
        ? {
            ...task,
            isDone: !task.isDone
          }
        : {
            ...task
          }
    })
    setTasks(updatedTasks)
  }

  useEffect(() => {
    console.log({ tasks })
  }, [tasks])

  const doneCount = tasks.filter((task) => !task.isDone).length
  const doingCount = tasks.filter((task) => task.isDone).length
  const taskCount = tasks.length

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.title}>{taskBoard.name}</div>
        <div className={styles.cards}>
          <Card title="未着手" text={`${doneCount}`} />
          <Card title="完了済み" text={`${doingCount}`} />
          <Card
            title="達成率"
            text={`${Math.round((1 - doneCount / taskCount) * 1000) / 10}%`}
          />
        </div>
        <div className={styles.vr} />
        <CheckBox
          checked={checked}
          text="完了済みを表示"
          clickHandler={clickCheckBox}
        />
        <div className={styles.list}>
          {tasks
            .filter((task) => (checked ? true : !task.isDone))
            .map((task) => {
              return (
                <TaskCard
                  clickHandler={changeStatus}
                  removeHandler={taskRemove}
                  isDone={task.isDone}
                  text={task.title}
                  id={task.id}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
