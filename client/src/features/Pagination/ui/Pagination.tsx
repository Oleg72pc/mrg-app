import backIcon from 'shared/assets/icons/back.png'
import forwardIcon from 'shared/assets/icons/forward.png'
import { IconButton } from "shared/ui/IconButton/IconButton.tsx"
import { Spinner } from "shared/ui/Spinner/Spinner.tsx"

import styles from './styles.module.scss'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: ( page: number ) => void;
    pageSize: number;
    onPageSizeChange: ( size: number ) => void;
    loading?: boolean;
}

export const Pagination = ( props: PaginationProps ) => {
    const {
        currentPage,
        totalPages,
        onPageChange,
        pageSize,
        onPageSizeChange,
        loading
    } = props
    const pageSizes = [ 10, 20, 50, 100 ]

    return (
      <div className={styles.container}>
        <div className={styles.title}>Записей на странице:</div>

        <select
          value={pageSize}
          onChange={( e ) => onPageSizeChange( Number( e.target.value ) )}
          disabled={loading}
          className={styles.pageSize}
            >
          {pageSizes.map( size => (
            <option key={size} value={size}>
              {size}
            </option>
                ) )}
        </select>

        <div className={styles.pageInfo}>
          {loading ? ( <Spinner size={20}/> ) : ( `${currentPage} из ${totalPages}` )}
        </div>
            
        <div className={styles.controls}>
          <IconButton
            iconSrc={backIcon}
            size="md"
            onClick={() => onPageChange( currentPage - 1 )}
            disabled={currentPage === 1 || loading}
            aria-label="Назад"
            tooltip={"Назад"}
                />
          <IconButton
            iconSrc={forwardIcon}
            size="md"
            onClick={() => onPageChange( currentPage + 1 )}
            disabled={currentPage === totalPages || loading}
            aria-label="Вперед"
            tooltip={"Вперед"}
                />
        </div>
      </div>
    )
}