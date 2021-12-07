import styles from './styles.module.scss'

interface Loading {
    size?: 'small' | 'large'
}

export function Loading({ size = 'large' }: Loading) {
    
    return (
        <div className={`${styles.ldsring} ${size === 'large' ? styles.large : styles.small}`}><div></div><div></div><div ></div><div></div></div>
    )
}