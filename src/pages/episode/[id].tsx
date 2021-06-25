import { GetStaticPaths, GetStaticProps } from 'next';
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
import { MdStarBorder } from 'react-icons/md'
import { api } from '../../services/api';

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

            <div className={styles.desciption}>
                <p>
                    {episode.description}
                </p>
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id } = ctx.params;
    let ep = null
    // const http = new HttpService()

    await api.get(`/episodes/${id}`)
        .then(async res => {
            ep = res.data.episode
        })

    if (!ep) {
        return {
            redirect: {
            destination: '/',
            permanent: false,
            },
        }
    }
    
    const episode = {
        id: ep.id,
        title: ep.title,
        thumbnail: ep.image,
        members: "Banza",
        publishedAt: format(new Date(ep.published._seconds * 1000), 'd MMM yy', {locale: ptBR}),
        duration: 0,
        durationString: secToTimeString(0),
        description: ep.description,
        url: ep.link,
        avaliation: ep.avaliation || 0
    }

    return {
        props: {
            episode
        }
    }
}