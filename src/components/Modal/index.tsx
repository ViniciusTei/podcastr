import { ReactNode, useRef } from 'react';
import styles from './styles.module.scss';
import { MdClose } from 'react-icons/md';
import useClickOutside from '../../hooks/useClickOutside';

interface Modal {
    isOpen: boolean
    handleClose: () => void
    children: ReactNode
    title?: string
}

export function Modal({title = '', isOpen, handleClose, children}: Modal) {
    const modalRef = useRef<HTMLDivElement>(null)

    useClickOutside(modalRef, handleClose)
    
    return (
        isOpen &&
        <div className={styles.container}>
            <div ref={modalRef} className={styles.modal}>
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