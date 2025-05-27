import type {ButtonHTMLAttributes} from "react"

import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
    label: string
    onClick?: () => void
}

export const Button = ( props: ButtonProps ) => {
    const {
        label,
        onClick,
        ...rest
    } = props

    return (
      <button
        className={styles.button}
        onClick={onClick}
        {...rest}
        >
        {label}
      </button>
    )
}