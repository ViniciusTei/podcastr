import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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
  const audioRef = useRef<HTMLAudioElement>(null)

  function handleEpisodeEnded() {
    if(hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  useEffect(() => {
    if(!audioRef.current) {
      return 
    }
    if(isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <div className={styles.container}>
      {episode ? (
        <div className={styles.player_container}>
          <div className={styles.player_container_image}>
            <Image src={episode.thumbnail} alt="Episode thumbnail" layout="fill"/>

          </div>
          <div className={styles.player_container_title}>
            <p>{episode.title}</p>
            <span>{episode.members}</span>
          </div>

          
          {episode && (
            <audio
              autoPlay
              src={episode.url}
              ref={audioRef}
              loop={isLooping}
              onEnded={handleEpisodeEnded}
              onPlay={() => {
                setIsPlayingState(true)
              }}
              onPause={() => {
                setIsPlayingState(false)
              }}
            />
          )}

          <div className={styles.player_container_buttons}>
            <button 
              type="button" 
              onClick={togglePlay} 
              className={styles.playButton} 
              disabled={!episode}
              >
              {isPlaying ? <img src="/pause.svg" alt="play"/> : <img src="/play.svg" alt="play"/>}
            </button>
            <button onClick={playNext} type="button" disabled={!episode || !hasNext}>
              <img src="/play-next.svg" alt="next"/>
            </button>
          </div>

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