import styles from './styles.module.scss'

export const ProgressBar = ( { value }: { value: number } ) => {
    return (
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${value}%` }}
            />
        <span className={styles.progressText}>{value}%</span>
      </div>
    )
}