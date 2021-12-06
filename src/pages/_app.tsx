import React from 'react';
import PlayerProvider from '../contexts/PlayerContext';
import SessionProvider from "../contexts/SessionContext";
import { CookiesProvider } from "react-cookie"

//Styles
import '../styles/global.scss'
import styles from '../styles/app.module.scss';

//components
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <SessionProvider>
        <PlayerProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <div className={styles.wrapper}>
            <main>
              <Header></Header>
              <Component {...pageProps} />
            </main>
            <Player />
          </div>
        </PlayerProvider>
      </SessionProvider>
    </CookiesProvider>
    
  )
}

export default MyApp
