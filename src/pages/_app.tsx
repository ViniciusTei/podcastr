import React, { useState, useEffect } from 'react';
import PlayerProvider from '../contexts/PlayerContext';
//Styles
import '../styles/global.scss'
import styles from '../styles/app.module.scss';

//components
import { Header } from '../components/Header';
import { Player } from '../components/Player';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header></Header>
          <Component {...pageProps} />
        </main>
        <Player></Player>
      </div>
    </PlayerProvider>
    
  )
}

export default MyApp
