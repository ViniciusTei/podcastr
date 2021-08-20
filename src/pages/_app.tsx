import React from 'react';
import PlayerProvider from '../contexts/PlayerContext';
import { Provider } from 'next-auth/client'
import LogRocket from 'logrocket';

//Styles
import '../styles/global.scss'
import styles from '../styles/app.module.scss';

//components
import { Header } from '../components/Header';
import { Player } from '../components/Player';

LogRocket.init('ygdgye/test');

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <PlayerProvider>
        <div className={styles.wrapper}>
          <main>
            <Header></Header>
            <Component {...pageProps} />
          </main>
          <Player />
        </div>
      </PlayerProvider>
    </Provider>
    
  )
}

export default MyApp
