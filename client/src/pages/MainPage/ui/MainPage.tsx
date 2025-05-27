import {useAppDispatch} from "app/store/store.ts"
import { selectLoading, selectPaginatedData} from "entities/mrg/model/selectors.ts"
import {setPage, setPageSize} from "entities/mrg/model/slice.ts"
import { FileInput } from "features/FileInput/ui/FileInput.tsx"
import {Pagination} from "features/Pagination.tsx/ui/Pagination.tsx"
import {MrgTable} from "features/Table/ui/MrgTable.tsx"
import {useSelector} from "react-redux"

import styles from './styles.module.scss'

export const MainPage = () => {
    const dispatch = useAppDispatch()
    const { data, ...pagination } = useSelector( selectPaginatedData )
    const loading = useSelector( selectLoading )

    const handlePageChange = ( page: number ) => {
        dispatch( setPage( page ) )
    }

    const handlePageSizeChange = ( size: number ) => {
        dispatch( setPageSize( size ) )
    }
    
    return (
      <div className={styles.container}>
        <FileInput />
        <MrgTable
          data={data}
          loading={loading}
          />
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageSize={pagination.pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          loading={loading}
          />
      </div>
    )
}