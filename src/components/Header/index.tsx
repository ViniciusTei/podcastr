import { useEffect, useState } from 'react'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })

  const currentSmallDate = format(new Date(), 'd MMMM', {
    locale: ptBR
  })

  const [currentWindowSize, setCurrentWindowSize] = useState(0)

  useEffect(() => {
    setCurrentWindowSize(window.screen.width)

  }, [])

  return (
    <header className={styles.container}>
      <img src="/logo.svg" alt="Logo Podcastr"/>
      <p>O melhor para voce ouvir, sempre!</p>
      <span>{currentWindowSize < 720 ? currentSmallDate : currentDate}</span>
      <SignInButton/>
    </header>
  );
}