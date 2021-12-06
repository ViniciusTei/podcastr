import { useState } from 'react';
import { useSession } from '../../contexts/SessionContext';

import { api } from '../../services/api';

import { Modal } from '../Modal';
import { Loading } from '../Loading';

import { MdClose, MdAdd } from 'react-icons/md';

import styles from './styles.module.scss';

export function Dropdown() {
    const {session, logout} = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [isModalAddPodcastOpen, setIsModalAddPodcastOpen] = useState(false)
    const [feedRssLink, setFeedRssLink] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAddPodcast = async () => {
        if(feedRssLink) {
            setLoading(true)
            const response = await api.post('/podcasts', {feed_url: feedRssLink})
            console.log(response.data)
            setLoading(false)
            return
        }

        alert('Insira um link!')
    }

    return (
        <>
        <div className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.wrapper} title="Clique para expandir">
                <span>{session.user?.name}</span>
            </div>
            {isOpen && 
            <div className={`${styles.content}`}>
                <div className={`${styles.wrapper}`} onClick={() => setIsModalAddPodcastOpen(true)}>
                    Adicionar podcast <MdAdd width={24} height={24}/>
                </div>
                <div className={`${styles.wrapper}`} onClick={() => logout()}>
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
                    <button type="button" onClick={handleAddPodcast}>
                        {loading ? <Loading /> : 'Salvar'}
                    </button>
                </div>
                
            </Modal>
        </>
    )
}