import Image from 'next/image'
import { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import styles from './styles.module.scss'

export function Player() {
    const { episodeList, currentEpisodeIndex } = useContext(PlayerContext)
    const episode = episodeList[currentEpisodeIndex]

    return (
        <div className={styles.playerContent}>
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>
            {
                episode ?
                    (
                        <div className={styles.currentEpisode}>
                            <Image
                                src={episode.thumbnail}
                                width={592}
                                height={592}
                                objectFit="cover"
                            />
                            <strong>{episode.title}</strong>
                            <span>{episode.members}</span>
                        </div>
                    ) : (
                        <div className={styles.emptyPlayer}>
                            <strong>Selecione um podcast para ouvir</strong>
                        </div>
                    )
            }
            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#04d461' }}
                                railStyle={{ backgroundColor: "#9F75ff" }}
                                handleStyle={{ borderColor: "#04d461", borderWidth: 4 }}
                            />
                        ) : (
                            <div className={styles.emptySlider}></div>
                        )}
                    </div>
                    <span>00:00</span>
                </div>
                {episode && <audio src={episode.url} autoPlay></audio>}
                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton} disabled={!episode}>
                        <img src="/play.svg" alt="Tocar " />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>

            </footer>
        </div>
    )
}