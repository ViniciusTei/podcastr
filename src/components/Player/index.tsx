import { useRef, useEffect } from 'react';
import Slider from 'rc-slider';
import Image from 'next/image';

import { usePlayer } from '../../contexts/PlayerContext';

import styles from './styles.module.scss'
//slider style
import 'rc-slider/assets/index.css';

export function Player() {
  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay, 
    setIsPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious
  } = usePlayer()

  const episode = episodeList[currentEpisodeIndex]
  const audioRef = useRef<HTMLAudioElement>(null)

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
      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image width={592} height={592} src={episode.thumbnail} objectFit="cover"/>
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.empty}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.emptyFooter : ''}>
        <div className={styles.progress}>
            <span>00:00</span>
            <div className={styles.slider}>

              {episode ? (
                <Slider
                  trackStyle={{backgroundColor: '#04D361'}}
                  railStyle={{backgroundColor: '#9f75ff '}}
                  handleStyle={{borderColor: '#04D361', borderWidth: 4}}
                />
              ) : (
                <div className={styles.emptySlider}></div>
              )}
            </div>
            <span>00:00</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            autoPlay
            ref={audioRef}
            onPlay={() => {
              setIsPlayingState(true)
            }}
            onPause={() => {
              setIsPlayingState(false)
            }}
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="shuffle"/>
          </button>
          <button onClick={playPrevious} type="button" disabled={!episode || !hasPrevious} >
            <img src="/play-previous.svg" alt="previous"/>
          </button>
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
          <button type="button" disabled={!episode}  >
            <img src="/repeat.svg" alt="repeat"/>
          </button>
        </div>
      </footer>
    </div>
  );
}