import { selectError } from 'entities/mrg/model/selectors'
import { resetError } from 'entities/mrg/model/slice'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import styles from './styles.module.scss'

export const ErrorToast = () => {
    const error = useSelector( selectError )
    const dispatch = useDispatch()

    useEffect( () => {
        if ( error ) {
            const timer = setTimeout( () => {
                dispatch( resetError() )
            }, 5000 )
            return () => clearTimeout( timer )
        }
    }, [ error, dispatch ] )

    if ( !error ) return null

    return (
      <div className={styles.container}>
        <div className={styles.toast}>
          <div className={styles.icon}>❌</div>
          <div className={styles.message}>{error}</div>
        </div>
      </div>
    )
}