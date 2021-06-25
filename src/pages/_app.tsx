import React from 'react';
import PlayerProvider from '../contexts/PlayerContext';
import { Provider } from 'next-auth/client'
//Styles
import '../styles/global.scss'
import styles from '../styles/app.module.scss';

//components
import { Header } from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <PlayerProvider>
        <div className={styles.wrapper}>
          <main>
            <Header></Header>
            <Component {...pageProps} />
          </main>
        </div>
      </PlayerProvider>
    </Provider>
    
  )
}

export default MyApp
