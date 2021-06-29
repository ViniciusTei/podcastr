import { useState } from 'react';
import { useSession, signOut } from 'next-auth/client';

import Image from 'next/image';
import { Modal } from '../Modal';

import { MdClose, MdAdd } from 'react-icons/md';

import styles from './styles.module.scss';

export function Dropdown() {
    const [session] = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [isModalAddPodcastOpen, setIsModalAddPodcastOpen] = useState(false)
    const [feedRssLink, setFeedRssLink] = useState('')

    return (
        <>
        <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.wrapper} title="Clique para expandir">
                <span>{session.user.name}</span>
                <Image 
                    src={session.user.image} 
                    alt="User image" 
                    width={45} 
                    height={45} 
                    objectFit="cover" 
                />
            </div>
            {isOpen && 
            <div className={`${styles.content}`}>
                <div className={`${styles.wrapper}`} onClick={() => setIsModalAddPodcastOpen(true)}>
                    Adicionar podcast <MdAdd width={24} height={24}/>
                </div>
                <div className={`${styles.wrapper}`} onClick={() => signOut()}>
                    Sair <MdClose width={24} height={24}/>
                </div>
            </div>}
        </div>
        <Modal 
            title="Adicionar podcast" 
            isOpen={isModalAddPodcastOpen}
            handleClose={() => setIsModalAddPodcastOpen(false)}
            >
                <div className={styles.modalContent}>
                    <label htmlFor="rss_link">Insira abaixo um link rss</label>
                    <input 
                        type="text" 
                        name="rss_link"
                        placeholder="http://example.com/rss"
                        value={feedRssLink}
                        onChange={(ev) => {
                            setFeedRssLink(ev.target.value)
                        }}
                    />
                    <button type="button">Salvar</button>
                </div>
                
            </Modal>
        </>
    )
}