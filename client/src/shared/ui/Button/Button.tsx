import { type ButtonHTMLAttributes, type ReactNode } from "react"

import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
    label: string | ReactNode
}

export const Button = ( props: ButtonProps ) => {
    const {
        label,
        ...rest
    } = props

    return (
      <button
        className={styles.button}
        {...rest}
        >
        {label}
      </button>
    )
}