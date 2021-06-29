import { ReactNode } from 'react';
import styles from './styles.module.scss';
import { MdClose } from 'react-icons/md';

interface Modal {
    isOpen: boolean
    handleClose: () => void
    children: ReactNode
    title?: string
}

export function Modal({title = '', isOpen, handleClose, children}: Modal) {

    return (
        isOpen &&
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <strong>{title}</strong>
                    <MdClose onClick={handleClose}/>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}