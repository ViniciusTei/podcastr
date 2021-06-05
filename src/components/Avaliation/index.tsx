import React from 'react';

import styles from './styles.module.scss'

import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

interface AvaliationProps {
    rate: number;
    onClickAvaliation: (number: number) => void;
}

export function Avaliation({ rate, onClickAvaliation }: AvaliationProps) {
    let starList = []
    for (let i = 0; i < 5; i++) {
        if(i < rate) {
            starList.push(<AiFillStar />)
        } else {
            starList.push(<AiOutlineStar />)
        }
    }
    
    return (
      <div className={styles.starsContainer}>
        {starList.map((star, index) => {
            return (
                <div key={index} onClick={() => onClickAvaliation(index)}>
                    {star}
                </div>
            )
        })}
      </div>
  );
}
