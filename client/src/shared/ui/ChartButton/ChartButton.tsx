
// import styles from './styles.module.scss'

export const ChartButton = () => {
    const handleClick = () => {
        // TODO: Реализовать открытие модалки
        console.log( 'Open chart modal' )
    }

    return (
      <button
        // className={styles.chartButton}
        onClick={handleClick}
        aria-label="Показать график"
        >
        ICON
      </button>
    )
}