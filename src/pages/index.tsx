import { useEffect } from 'react';
import Image from 'next/image';

//types
import { GetStaticProps } from 'next';

//api
import { fetchEpisodes } from '../services/api';

//date format
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { msToTimeString } from '../utils/timeMsToDateString';

//styles
import styles from '../styles/home.module.scss';

interface Episode {
  id: string;
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: number
  description: string
  url: string
  durationString: string;
}

interface Spotify {
  allEpisodes:  Array<Episode>
  latestEpisodes:  Array<Episode>
}

export default function Home({ allEpisodes, latestEpisodes }: Spotify) {
  

  useEffect(() => {
    console.log(latestEpisodes)
  }, [])

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Utilms lancamentos</h2>
        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <Image 
                  width={192} 
                  height={192} 
                  src={episode.thumbnail} 
                  alt="Imagem do episodio" 
                  objectFit="cover"
                />
                <div className={styles.episodeDetails}>
                  <a href="">{episode.title}</a> 
                  <p>{episode.title}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationString}</span>

                </div>
                <button type="button">
                  <img src="/play-green.svg" alt="Tocar ep"/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

    </div>
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
      durationString: msToTimeString(Number(ep.duration_ms)),
      description: ep.description,
      url: ep.audio_preview_url

    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisdoes = episodes.slice(2, 12)
  return {
    props: {
      allEpisdoes,
      latestEpisodes
    }
  }
}

