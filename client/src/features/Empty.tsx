import { FC } from 'react'
// import { Color } from '../utils/Color'
import { css } from '@emotion/css'

const styles = {
  root: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
}

export const Empty: FC = () => {
  return <div className={styles.root}>タスクはありません</div>
}
