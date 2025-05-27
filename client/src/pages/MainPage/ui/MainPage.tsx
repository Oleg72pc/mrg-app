import {FileInput} from "features/upload-file/ui/FileInput.tsx"

import styles from './styles.module.scss'

export const MainPage = () => {

    return (
      <div className={styles.container}>
        <FileInput />
      </div>
    )
}