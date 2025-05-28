import type { ReactNode } from "react"

import styles from "./styles.module.scss"

export const PageLayout = ( { children }: { children: ReactNode } ) => {
    return (
      <div className={styles.container}>
        {children}
      </div>
    )
}