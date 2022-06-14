import type { AppProps } from 'next/app'

import { Header } from '../components/Header'
import { Player } from '../components/Player'

import '../styles/globals.scss'
import styles from '../styles/app.module.scss'
import { PlayercontextLayer } from '../contexts/PlayerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayercontextLayer>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayercontextLayer>
  )
}

export default MyApp