import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

//api
// import { HttpService } from '../../services/api';

//date format
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { secToTimeString } from '../../utils/timeMsToDateString';

//styles
import styles from './episode.module.scss';
import { usePlayer } from '../../contexts/PlayerContext';

//icons
import { MdStarBorder } from 'react-icons/md';
import { parseCookies } from '../../utils/parseCookies';
import EpisodesService from '../../services/Episodes';

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

interface EpisodeProps {
    episode: Episode
}
export default function Episode({episode}: EpisodeProps) {
    const router = useRouter()
    const { play } = usePlayer();

    if(router.isFallback) {
        return <p>Carregando...</p>
    }
    
    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar"/>
                    </button>
                </Link>
                <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />
                <button type="button" onClick={() => play(episode)}>
                    <img src="/play.svg" alt="Tocar"/>
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span><MdStarBorder/>{episode.avaliation.toFixed(2)}</span>
            </header>

            <div className={styles.desciption} dangerouslySetInnerHTML={{__html: episode.description}} />
               
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id } = query;
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
    const { token, user } = JSON.parse(session);
    const episodesService = new EpisodesService(token)

    const ep = await episodesService.getOneEpisodeById(user.id, id as string)

    if (!ep) {
        return {
            redirect: {
            destination: '/',
            permanent: false,
            },
        }
    }
    
    const episode = {
        id: ep._id,
        title: ep.title,
        thumbnail: ep.thumbnail,
        members: ep.members,
        publishedAt:  format(new Date(ep.releaseDate), 'd MMM yy', {locale: ptBR}),
        duration: ep.audioLength,
        durationString: secToTimeString(ep.audioLength),
        description: ep.description,
        url: ep.audioUrl,
        avaliation: 0
    }

    return {
        props: {
            episode
        }
    }
}