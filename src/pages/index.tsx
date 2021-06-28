import { useSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import styles from '../styles/unsigned.module.scss';

export default function Home() {
    const [session] = useSession();
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        if(session) {
            setLoading(true)
            console.log('redirect')
            router.push('/home')
        }
    }, [session])

    if(loading) {
        return (
            <div className={styles.pageContainer} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                <Loading/>
            </div>
        )
    }
    
    return (
        <div className={styles.pageContainer}>
            <Head>
                <title>LogIn | 🎧 Podcastr</title>
            </Head>
            <section className={styles.pageContent}>
                <img src="/podcast.svg" alt="podcast audience" />
                <h2>Faça login para começar a ouvir seus podcasts preferidos! 🎵</h2>
            </section>
            <section className={styles.pageArticle}>
                <article>
                    <h3>O que eh um Podcast?</h3>
                    <p>A podcast is an episodic series of spoken word digital audio files that a user can download to a personal device for easy listening. 
                        Streaming applications and podcasting services provide a convenient and integrated way to manage a personal consumption queue across many 
                        podcast sources and playback devices
                    </p>
                </article>
                <article>
                    <h3>Como utilizar o podcastr?</h3>
                    <p>Faca login utilizando sua conta, então eh so começar a adicionar seus podcasts preferidos utilizando o feed rss.</p>
                </article>
                
                
            </section>
        </div>
    )
}