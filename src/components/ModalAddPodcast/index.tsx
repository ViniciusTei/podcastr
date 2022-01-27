import { useState } from "react"
import { useSession } from "../../contexts/SessionContext"
import { useToast } from "../../contexts/ToastContext"
import PodcastService from "../../services/podcastsService"
import ErrorHandler from "../../utils/errorHandler"

import { Loading } from "../Loading"
import { Modal } from "../Modal"

import styles from './styles.module.scss'

export function ModalAddPodcast({isModalAddPodcastOpen, setIsModalAddPodcastOpen}) {
  const { session } = useSession()
  const [feedRssLink, setFeedRssLink] = useState('')
  const [loading, setLoading] = useState(false)
  const podcastsService = new PodcastService(session.token)
  const { toggleToast } = useToast()
  
  const handleAddPodcast = async () => {
    try {
      if(feedRssLink) {
        setLoading(true)
        const response = await podcastsService.createPodcast(session.user.id, feedRssLink)
        toggleToast({
          message: 'Seu podcast foi adicionado!',
          type: 'success'
        })
        console.log(response)
        setLoading(false)
        return
      } else {
        toggleToast({
          message: 'Você precisa adicionar um feed rss!',
          type: 'error',
          timeMsToClose: 5000
        })
      }
    } catch (error) {
      setLoading(false)
      setFeedRssLink('')
      ErrorHandler(error, toggleToast)
    }
    
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