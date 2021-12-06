import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { SignInButton } from '../components/SignInButton';
import { useSession } from '../contexts/SessionContext';
import styles from '../styles/login.module.scss';

export default function Login() {
    const {session} = useSession();
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
                <title>Login | 🎧 Podcastr</title>
            </Head>
            <section className={styles.pageContent}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" placeholder="example@email.com" name="email" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" placeholder="example@email.com" name="email" />
                </div>
                <SignInButton/>
            </section>
            <footer className={styles.footer}>
                Made by ViniciusTei.
                
                
            </footer>
        </div>
    )
}