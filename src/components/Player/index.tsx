import Image from 'next/image'
import { MdRepeat, MdRepeatOne } from 'react-icons/md'
import { useContext, useEffect, useRef, useState } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import styles from './styles.module.scss'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null)

    const [progress, setProgress] = useState<number>(0)

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        clearPlayerState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
    } = useContext(PlayerContext)

    const episode = episodeList[currentEpisodeIndex]

    useEffect(() => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    function setupProgressListner() {
        if (!audioRef.current) return;

        audioRef.current.currentTime = 0
        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(audioRef.current ? Math.floor(audioRef.current.currentTime) : 0)
        })
    }

    function handleSeek(amount: number) {
        if (!audioRef.current) return
        audioRef.current.currentTime = amount
        setProgress(amount)
    }

    function handleEpisodeEnded() {
        if (hasNext) { playNext() }
        else { clearPlayerState() }
    }

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
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#04d461' }}
                                railStyle={{ backgroundColor: "#9F75ff" }}
                                handleStyle={{ borderColor: "#04d461", borderWidth: 4 }}
                            />
                        ) : (
                            <div className={styles.emptySlider}></div>
                        )}
                    </div>
                    <span>{episode?.durationString ?? '00:00'}</span>
                </div>
                {episode &&
                    <audio
                        src={episode.url} autoPlay ref={audioRef}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onEnded={handleEpisodeEnded}
                        loop={isLooping}
                        onLoadedMetadata={setupProgressListner}
                    />
                }
                <div className={styles.buttons}>
                    <button type="button" disabled={!episode || episodeList.length == 1} onClick={toggleShuffle}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton} disabled={!episode} onClick={togglePlay} >
                        {
                            isPlaying ?
                                <img src="/pause.svg" alt="Tocar " /> :
                                <img src="/play.svg" alt="Tocar " />
                        }
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>
                    <button
                        type="button"
                        disabled={!episode}
                        onClick={toggleLoop}>
                        {isLooping ? <MdRepeatOne /> : <MdRepeat />}
                    </button>
                </div>

            </footer>
        </div>
    )
}