import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import EpisodesService from '../services/Episodes';
import { parseCookies } from '../utils/parseCookies';
import { usePlayer } from '../contexts/PlayerContext';
import { useSession } from '../contexts/SessionContext';
//types
import { GetServerSideProps } from 'next';

//date format
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { secToTimeString } from '../utils/timeMsToDateString';

//styles
import styles from '../styles/home.module.scss';

//icons
import { MdStarBorder } from 'react-icons/md'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { Loading } from '../components/Loading';
import { NoContent } from '../components/NoContentPage';
import useWindow from '../hooks/useWindowSize';

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
  totalPages: number
  page: number
}

export default function Home({ allEpisodes, latestEpisodes, page, totalPages }: HomeProps) {
  const { playList } = usePlayer();
  const { session } = useSession();
  const [currentPage, setCurrentPage] = useState(page);
  const [lastPage, setLastPage] = useState(totalPages);
  const [episodes, setEpisodes] = useState(allEpisodes);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const episodesService = new EpisodesService(session?.token);
  const window = useWindow();
  const [isMobile, setIsMobile] = useState(false)

  const [episodeList, setEpisodeList] = useState([...latestEpisodes, ...allEpisodes])

  async function fetchEpisodes(page: number) {
    setLoading(true)
    const response = await episodesService.getEpisodes(session.user.id, page);
    setLastPage(response.totalPages)
    setCurrentPage(response.page)
    const data = response.data.map((ep, epIdx)=> {
      if(response.data.indexOf(ep) == epIdx) {
       return {
         id: ep._id,
         title: ep.title,
         thumbnail: ep.thumbnail,
         members: ep.members,
         publishedAt: format(new Date(ep.releaseDate), 'd MMM yy', {locale: ptBR}),
         duration: ep.audioLength,
         durationString: secToTimeString(ep.audioLength),
         description: ep.description,
         url: ep.audioUrl,
         avaliation: 0
       }
      }
       
    })
    

    if (response.page === 1) {
      setEpisodeList(data)
      setEpisodes(data.slice(2))
    } else {
      setEpisodes(data)
      setEpisodeList([...latestEpisodes, ...data])
      
    }

    setCurrentPage(page)
    setLoading(false)
  }
  
  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session])

  useEffect(() => {
    if(window.width < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [window])
  
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | 🎧 Podcastr</title>
      </Head>
      <div className={styles.episodesPlaylist}>
      {episodeList.length > 0 ?
        <>
        <section className={styles.latestEpisodes}>
          
          <h2>Últimos lançamentos</h2>
          <ul>
            {latestEpisodes.map((episode, index) => {
              return (
                <li key={episode.id}>
                  <Image 
                    src={episode.thumbnail} 
                    alt="Imagem do episódio" 
                    objectFit="cover"
                    width={192} 
                    height={192} 
                  />
                  <div className={styles.episodeDetails}>
                    <Link href={`/episode/${episode.id}`}>
                      <a >{episode.title}</a> 
                    
                    </Link>
                    <p 
                      className={styles.episodeDetails__description} 
                      dangerouslySetInnerHTML={{__html: episode.description}}
                    />
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
          <div className={styles.table_head}>
            <h2>Todos episódios</h2>
            <Pagination
              currentPage={currentPage}
              totalPages={lastPage}
              handleNextPage={() => {
                if (currentPage < lastPage) {
                  fetchEpisodes(currentPage + 1)
                  
                }
              }}
              handlePreviousPage={() => {
                if (currentPage > 1) {
                  fetchEpisodes(currentPage - 1)
                }
              }}
            />
          </div>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                {isMobile ? null : <th>Integrantes</th>}
                <th>Data</th>
                {isMobile ? null : <th>Avaliação</th>}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode, index) => {
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
                    {isMobile ? null : <td>{episode.members}</td>}
                    <td style={{width: 100}}>{episode.publishedAt}</td>
                    {isMobile ? null : <td style={{textAlign: 'center'}}><MdStarBorder/>{episode.avaliation.toFixed(2)}</td>}
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
          
          
          {loading && (
            <div className={styles.loading_container}>
              <Loading/>

            </div>
          )}
        
        </section>
      </> : <NoContent />
      }
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const cookie = parseCookies(req);

  if(Object.keys(cookie).length === 0 && cookie.constructor === Object) {
    return {
        redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  const { session } = cookie;

  const sessionParsed =  JSON.parse(session);

  if (!sessionParsed) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const { token, user } = sessionParsed;
  const episodesService = new EpisodesService(token)
  let episodes = []
  
  const response = await episodesService.getMostRecentEpisodes(user.id)

  episodes = response.data.map((ep, epIdx)=> {
   if(response.data.indexOf(ep) == epIdx) {
    return {
      id: ep._id,
      title: ep.title,
      thumbnail: ep.thumbnail,
      members: ep.members,
      publishedAt: format(new Date(ep.releaseDate), 'd MMM yy', {locale: ptBR}),
      duration: ep.audioLength,
      durationString: secToTimeString(ep.audioLength),
      description: ep.description,
      url: ep.audioUrl,
      avaliation: 0
    }
   }
    
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length)
  return {
    props: {
      allEpisodes,
      latestEpisodes,
      page: response.page,
      totalPages: response.totalPages
    }
  }
}

