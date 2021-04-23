import React, { useState, useEffect } from 'react';

//Styles
import '../styles/global.scss'
import styles from '../styles/app.module.scss';

//components
import { Header } from '../components/Header';
import { Player } from '../components/Player';

function MyApp({ Component, pageProps }) {
  const spotifyCredentials = "MTM0ODA5ODdhNjhkNDUxN2FlNjhiMmE3ZGZiMTQ1ZDk6NGFjOThkODAzMTNmNGEwZTkzMDZmYzUyYzBiNTM0OWE="
  
  const myHeaders = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `Basic ${spotifyCredentials}`,
  });
  const initFetch = {
    method: 'POST',
    headers: myHeaders,
    body: "grant_type=client_credentials"
  }

  useEffect(() => {
    fetch('https://accounts.spotify.com/api/token', initFetch)
      .then(async (response: any) => {
        const data = await response.json();
        window.localStorage.setItem('@SpotifyToken', data.access_token)
      })
  }, [])

  return (
    <div className={styles.wrapper}>
      <main>
        <Header></Header>
        <Component {...pageProps} />
      </main>
      <Player></Player>
    </div>
  )
}

export default MyApp
