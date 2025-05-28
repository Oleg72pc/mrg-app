import { type ReactNode, useEffect } from 'react'

import styles from './styles.module.scss'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ( { isOpen, onClose, children }: ModalProps ) => {
    useEffect( () => {
        const handleEscape = ( e: KeyboardEvent ) => {
            if ( e.key === 'Escape' ) onClose()
        }

        document.addEventListener( 'keydown', handleEscape )
        return () => document.removeEventListener( 'keydown', handleEscape )
    }, [ onClose ] )

    if ( !isOpen ) return null

    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.content} onClick={( e ) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
}