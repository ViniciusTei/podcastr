import Image from 'next/image';
import { usePlayer } from "../../contexts/PlayerContext"
import styles from './styles.module.scss';

export function PlayerMobile() {
  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay, 
    setIsPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    isLooping,
    toggleLooping,
    clearPlayerState,
    setEpisodeAvaliation
  } = usePlayer()
  const episode = episodeList[currentEpisodeIndex]
  return (
    <div className={styles.container}>
      {episode ? (
        <div>
          <Image src={episode.thumbnail} alt="Episode thumbnail" layout="fill"/>

        </div>
      ) : (
        <div className={styles.empty}>
          <img src="/playing.svg" alt="Tocando agora"/>
          <p>Selecione um podcast para você ouvir</p>
        </div>
      )}
    </div>
  )
}