import { FC } from 'react'
import { Color } from '../utils/Color'
import { css } from '@emotion/css'

const styles = {
  root: css({
    width: 'calc(100% + 30px)',
    marginLeft: '-15px',
    height: '4px',
    background: Color.white
  })
}

export const Vr: FC = () => {
  return <div className={styles.root} />
}
