import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Loading } from '../components/Loading';
import { useSession } from '../contexts/SessionContext';
import styles from '../styles/login.module.scss';

export default function Login() {
    const { session, login } = useSession();
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    async function handleLogin() {
      const email = emailRef.current.value
      const password = passwordRef.current.value

      try {
        await login(email, password)
        
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
        if(session) {
            setLoading(true)
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
                <div className={styles.input}>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                    ref={emailRef}
                  />
                </div>
                <div className={styles.input}>
                  <label htmlFor="senha">Senha</label>
                  <input 
                    type="password" 
                    name="senha" 
                    ref={passwordRef}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className={styles.btn_login}
                >Entrar</button>
            </section>
            <footer className={styles.footer}>
                Made by ViniciusTei.
                
                
            </footer>
        </div>
    )
}