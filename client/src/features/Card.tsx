import { FC } from 'react'
import { Color } from '../utils/Color'
import { css } from '@emotion/css'

type Props = {
  title: string
  text: string
}

const styles = {
  root: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column',
    width: '250px',
    height: '150px',
    background: Color.white,
    borderRadius: '8px'
  }),
  title: css({
    position: 'absolute',
    top: '8px',
    left: '8px'
  }),
  text: css({
    fontSize: '48px',
    color: Color.gray
  })
}

export const Card: FC<Props> = ({ title, text }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>{text}</div>
    </div>
  )
}
