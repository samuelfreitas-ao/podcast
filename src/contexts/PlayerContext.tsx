import { createContext, useState, ReactNode } from 'react'

type Episode = {
    id: string
    title: string
    members: string
    publishedAt: string
    thumbnail: string
    description: string
    duration: number
    durationString: string
    url: string
}

type EpisodeParams = {
    episodeList: Episode[]
    currentEpisodeIndex: number
    isPlaying: boolean
    play: (episode: Episode) => void
    togglePlay: () => void
    setPlayingState: (state: boolean) => void
}

export const PlayerContext = createContext({} as EpisodeParams)

type PlayercontextLayerProps = {
    children: ReactNode
}

export const PlayercontextLayer = ({ children }: PlayercontextLayerProps) => {
    const [episodeList, setEpisodeList] = useState<Episode[]>([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            togglePlay,
            setPlayingState
        }}>
            {children}
        </PlayerContext.Provider>
    )
}