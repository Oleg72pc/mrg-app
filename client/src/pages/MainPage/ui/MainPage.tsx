import {selectAllData, selectLoading} from "entities/mrg/model/selectors.ts"
import { FileInput } from "features/FileInput/ui/FileInput.tsx"
import {MrgTable} from "features/Table/ui/MrgTable.tsx"
import {useSelector} from "react-redux"

import styles from './styles.module.scss'

export const MainPage = () => {
    const data = useSelector( selectAllData )
    const loading = useSelector( selectLoading )

    return (
      <div className={styles.container}>
        <FileInput />
        <MrgTable
          data={data}
          loading={loading}
          />
      </div>
    )
}