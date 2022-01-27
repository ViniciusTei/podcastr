import Image from 'next/image';

import styles from './styles.module.scss';

export function NoContent() {
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
        <button type="button">Clique para cadastrar</button>

      </div>
      
    </div>
  )
}