import { FC } from 'react'
import { css } from '@emotion/css'
import { Color } from '../utils/Color'

const styles = {
  root: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: Color.white,
    padding: '4px 16px',
    color: Color.black,
    borderRadius: '4px',
    cursor: 'pointer'
  })
}

type Props = {
  text: string
  clickHandler: () => void
}

export const Button: FC<Props> = ({ text, clickHandler }) => {
  return (
    <div className={styles.root} onClick={clickHandler}>
      {text}
    </div>
  )
}
