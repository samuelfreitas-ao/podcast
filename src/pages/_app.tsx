import { useState } from 'react'
import type { AppProps } from 'next/app'

import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContext } from '../contexts/PlayerContext'

import '../styles/globals.scss'
import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  function play(episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
