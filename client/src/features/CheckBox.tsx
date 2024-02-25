import { FC } from 'react'
import { Color } from '../utils/Color'
import { css } from '@emotion/css'

type Props = {
  clickHandler: () => void
  checked: boolean
  text: string
}

const styles = {
  root: css({
    padding: '0px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }),
  checked: css({
    background: Color.red,
    borderRadius: '4px',
    width: '8px',
    height: '8px'
  }),
  box: css({
    width: '16px',
    height: '16px',
    background: Color.white,
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  })
}

export const CheckBox: FC<Props> = ({ clickHandler, checked, text }) => {
  if (checked) {
    return (
      <div className={styles.root}>
        <div className={styles.box} onClick={clickHandler}>
          <div className={styles.checked} />
        </div>
        <div>{text}</div>
      </div>
    )
  }
  return (
    <div className={styles.root}>
      <div className={styles.box} onClick={clickHandler} />
      <div>{text}</div>
    </div>
  )
}
