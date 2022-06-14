import { createContext, useContext, useState, ReactNode } from 'react'

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
    playList: (list: Episode[], index: number) => void
    playNext: () => void
    playPrevious: () => void
    togglePlay: () => void
    setPlayingState: (state: boolean) => void
    hasNext: boolean
    hasPrevious: boolean
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

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    const hasNext = (currentEpisodeIndex + 1) < episodeList.length
    const hasPrevious = currentEpisodeIndex > 0

    function playNext() {
        if (hasNext) setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }

    function playPrevious() {
        if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }

    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            playList,
            playNext,
            playPrevious,
            isPlaying,
            togglePlay,
            setPlayingState,
            hasNext,
            hasPrevious,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}