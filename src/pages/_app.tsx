import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PlayerProvider from '../contexts/PlayerContext';
import SessionProvider from "../contexts/SessionContext";
import ToastProvider from "../contexts/ToastContext";
import { CookiesProvider } from "react-cookie"
import { useRouter } from 'next/router'
//Styles
import '../styles/global.scss'
import styles from '../styles/app.module.scss';

//components
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { Loading } from '../components/Loading';
import useWindow from '../hooks/useWindowSize';
import { PlayerMobile } from '../components/PlayerMobile';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const window = useWindow();
  const [isMobilePlayerOn, setIsMobilePlayerOn] = useState(false)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(window.width < 720) {
      setIsMobilePlayerOn(true)
    }
  }, [window])

  useEffect(() => {
      const handleStart = (url) => (url !== router.asPath) && setLoading(true);
      const handleComplete = () => setLoading(false);

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
      }
  })

  return (
    <CookiesProvider>
      <SessionProvider>
        <PlayerProvider>
          <ToastProvider>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className={styles.wrapper}>
              <main>
                <Header></Header>
                <Component {...pageProps} />
              </main>
              {isMobilePlayerOn ? <PlayerMobile /> : <Player />}
              {loading && (
                <div className={styles.loading}>
                  <Loading size="small"/>
                </div>
              )}
            </div>
          </ToastProvider>
        </PlayerProvider>
      </SessionProvider>
    </CookiesProvider>
    
  )
}

export default MyApp
