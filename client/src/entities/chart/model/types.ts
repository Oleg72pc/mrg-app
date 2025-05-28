export interface SelectedItem {
    mrg: string | null
    mg:  string | null
    km:  number | null
}

export interface ChartDataPoint {
    date: string
    fact: number
    tvps: number
}

export interface ChartState {
    isOpen: boolean
    selectedParams: SelectedItem
    chartData: Array<ChartDataPoint>
}

export interface OpenChartPayload  {
    selectedParams: SelectedItem
    data: ChartState['chartData']
}

export interface ChartProps {
    data: Array<ChartDataPoint>
    selectedMgr: SelectedItem
}

