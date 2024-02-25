import { FC, useState } from 'react'
import { Board } from '../models/Todo'
import { Color } from '../utils/Color'
import { Card } from './Card'
import { css } from '@emotion/css'
import { CheckBox } from './CheckBox'
import { TaskCard } from './TaskCard'
import axios from 'axios'
import { Button } from './Button'
import Modal from 'react-modal'

type Props = {
  taskBoard: Board
  update: () => void
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
  }),
  wrapper: css({
    display: 'flex',
    justifyContent: 'space-between'
  }),
  modal_root: css({
    display: 'flex',
    flexDirection: 'column'
  }),
  modal_title: css({
    fontSize: '24px',
    color: Color.black
  }),
  modal_input: css({
    marginTop: '16px',
    width: '584px',
    height: '48px',
    borderRadius: '8px',
    fontSize: '20px',
    paddingLeft: '8px'
  }),
  modal_right: css({
    display: 'flex',
    justifyContent: 'end'
  }),
  modal_button_wrapper: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: Color.white,
    marginTop: '16px',
    width: '80px'
  })
}

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px'
  }
}

export const TaskBoard: FC<Props> = ({ taskBoard, update }) => {
  const [checked, setChecked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')

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
    axios.post('http://localhost:3000/todos/delete', params).then(() => {
      update()
    })
  }

  const changeStatus = (id: number) => {
    const params = new URLSearchParams()
    params.append('id', `${id}`)
    axios.post('http://localhost:3000/todos/update', params).then(() => {
      update()
    })
  }

  const createTask = () => {
    const params = new URLSearchParams()
    params.append('title', title)
    axios
      .post('http://localhost:3000/todos/create', params)
      .then(() => {
        update()
      })
      .finally(() => {
        closeModal()
        setTitle('')
      })
  }

  const openModal = () => {
    console.log('open')
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const doneCount = taskBoard.tasks.filter((task) => !task.isDone).length
  const doingCount = taskBoard.tasks.filter((task) => task.isDone).length
  const taskCount = taskBoard.tasks.length

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
        <div className={styles.wrapper}>
          <CheckBox
            checked={checked}
            text="完了済みを表示"
            clickHandler={clickCheckBox}
          />
          <Button text="作成" clickHandler={openModal} />
        </div>
        <div className={styles.list}>
          {taskBoard.tasks
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
      <Modal isOpen={isOpen} style={modalStyles} onRequestClose={closeModal}>
        <div className={styles.modal_root}>
          <div className={styles.modal_title}>タスクを作成</div>
          <input
            className={styles.modal_input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles.modal_right}>
            <div className={styles.modal_button_wrapper}>
              <Button text="作成" clickHandler={createTask} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
