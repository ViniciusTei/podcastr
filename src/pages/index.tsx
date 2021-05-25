import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

//types
import { GetStaticProps } from 'next';

//api
import { fetchEpisodes } from '../services/api';

//date format
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { secToTimeString } from '../utils/timeMsToDateString';

//styles
import styles from '../styles/home.module.scss';
import { usePlayer } from '../contexts/PlayerContext';

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
  const { playList } = usePlayer()

  const episodeList = [...latestEpisodes, ...allEpisodes]
  
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Podcastr</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image 
                  width={192} 
                  height={192} 
                  src={episode.thumbnail} 
                  alt="Imagem do episódio" 
                  objectFit="cover"
                />
                <div className={styles.episodeDetails}>
                  <Link href={`/episode/${episode.id}`}>
                    <a >{episode.title}</a> 
                  
                  </Link>
                  <p>{episode.title}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationString}</span>

                </div>
                <button type="button" onClick={() => playList(episodeList, index)}>
                  <img src="/play-green.svg" alt="Tocar ep"/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{width: 72 }}>
                    <Image 
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    ></Image>
                  </td>
                  <td>
                    <Link href={`/episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{width: 100}}>{episode.publishedAt}</td>
                  <td>{episode.durationString}</td>
                  <td>
                    <button type="button" onClick={() => playList(episodeList, index + latestEpisodes.length)}>
                      <img src="/play-green.svg" alt=""/>
                    </button>
                  </td> 
                </tr>
              )
            })}
          </tbody>
        </table>

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
      durationString: secToTimeString(Number(ep.duration_ms)),
      description: ep.description,
      url: ep.audio_preview_url

    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, 12)
  return {
    props: {
      allEpisodes,
      latestEpisodes
    }
  }
}

