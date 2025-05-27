import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import styles from './styles.module.scss'

type IconButtonProps = ComponentPropsWithoutRef<'button'> & {
    iconSrc: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    tooltip?: string;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ( {
         iconSrc,
         size = 'md',
         disabled = false,
         className,
         tooltip,
         ...props
     }, ref ) => {
        return (
          <button
            ref={ref}
            className={`
          ${styles.button}
          ${styles[`size-${size}`]}
          ${disabled ? styles.disabled : ''}
          ${className || ''}
        `}
            disabled={disabled}
            title={tooltip}
            {...props}
            >
            <img
              src={iconSrc}
              alt="Button icon"
              className={styles.icon}
                />
          </button>
        )
    }
)

IconButton.displayName = 'IconButton'