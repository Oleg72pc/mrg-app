import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData, uploadFile } from 'shared/api/dataApi'


export const fetchDataThunk = createAsyncThunk(
    'mrg/fetchData',
    async ( _, { rejectWithValue } ) => {
        try {
            return await fetchData()
        } catch ( error ) {
            return rejectWithValue( ( error as Error ).message )
        }
    }
)

export const uploadFileThunk = createAsyncThunk(
    'mrg/uploadFile',
    async ( file: File, { rejectWithValue } ) => {
        try {
            return await uploadFile( file )
        } catch ( error ) {
            return rejectWithValue( ( error as Error ).message )
        }
    }
)