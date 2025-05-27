import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

export const NotFound = () => {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Страница не найдена</h2>
          <Link to="/" className={styles.button}>
            На главную
          </Link>
        </div>
      </div>
    )
}