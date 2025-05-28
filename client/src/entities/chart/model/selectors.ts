import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from 'app/store/store.ts'

import { type ChartState } from './types.ts'


export const selectChartState = ( state: RootState ): ChartState => state.chart

export const selectIsOpen = createSelector(
    [ selectChartState ],
    ( chart ) => chart.isOpen
)

export const selectSelectedMrg = createSelector(
    [ selectChartState ],
    ( chart ) => chart.selectedParams
)

export const selectChartData = createSelector(
    [ selectChartState ],
    ( chart ) => chart.chartData
)