import { useAppDispatch } from "app/store/store.ts"
import { fetchDataThunk, uploadFileThunk } from "entities/mrg/model/thunks.ts"
import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { Button } from "shared/ui/Button/Button.tsx"

import styles from './styles.module.scss'

export const FileInput = () => {
    const [ error, setError ] = useState<string>( '' )
    const [ isLoading, setIsLoading ] = useState( false )
    const fileInputRef = useRef<HTMLInputElement>( null )
    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch( fetchDataThunk( ) ).unwrap()
    }, [ dispatch ] )
    
    const handleFileSelect = async ( e: ChangeEvent<HTMLInputElement> ) => {
        setIsLoading( true )
        const file = e.target.files?.[0]
        if ( !file ) return

        if ( !file.name.endsWith( '.xlsx' ) ) {
            setError( 'Разрешены только файлы .xlsx' )
            return
        }

        try {
            await dispatch( uploadFileThunk( file ) ).unwrap()
            setError( '' )
        } catch ( err ) {
            setError( ( err as Error ).message )
        } finally {
            if ( fileInputRef.current ) {
                fileInputRef.current.value = ''
            }
            setIsLoading( false )
        }
    }

    return (
      <div className={styles.wrapper}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".xlsx"
          hidden
            />

        <Button
          label={isLoading ? 'ЗАГРУЗКА...' : 'ЗАГРУЗИТЬ ДАННЫЕ'}
          disabled={isLoading}
          onClick={() => fileInputRef.current?.click()}
            />

        {error && <div className={styles.error}>{error}</div >}
      </div>
    )
}