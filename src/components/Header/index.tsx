import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })
  return (
    <header className={styles.container}>
      <img src="/logo.svg" alt="Logo Podcastr"/>
      <p>O melhor para voce ouvir, sempre!</p>
      <span>{currentDate}</span>
      <SignInButton/>
    </header>
  );
}