import {useAppDispatch} from "app/store/store.ts"
import {selectAllData} from 'entities/mrg/model/selectors'
import {fetchDataThunk, uploadFileThunk} from "entities/mrg/model/thunks.ts"
import {type ChangeEvent, useEffect, useRef, useState} from 'react'
import {useSelector} from "react-redux"
import {Button} from "shared/ui/Button/Button.tsx"

import styles from './styles.module.scss'

export const FileInput = () => {
    const [ error, setError ] = useState<string>( '' )
    const [ isLoading, setIsLoading ] = useState( false )
    const fileInputRef = useRef<HTMLInputElement>( null )
    const dispatch = useAppDispatch()
    const data = useSelector( selectAllData )

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

        {data.length > 0 &&
            (
            <div className={styles.response}>
              {data.map( el => (
                <div className={styles.row} key={el.tvps + el.fact}>
                  <p className={styles.cell}>{el.mrg}</p>
                  <p className={styles.cell}>{el.mg}</p>
                  <p className={styles.cell}>{el.km}</p>
                  <p className={styles.cell}>{el.date}</p>
                  <p className={styles.cell}>{el.loadLevel}</p>
                  <p className={styles.cell}>{el.fact}</p>
                  <p className={styles.cell}>{el.tvps}</p>
                </div>
              ) )}
            </div>
            )
        }

      </div>
    )
}