import { useAppDispatch } from "app/store/store.ts"
import { selectChartData, selectIsOpen, selectSelectedMrg } from "entities/chart/model/selectors.ts"
import { closeChart } from "entities/chart/model/slice.ts"
import { selectLoading, selectPaginatedData } from "entities/mrg/model/selectors.ts"
import { setPage, setPageSize } from "entities/mrg/model/slice.ts"
import { Chart } from "features/Chart/ui/Chart.tsx"
import { FileInput } from "features/FileInput/ui/FileInput.tsx"
import { Pagination } from "features/Pagination.tsx/ui/Pagination.tsx"
import { Table } from "features/Table/ui/Table.tsx"
import { useSelector } from "react-redux"
import { PageLayout } from "shared/layouts/PageLayout/PageLayout.tsx"
import { Modal } from "widgets/Modal/ui/Modal.tsx"


export const MainPage = () => {
    const dispatch = useAppDispatch()

    const { data, ...pagination } = useSelector( selectPaginatedData )
    const loading = useSelector( selectLoading )

    const isOpen = useSelector( selectIsOpen )
    const selectedMgr = useSelector( selectSelectedMrg )
    const chartData = useSelector( selectChartData )

    const handlePageChange = ( page: number ) => {
        dispatch( setPage( page ) )
    }

    const handlePageSizeChange = ( size: number ) => {
        dispatch( setPageSize( size ) )
    }

    return (
      <PageLayout>
        <FileInput />
        <Table
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
        <Modal
          isOpen={isOpen}
          onClose={() => dispatch( closeChart() )}
          >
          <Chart
            data={chartData}
            selectedMgr={selectedMgr}
              />
        </Modal>
      </PageLayout>
    )
}