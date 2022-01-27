import { useState } from 'react';
import { useSession } from '../../contexts/SessionContext';

import { Modal } from '../Modal';
import { Loading } from '../Loading';

import { MdClose, MdAdd } from 'react-icons/md';

import styles from './styles.module.scss';
import PodcastService from '../../services/podcastsService';
import { ModalAddPodcast } from '../ModalAddPodcast';

export function Dropdown() {
    const {session, logout} = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [isModalAddPodcastOpen, setIsModalAddPodcastOpen] = useState(false)

    
    

    return (
        <>
        <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.wrapper} title="Clique para expandir">
                <span>{session.user?.name}</span>
            </div>
            {isOpen && 
            <div className={`${styles.content}`}>
                <div className={`${styles.wrapper} ${styles.space_between}`} onClick={() => setIsModalAddPodcastOpen(true)}>
                    Adicionar podcast <MdAdd width={24} height={24}/>
                </div>
                <div className={`${styles.wrapper} ${styles.space_between}`} onClick={() => logout()}>
                    Sair <MdClose width={24} height={24}/>
                </div>
            </div>}
        </div>
        <ModalAddPodcast
            isModalAddPodcastOpen={isModalAddPodcastOpen}
            setIsModalAddPodcastOpen={setIsModalAddPodcastOpen}
        />
        </>
    )
}