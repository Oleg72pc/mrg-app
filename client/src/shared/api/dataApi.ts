import axios from 'axios'

const api = axios.create( {baseURL: 'http://localhost:3000/',} )

export const uploadFile = async ( file: File ) => {
    try {
        const formData = new FormData()
        formData.append( 'file', file )
        const response = await api.post( '/data/upload', formData, {headers: {'Content-Type': 'multipart/form-data',},} )
        return response.data
    } catch ( error ) {
        console.warn( error )
        throw new Error( 'Ошибка при отправке файла на сервер' )
    }
}

export const fetchData = async () => {
    try {
        const response = await api.get( '/data' )
        return response.data
    } catch ( error ) {
        console.warn( error )
        throw new Error( 'Ошибка при загрузке данных с сервера' )
    }
}