import { useEffect } from 'react';
import { Header } from '../components/Header';

export default function Home() {
  async function getApiResponse() {
    const api_token = window.localStorage.getItem('@SpotifyToken')
    const myHeaders = new Headers({
      "Authorization": `Bearer ${api_token}`,
    });
    const initFetch = {
      method: 'GET',
      headers: myHeaders,
    }
    
    await fetch('https://api.spotify.com/v1/tracks?ids=2DiuOqMFJcTCEquAFCtjwW,0ONK2veMuvNNHpaKBTiTnA,4c9Py6O1NeuYKbJ8Ok7mTl', initFetch)
    .then(async (response: any) => {
      const data = await response.json();
      console.log(data)
    })
  }

  useEffect(() => {
    getApiResponse()
  }, [])
  return (
    <div>Index</div>
  )
}

