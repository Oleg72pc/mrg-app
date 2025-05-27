import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {fetchDataThunk, uploadFileThunk} from "entities/mrg/model/thunks.ts"

import { type MrgData, type MrgState } from './types'

const initialState: MrgState = {
    data: [],
    loading: false,
    error: null,
    filters: {},
}

const mrgSlice = createSlice( {
    name: 'mrg',
    initialState,
    reducers: {
        setData: ( state, action: PayloadAction<Array<MrgData>> ) => {
            state.data = action.payload
        },
        setFilters: ( state, action: PayloadAction<MrgState['filters']> ) => {
            state.filters = action.payload
        },
        resetError: ( state ) => {
            state.error = null
        },
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
    },
} )

export const { setData, setFilters, resetError } = mrgSlice.actions
export default mrgSlice.reducer