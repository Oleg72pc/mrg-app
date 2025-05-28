import { formatDateISO } from "./formatDateISO.ts"

export const formatDate = ( dateString: string ) => {
    dateString = formatDateISO( dateString ) || ""
    const months: { [key: string]: string } = {
        январь: 'янв',
        февраль: 'фев',
        март: 'мар',
        апрель: 'апр',
        май: 'май',
        июнь: 'июн',
        июль: 'июл',
        август: 'авг',
        сентябрь: 'сен',
        октябрь: 'окт',
        ноябрь: 'ноя',
        декабрь: 'дек'
    }
    const [ month ] = dateString.split( ' ' )
    return `${months[month.toLowerCase()]}`
}