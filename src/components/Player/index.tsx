import styles from './styles.module.scss'

import { usePlayer } from '../../contexts/PlayerContext';

export function Player() {
  const { episodeList, currentEpisodeIndex } = usePlayer()
  const episode = episodeList[currentEpisodeIndex]
  console.log(episode?.url)
  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora {episode?.title}</strong>
      </header>
      <div className={styles.empty}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>
      <footer className={styles.emptyFooter}>
        <div className={styles.progress}>
            <span>00:00</span>
            <div className={styles.slider}>

              <div className={styles.emptySlider}></div>
            </div>
            <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="shuffle"/>
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="previous"/>
          </button>
          <button type="button" className={styles.playBtn}>
            <img src="/play.svg" alt="play"/>
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="next"/>
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="repeat"/>
          </button>
        </div>
      </footer>
    </div>
  );
}