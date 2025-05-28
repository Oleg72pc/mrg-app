import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchDataThunk, uploadFileThunk } from "entities/mrg/model/thunks.ts"

import { type MrgState } from './types'

const initialState: MrgState = {
    data: [],
    loading: false,
    error: null,
    pagination: {
        currentPage: 1,
        pageSize: 10
    }
}

const mrgSlice = createSlice( {
    name: 'mrg',
    initialState,
    reducers: {
        setPage: ( state, action: PayloadAction<number> ) => {
            state.pagination.currentPage = action.payload
        },
        setPageSize: ( state, action: PayloadAction<number> ) => {
            state.pagination.pageSize = action.payload
            state.pagination.currentPage = 1
        },
        resetError: ( state ) => {
            state.error = null
        }
    },
    extraReducers: ( builder ) => {
        builder.addCase( fetchDataThunk.pending, ( state ) => {
            state.loading = true
            state.error = null
        } )
        builder.addCase( fetchDataThunk.fulfilled, ( state, action ) => {
            state.loading = false
            state.data = action.payload
        } )
        builder.addCase( fetchDataThunk.rejected, ( state, action ) => {
            state.loading = false
            state.error = action.payload as string
        } )

        builder.addCase( uploadFileThunk.pending, ( state ) => {
            state.loading = true
            state.error = null
        } )
        builder.addCase( uploadFileThunk.fulfilled, ( state, action ) => {
            state.loading = false
            state.data = action.payload
        } )
        builder.addCase( uploadFileThunk.rejected, ( state, action ) => {
            state.loading = false
            state.error = action.payload as string
        } )
    }
} )

export const {
    setPage,
    setPageSize,
    resetError
} = mrgSlice.actions
export default mrgSlice.reducer