import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { fetchEpisodes } from '../services/api';

interface Spotify {
  episodes:  Array<{
    name: string;
    id: string;
    description: string;
  }>
}

export default function Home(props: Spotify) {
  

  useEffect(() => {
    console.log(props.episodes)
  }, [])
  return (
    <div>Index</div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let episodes = []
  await fetchEpisodes()
  .then(async (response: any) => {
    const data = await response.json();
    episodes = data.episodes.items
  })
  return {
    props: {
      episodes
    }
  }
}

