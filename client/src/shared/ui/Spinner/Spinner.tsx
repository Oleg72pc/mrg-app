import styles from './styles.module.scss'

interface SpinnerProps {
    size?: number;
    color?: string;
    className?: string;
}

export const Spinner = ( props: SpinnerProps ) => {
    const {
        size = 24,
        color = "#007DF0",
        className = ""
    } = props

    return (
      <svg
        className={`${styles.spinner} ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ color }}
        >
        <circle
          className={styles.path}
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
            />
      </svg>
    )
}