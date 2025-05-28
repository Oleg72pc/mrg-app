import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { ChartState, OpenChartPayload } from "./types.ts"

const initialState: ChartState = {
    isOpen: false,
    selectedParams: {
        mrg: null,
        mg: null,
        km: null,
    },
    chartData: [],
}

const chartSlice = createSlice( {
    name: 'chart',
    initialState,
    reducers: {
        openChart: ( state, action: PayloadAction<OpenChartPayload> ) => {
            state.isOpen = true
            state.selectedParams = action.payload.selectedParams
            state.chartData = action.payload.data
        },
        closeChart: () => {
            return initialState
        },
    },
} )

export const { openChart, closeChart } = chartSlice.actions
export default chartSlice.reducer