import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsVolumeMuteFill } from 'react-icons/bs';
interface Volume {
  isDisabled: boolean;
  onVolumeChange: (amount: number) => void;
}

export default function Volume({ isDisabled, onVolumeChange }: Volume) {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [volume, setVolume] = useState(1)

  function handleVolumeChange(amount: number) {
    setVolume(amount)
    onVolumeChange(amount)
  }

  function handleOpenSlider() {
    setIsSliderOpen(!isSliderOpen)
  }
  return (
    <div className={styles.container}>
      {isSliderOpen && (
        <div className={styles.slider}>
          <Slider
            trackStyle={{backgroundColor: '#808080'}}
            railStyle={{backgroundColor: '#F7F8FA '}}
            handleStyle={{borderColor: '#808080', borderWidth: 4}}
            vertical={true}
            onChange={handleVolumeChange}
            max={1}
            step={0.1}
            value={volume}
          />
        </div>
        
      )}
      <button type="button" disabled={isDisabled} onClick={() => handleOpenSlider()}>
        {volume > 0.5 ? (
          <BsFillVolumeUpFill color="#fff" size="24px"/>
        ) : (
          volume > 0 ? (
            <BsVolumeDownFill color="#fff" size="24px"/>
          ) : (
            <BsVolumeMuteFill color="#fff" size="24px"/>
          )
        )}
      </button>
    </div>
  )
}