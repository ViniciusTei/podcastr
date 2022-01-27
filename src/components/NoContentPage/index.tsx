import Image from 'next/image';
import { useState } from 'react';
import { ModalAddPodcast } from '../ModalAddPodcast';

import styles from './styles.module.scss';

export function NoContent() {
  const [isModalAddPodcastOpen, setIsModalAddPodcastOpen] = useState(false)

  return(
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src="/undraw_dreamer_re_9tua.svg" alt="Dreamer Image" layout="fill"/>

      </div>
      <div className={styles.text}>
        <h1>Ops! Você ainda não tem nenhum podcast cadastrado!</h1>
        <p>
          Não se preocupe! Você pode começar a cadastrar seus podcasts 
          favoritos clicando no botão abaixo!
        </p>
        <button
          type="button"
          onClick={() => setIsModalAddPodcastOpen(true)}  
        >Clique para cadastrar</button>
        
      </div>
      <ModalAddPodcast
          isModalAddPodcastOpen={isModalAddPodcastOpen}
          setIsModalAddPodcastOpen={setIsModalAddPodcastOpen}
        />
    </div>
  )
}