import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useAppDispatch } from "app/store/store.ts"
import { openChart } from "entities/chart/model/slice.ts"
import { selectAllData } from "entities/mrg/model/selectors.ts"
import { type MrgData } from 'entities/mrg/model/types'
import { useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import chartIcon from 'shared/assets/icons/chart.png'
import { formatDateISO } from "shared/helpers/formatDateISO.ts"
import { IconButton } from "shared/ui/IconButton/IconButton.tsx"
import { ProgressBar } from "shared/ui/ProgressBar/ProgressBar.tsx"
import { Spinner } from "shared/ui/Spinner/Spinner.tsx"

import { type MrgColumnDef, type MrgTableProps } from "../model/types.ts"
import styles from './styles.module.scss'


export const Table = ( { data, loading }: MrgTableProps ) => {
    const dispatch = useAppDispatch()
    const mgrData = useSelector( selectAllData )

    const handleOpenChart = useCallback( ( rowData: MrgData ) => {
        const filteredData = mgrData.filter( item =>
            item.mrg === rowData.mrg &&
            item.mg === rowData.mg &&
            item.km === rowData.km
        )

        dispatch( openChart( {
            selectedParams: {
                mrg: rowData.mrg,
                mg: rowData.mg,
                km: rowData.km
            },
            data: filteredData.map( item => ( {
                date: item.date,
                fact: item.fact,
                tvps: item.tvps
            } ) )
        } ) )
    }, [ dispatch, mgrData ] )

    const columns = useMemo<Array<MrgColumnDef<MrgData>>>( () => [
        {
            id: 'mrg',
            header: 'Магистральный распределительный газопровод',
            accessorKey: 'mrg',
            meta: { rowSpan: 2 }
        },
        {
            id: 'connection',
            header: 'Точка подключения',
            meta: { colSpan: 2 },
            columns: [
                {
                    header: 'МГ (РГ, КС, УРГ)',
                    accessorKey: 'mg',
                    meta: { isSubHeader: true }
                },
                {
                    header: 'км',
                    accessorKey: 'km',
                    meta: { isSubHeader: true },
                    cell: ( { getValue } ) => getValue() || '-'
                }
            ]
        },
        {
            header: 'Период',
            accessorKey: 'date',
            meta: { rowSpan: 2 },
            cell: ( { getValue } ) => formatDateISO( String( getValue() ) )
        },
        {
            header: 'Уровень загрузки',
            accessorKey: 'loadLevel',
            meta: { rowSpan: 2 },
            cell: ( { getValue } ) => ( <ProgressBar value={Number( getValue() )} /> )
        },
        {
            header: 'Факт. среднесут. расход (qср.ф) млн.м3/сут',
            accessorKey: 'fact',
            meta: { rowSpan: 2 },
            cell: ( { getValue } ) => ( Number( getValue() )?.toFixed( 1 ) || '0.0' )
        },
        {
            header: 'Технич. возм. проп. способн. (qср.р) млн. м3/сут',
            accessorKey: 'tvps',
            meta: { rowSpan: 2 },
            cell: ( { getValue } ) => ( Number( getValue() )?.toFixed( 1 ) || '0.0' )
        },
        {
            header: 'График',
            meta: { rowSpan: 2 },
            cell: ( { row } ) => (
              <IconButton
                iconSrc={chartIcon}
                onClick={() => handleOpenChart( row.original )}
                size="md"
                aria-label="Показать график"
                tooltip="Показать график"
                />
            )
        }
    ], [ handleOpenChart ] )

    const table = useReactTable( { data, columns, getCoreRowModel: getCoreRowModel() } )

    const headerGroups = table.getHeaderGroups()

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
            {headerGroups.map( ( headerGroup, groupIndex ) => (
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
                        className={meta.fixSize ? styles.headerCellFix :  styles.headerCell}
                        >
                        {flexRender( header.column.columnDef.header, header.getContext() )}
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
                  <td key={cell.id}  className={styles.cell}>
                    {flexRender( cell.column.columnDef.cell, cell.getContext() )}
                  </td>
                ) )}
              </tr>
            ) )}
          </tbody>
        </table>
      </div>
    )
}