import { FC } from 'react'
import { Color } from '../utils/Color'
import { css } from '@emotion/css'
import { RemoveIcon } from './RemoveIcon'

type Props = {
  clickHandler: (index: number) => void
  removeHandler: (index: number) => void
  isDone: boolean
  text: string
  id: number
}

const styles = {
  root: css({
    padding: '0px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    height: '80px',
    background: Color.white,
    borderRadius: '8px'
  }),
  done_root: css({
    padding: '0px 14px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    height: '80px',
    background: Color.gray_white,
    border: `2px solid ${Color.white}`,
    borderRadius: '8px'
  }),
  checked: css({
    background: Color.red,
    borderRadius: '4px',
    width: '8px',
    height: '8px'
  }),
  done_box: css({
    width: '20px',
    height: '20px',
    background: Color.white,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  }),
  box: css({
    width: '20px',
    height: '20px',
    background: Color.gray_white,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  }),
  title: css({
    fontSize: '24px'
  }),
  row: css({
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  })
}

export const TaskCard: FC<Props> = ({
  clickHandler,
  removeHandler,
  isDone,
  text,
  id
}) => {
  if (isDone) {
    return (
      <div className={styles.done_root}>
        <div className={styles.row}>
          <div className={styles.done_box} onClick={() => clickHandler(id)}>
            <div className={styles.checked} />
          </div>
          <div className={styles.title}>{text}</div>
        </div>
        <RemoveIcon removeHandler={() => removeHandler(id)} />
      </div>
    )
  }
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={styles.box} onClick={() => clickHandler(id)} />
        <div className={styles.title}>{text}</div>
      </div>
      <RemoveIcon removeHandler={() => removeHandler(id)} />
    </div>
  )
}
