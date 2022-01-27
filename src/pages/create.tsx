import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Loading } from '../components/Loading';
import { useToast } from '../contexts/ToastContext';
import UsersService from '../services/Users';
import styles from '../styles/login.module.scss';

function checkValidation(value?: string) {
  if (!value) {
    return false
  }

  if (value === '') {
    return false
  }

  return true
}

export default function Create() {
    const userService = new UsersService()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toggleToast } = useToast()

    async function handleCreate() {
      try {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const name = nameRef.current.value

        if (!checkValidation(email) || !checkValidation(password) || !checkValidation(name)) {
          toggleToast({
            message: 'You must add a valid input',
            type: 'error'
          })

          return 
        }

        setLoading(true)
        await userService.create({email, password, name})
        setLoading(false)
        toggleToast({
          message: 'User created!',
          type: 'success'
        })
        router.push('/login')
      } catch (error) {
        setLoading(false)
        toggleToast({
          message: error.response.data.message,
          type: 'error'
        })
      }
    }


    if(loading) {
        return (
            <div
              className={styles.pageContainer}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Loading/>
            </div>
        )
    }
    
    return (
        <div className={styles.pageContainer}>
            <Head>
                <title>Register | 🎧 Podcastr</title>
            </Head>
            <section className={styles.pageContent}>
                <div className={styles.input}>
                  <label htmlFor="name">Nome</label>
                  <input 
                    type="text"
                    placeholder="Jhon Doe"
                    name="name"
                    ref={nameRef}
                  />
                </div>
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
                  onClick={async () => await handleCreate()}
                  className={styles.btn_login}
                >Criar conta</button>
                <Link href="/login">
                  <a className={styles.create_user_link}>
                    Voltar
                  </a>
                </Link>
            </section>
            
            <footer className={styles.footer}>
                Made by ViniciusTei.
                
                
            </footer>
        </div>
    )
}