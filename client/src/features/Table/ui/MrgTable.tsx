import { flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table'
import {type MrgColumnDef, type MrgData} from 'entities/mrg/model/types'
import {transformDate} from "shared/helpers/transformDateISO.ts"
import {ChartButton} from "shared/ui/ChartButton/ChartButton.tsx"
import {ProgressBar} from "shared/ui/ProgressBar/ProgressBar.tsx"
import {Spinner} from "shared/ui/Spinner/Spinner.tsx"

import styles from './styles.module.scss'

interface MrgTableProps {
    data: Array<MrgData>;
    loading?: boolean;
}

const columns: Array<MrgColumnDef<MrgData>> = [
    {
        id: 'mrg',
        header: 'Магистральный распределительный газопровод',
        accessorKey: 'mrg',
        meta: {rowSpan: 2 }
    },
    {
        id: 'connection',
        header: 'Точка подключения',
        meta: {colSpan: 2 },
        columns: [
            {
                header: 'МГ (РГ, КС, УРГ)',
                accessorKey: 'mg',
                meta: {
                    isSubHeader: true,
                    rowSpan: 1
                }
            },
            {
                header: 'км',
                accessorKey: 'km',
                meta: {
                    isSubHeader: true,
                    rowSpan: 1
                },
                cell: ( { getValue } ) => getValue() || '-'
            }
        ]
    },
    {
        header: 'Период',
        accessorKey: 'date',
        meta: {rowSpan: 2 },
        cell: ( { getValue } ) => transformDate( getValue() )
    },
    {
        header: 'Уровень загрузки',
        accessorKey: 'loadLevel',
        meta: {rowSpan: 2 },
        cell: ( { getValue } ) => (
          <ProgressBar value={Number( getValue() )} />
        ),
    },
    {
        header: 'Факт. среднесут. расход (qср.ф) млн.м3/сут',
        accessorKey: 'fact',
        meta: {rowSpan: 2 },
        cell: ( { getValue } ) => Number( getValue() ).toFixed( 1 ),
    },
    {
        header: 'Технич. возм. проп. способн. (qср.р) млн. м3/сут',
        accessorKey: 'tvps',
        meta: {rowSpan: 2 },
        cell: ( { getValue } ) => Number( getValue() ).toFixed( 1 ),
    },
    {
        header: 'График',
        meta: {rowSpan: 2 },
        cell: () => <ChartButton />,
    },
]

export const MrgTable = ( { data, loading }: MrgTableProps ) => {

    const table = useReactTable( {
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    } )

    if ( loading ) {
        return (
          <div className={styles.loading}>
            <Spinner size={240} />
            <div>Загрузка данных...</div>
          </div>
        )
    }

    if ( !data.length ) {
        return <div className={styles.empty}>Нет данных для отображения</div>
    }

    return (
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map( ( headerGroup, groupIndex ) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map( header => {
                          const meta = ( header.column.columnDef as MrgColumnDef<MrgData> ).meta || {}
                          if ( meta.isSubHeader && groupIndex === 0 ) return null
                          if ( !meta.isSubHeader && groupIndex === 1 ) return null

                          return (
                            <th
                              key={header.id}
                              colSpan={header.colSpan}
                              rowSpan={meta.rowSpan}
                              className={styles.headerCell}
                              >
                              {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                  )}
                            </th>
                          )
                      } )}
              </tr>
              ) )}
          </thead>
          <tbody>
            {table.getRowModel().rows.map( row => (
              <tr key={row.id} className={styles.row}>
                {row.getVisibleCells().map( cell => (
                  <td key={cell.id} className={styles.cell}>
                    {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                              )}
                  </td>
                      ) )}
              </tr>
              ) )}
          </tbody>
        </table>
      </div>
    )
}