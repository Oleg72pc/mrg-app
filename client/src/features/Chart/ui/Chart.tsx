import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import type {ChartProps} from "entities/chart/model/types.ts"
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


export const Chart = ( props: ChartProps ) => {
    const { data, selectedMgr } = props

    const chartData = {
        labels: data.map( d => formatDate( d.date ) ),
        datasets: [
            {
                label: 'Факт. среднесут. расход (qср,θ)',
                data: data.map( d => d.fact ),
                borderColor: '#007DF0',
                backgroundColor: 'rgba(0, 125, 250, 0.2)',
                borderWidth: 3,
                pointRadius: 4,

            },
            {
                label: 'Технич. возможно. проп. способн. (qср,p)',
                data: data.map( d => d.tvps ),
                borderColor: '#F04F47',
                backgroundColor: 'rgba(240, 79, 71, 0.2)',
                borderWidth: 3,
                pointRadius: 4,

            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    font: {
                        family: 'Roboto',
                        size: 12
                    },
                    // padding: 20
                }
            },
            title: {
                display: true,
                text: `${selectedMgr.mrg || '(н/д)'}. Подача газа от ${selectedMgr.km || '(н/д)'} км ${selectedMgr.mg || '(н/д)'}`,
                font: {
                    family: 'Roboto',
                    size: 16,
                    weight: 'bold'
                },
                // padding: 20
            },
            tooltip: {
                bodyFont: {
                    family: 'Roboto',
                    size: 12
                },
                titleFont: {
                    family: 'Roboto',
                    size: 12
                }
            }
        },
        scales: {
            x: {grid: {display: false},},
            y: {grid: {display: false},}
        }
    }
    
    return (
      <div className={styles.chartContainer}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-expect-error*/}
        <Line data={chartData} options={options} />
      </div>
    )
}