import { useRef, useEffect, useState } from 'react';
import Slider from 'rc-slider';
import Image from 'next/image';

import { usePlayer } from '../../contexts/PlayerContext';

import styles from './styles.module.scss'
//slider style
import 'rc-slider/assets/index.css';
import { secToTimeString } from '../../utils/timeMsToDateString';
import { Avaliation } from '../Avaliation';
import { useSession } from 'next-auth/client';
// import { HttpService } from '../../services/api';

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
    hasPrevious,
    isLooping,
    toggleLooping,
    clearPlayerState,
    setEpisodeAvaliation
  } = usePlayer()
  const [progress, setProgress] = useState(0)
  const [currentAudioMaxDuration, setCurrentAudioMaxDuration] = useState(0)
  const episode = episodeList[currentEpisodeIndex]
  const audioRef = useRef<HTMLAudioElement>(null)
  const [session] = useSession();
  // const api = new HttpService()
  const [currentWindowSize, setCurrentWindowSize] = useState(0)

  

  function setupProgressListener() {
    setCurrentAudioMaxDuration(audioRef.current.duration)
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if(hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  async function handleAvaliationClick(value: number) {
    const nota = value + 1
    // await api.postAvaliation(nota, episode.id)
    // .then(() => setEpisodeAvaliation(nota, currentEpisodeIndex))
    // .catch(() => console.log('Erro na avaliacao'))
  }

  useEffect(() => {
    setCurrentWindowSize(window.screen.width)

  }, [])

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

  if(!session) {
    return null
  }
 
  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image 
            width={592} 
            height={592} 
            src={episode.thumbnail} 
            objectFit="cover"/>
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
          {currentWindowSize > 1080 ? <Avaliation rate={episode.avaliation} onClickAvaliation={handleAvaliationClick}/> : null}
        </div>
      ) : (
        <div className={styles.empty}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.emptyFooter : ''}>
        <div className={styles.progress}>
            <span>{secToTimeString(progress)}</span>
            <div className={styles.slider}>

              {episode ? (
                <Slider
                  trackStyle={{backgroundColor: '#04D361'}}
                  railStyle={{backgroundColor: '#9f75ff '}}
                  handleStyle={{borderColor: '#04D361', borderWidth: 4}}
                  onChange={handleSeek}
                  max={currentAudioMaxDuration}
                  value={progress}
                />
              ) : (
                <div className={styles.emptySlider}></div>
              )}
            </div>
            <span>{secToTimeString(currentAudioMaxDuration)}</span>
        </div>

        {episode && (
          <audio
            autoPlay
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            onLoadedMetadata={setupProgressListener}
            onEnded={handleEpisodeEnded}
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
          <button 
            type="button" 
            disabled={!episode} 
            onClick={toggleLooping}
            className={isLooping ? styles.isActive : ''}
            >
            <img src="/repeat.svg" alt="repeat"/>
          </button>
        </div>
      </footer>
    </div>
  );
}