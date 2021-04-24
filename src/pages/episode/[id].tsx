import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchEpisodeById } from '../../services/api';
//date format
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { msToTimeString } from '../../utils/timeMsToDateString';
import Image from 'next/image';

import styles from './episode.module.scss';

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

interface EpisodeProps {
    episode: Episode
}
export default function Episode({episode}: EpisodeProps) {
    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <button type="button">
                    <img src="/arrow-left.svg" alt="Voltar"/>
                </button>
                <Image width={700} height={160} src={episode.thumbnail} objectFit="cover"></Image>
                <button type="button">
                    <img src="/play.svg" alt="Tocar"/>
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationString}</span>
            </header>

            <div className={styles.desciption}>
                {episode.description}
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id } = ctx.params;
    let data = null
    await fetchEpisodeById(id)
        .then(async res => {
            data = await res.json()
        })

    const episode = {
        id: data.id,
        title: data.name,
        thumbnail: data.images[0].url,
        members: "Nhock e Igor Seco.",
        publishedAt: format(parseISO(data.release_date), 'd MMM yy', {locale: ptBR}),
        duration: Number(data.duration_ms),
        durationString: msToTimeString(Number(data.duration_ms)),
        description: data.description,
        url: data.audio_preview_url
    }

    return {
        props: {
            episode
        }
    }
}