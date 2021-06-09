import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

//types
import { GetStaticProps } from 'next';

//api
import { HttpService } from '../services/api';

//date format
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { secToTimeString } from '../utils/timeMsToDateString';

//styles
import styles from '../styles/home.module.scss';
import { usePlayer } from '../contexts/PlayerContext';

//icons
import { MdStarBorder } from 'react-icons/md'

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
  avaliation: number
}

interface HomeProps {
  allEpisodes:  Array<Episode>
  latestEpisodes:  Array<Episode>
}

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {
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
                  <span><MdStarBorder/>{episode.avaliation}</span>

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
              <th>Avaliação</th>
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
                    />
                  </td>
                  <td>
                    <Link href={`/episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{width: 100}}>{episode.publishedAt}</td>
                  <td style={{textAlign: 'center'}}><MdStarBorder/>{episode.avaliation.toFixed(2)}</td>
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
  const http = new HttpService()

  await http.fetchEpisodes()
  .then(async (response) => {
    const data = response;
    episodes = data.data
  })
  
  episodes = episodes.map((ep)=> {
   
    return {
      id: ep.id,
      title: ep.title,
      thumbnail: ep.thumbnail,
      members: ep.members[0].name,
      publishedAt: format(new Date(ep.published), 'd MMM yy', {locale: ptBR}),
      duration: 0,
      durationString: secToTimeString(0),
      description: ep.description,
      url: ep.file,
      avaliation: ep.avaliation || 0
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

