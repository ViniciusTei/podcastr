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
                <h1 className={styles.title}>Faça login para começar a ouvir seus podcasts preferidos! 🎵</h1>
                <img className={styles.image} src="/podcast.svg" alt="podcast audience" />
            </section>
            <footer className={styles.footer}>
                Made by ViniciusTei.
                
                
            </footer>
        </div>
    )
}