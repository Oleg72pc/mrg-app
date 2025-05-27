import {createSelector} from "@reduxjs/toolkit"
import { type RootState } from "app/store/store.ts"

// import { type MrgData } from './types'


export const selectAllData = ( state: RootState ) => state.mrg.data

// export const selectFilteredData = ( state: RootState ) => {
//     const { data, filters } = state.mrg
//
//     return data.filter( ( item: MrgData ) =>
//         filters.loadLevel ? item.loadLevel >= filters.loadLevel : true
//     )
// }

export const selectPaginatedData = createSelector(
    [ selectAllData, ( state: RootState ) => state.mrg.pagination ],
    ( data, pagination ) => {
        const start = ( pagination.currentPage - 1 ) * pagination.pageSize
        const end = start + pagination.pageSize
        return {
            data: data.slice( start, end ),
            totalPages: Math.ceil( data.length / pagination.pageSize ),
            ...pagination
        }
    }
)

export const selectLoading = ( state: RootState ) => state.mrg.loading

export const selectError = ( state: RootState ) => state.mrg.error