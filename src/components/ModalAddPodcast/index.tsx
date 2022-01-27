import { useState } from "react"
import { useSession } from "../../contexts/SessionContext"
import PodcastService from "../../services/podcastsService"

import { Loading } from "../Loading"
import { Modal } from "../Modal"

import styles from './styles.module.scss'

export function ModalAddPodcast({isModalAddPodcastOpen, setIsModalAddPodcastOpen}) {
  const { session } = useSession()
  const [feedRssLink, setFeedRssLink] = useState('')
  const [loading, setLoading] = useState(false)
  const podcastsService = new PodcastService(session.token)
  
  const handleAddPodcast = async () => {
    if(feedRssLink) {
        setLoading(true)
        const response = await podcastsService.createPodcast(session.user.id, feedRssLink)
        console.log(response)
        setLoading(false)
        return
    }

    alert('Insira um link!')
  }

  return(
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
        
  )
}