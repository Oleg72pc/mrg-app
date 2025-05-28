import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import type { ChartProps } from "entities/chart/model/types.ts"
import { Line } from 'react-chartjs-2'
import { formatDate } from "shared/helpers/formatDate.ts"

import styles from './styles.module.scss'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const unitLabelPlugin = {
    id: 'unitLabel',
    afterDraw( chart: ChartJS ) {
        const ctx = chart.ctx
        ctx.save()
        ctx.font = '19px Roboto'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.fillStyle = '#6B7280'
        const x = chart.chartArea.left - 10
        const y = chart.chartArea.top
        ctx.fillText( 'млн м³/сут.', x, y )
        ctx.restore()
    }
}

const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw( chart: ChartJS ) {
        const ctx = chart.ctx
        const tooltip = chart.tooltip

        if ( tooltip?.getActiveElements().length ) {
            const activePoint = tooltip.getActiveElements()[0]
            const x = activePoint.element.x
            const topY = chart.scales.y.top
            const bottomY = chart.scales.y.bottom

            ctx.save()
            ctx.beginPath()
            ctx.moveTo( x, topY )
            ctx.lineTo( x, bottomY )
            ctx.setLineDash( [ 5, 3 ] )
            ctx.lineWidth = 1
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
            ctx.stroke()
            ctx.restore()
        }
    }
}


export const Chart = ( props: ChartProps ) => {
    const { data, selectedMgr } = props

    const chartData = {
        labels: data.map( d => formatDate( d.date ) ),
        datasets: [
            {
                label: 'Факт. среднесут. расход (qср.ф) млн.м3/сут',
                data: data.map( d => d.fact ),
                borderColor: '#007DF0',
                backgroundColor: 'rgba(0, 125, 250, 0.2)',
                borderWidth: 3,
                pointRadius: 3,
                tension: 0
            },
            {
                label: 'Технич. возм. проп. способн. (qср.р) млн. м3/сут',
                data: data.map( d => d.tvps ),
                borderColor: '#F04F47',
                backgroundColor: 'rgba(240, 79, 71, 0.2)',
                borderWidth: 3,
                pointRadius: 3,
                tension: 0
            }
        ]
    }

    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false
        },
        stacked: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    font: {
                        family: 'Roboto',
                        size: 14
                    },
                    usePointStyle: true,
                    pointStyleWidth: 80,
                    padding: 16,
                    pointStyle: 'line'
                }
            },
            title: {
                display: true,
                align: 'start' as const,
                text: ` ${selectedMgr.mrg || '(н/д)'}. Подача газа от ${selectedMgr.km || '(н/д)'} км ${selectedMgr.mg || '(н/д)'}`,
                font: {
                    family: 'Roboto',
                    size: 19,
                    weight: 'normal' as const
                }
           },
            tooltip: {
                bodyFont: {
                    family: 'Roboto',
                    size: 14,
                    weight: 'bold' as const
                },
                titleFont: {
                    family: 'Roboto',
                    size: 14,
                    weight: 'bold' as const
                },
                displayColors: true,
                usePointStyle: true,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 3,
                bodyColor: '#6B7280',
                boxPadding: 6,
                callbacks: {
                    title: () => '',
                    label: ( context: never ) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        const value = context.parsed.y
                        return `${value.toFixed( 1 )}`
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: {
                        family: 'Roboto',
                        size: 14,
                        weight: 'bold' as const
                    }
                }
            },
            y: {
                grid: { display: false },
                border: { display: false },
                ticks: { display: false }
            }
        }
    }
    
    return (
      <div className={styles.chartContainer}>
        <Line
          data={chartData}
          options={options}
          plugins={[ unitLabelPlugin, verticalLinePlugin ]}
        />
      </div>
    )
}