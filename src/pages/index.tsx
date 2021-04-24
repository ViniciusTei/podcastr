import { useEffect } from 'react';

//types
import { GetStaticProps } from 'next';
//api
import { fetchEpisodes } from '../services/api';

//date format
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

interface Episode {
  id: string;
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: number
  description: string
  url: string
}

interface Spotify {
  episodes:  Array<Episode>
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

  episodes = episodes.map((ep)=> {
    return {
      id: ep.id,
      title: ep.name,
      thumbnail: ep.images[0].url,
      members: "Nhock e Igor Seco.",
      publishedAt: format(parseISO(ep.release_date), 'd MMM yy', {locale: ptBR}),
      duration: Number(ep.duration_ms),
      description: ep.description,
      url: ep.audio_preview_url

    }
  })
  return {
    props: {
      episodes
    }
  }
}

