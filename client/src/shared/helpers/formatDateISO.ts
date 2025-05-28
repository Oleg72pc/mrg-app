export const formatDateISO = ( dateIso: unknown ) => {
    if ( typeof dateIso !== 'string' ) return

    const date = new Date( dateIso )
    const monthName = date.toLocaleString( 'default', { month: 'long' } )
    const year = date.getFullYear()

    return `${monthName} ${year}`
}