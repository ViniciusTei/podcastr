import { useEffect, useState } from 'react'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import useWindow from '../../hooks/useWindowSize'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })

  const [currentWindowSize, setCurrentWindowSize] = useState(0)
  const window = useWindow()

  useEffect(() => {
    setCurrentWindowSize(window.width)

  }, [window])

  return (
    <header className={styles.container}>
      <img src="/logo.svg" alt="Logo Podcastr"/>
      {currentWindowSize < 720 ? null : <p>O melhor para voce ouvir, sempre!</p>}
      <span>{currentWindowSize < 720 ? null : currentDate}</span>
      <SignInButton/>
    </header>
  );
}