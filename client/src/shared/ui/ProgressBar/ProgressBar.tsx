import { clsx } from 'clsx'

import styles from './styles.module.scss'

export const ProgressBar = ( { value }: { value: number } ) => {
    const getLevelClass = () => {
        if ( value <= 33 ) return styles.levelLow
        if ( value <= 66 ) return styles.levelMedium
        return styles.levelHigh
    }

    return (
      <div className={styles.progressContainer}>
        <div
          className={clsx( styles.progressBar, getLevelClass() )}
          style={{ width: `${value}%` }}
            />
        <span className={styles.progressText}>{value}%</span>
      </div>
    )
}