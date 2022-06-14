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
    isLooping: boolean
    isShuffling: boolean
    play: (episode: Episode) => void
    playList: (list: Episode[], index: number) => void
    playNext: () => void
    playPrevious: () => void
    togglePlay: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    setPlayingState: (state: boolean) => void
    clearPlayerState: () => void
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
    const [isLooping, setIsLooping] = useState<boolean>(false)
    const [isShuffling, setIsShuffling] = useState<boolean>(false)

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

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
    const hasPrevious = isShuffling || currentEpisodeIndex > 0
    const shuffleIndex = Math.floor(Math.random() * episodeList.length)

    function playNext() {
        if (isShuffling) {
            setCurrentEpisodeIndex(shuffleIndex)
        }
        else if (hasNext) setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }

    function playPrevious() {
        if (isShuffling) {
            setCurrentEpisodeIndex(shuffleIndex)
        }
        else if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1)
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
            isLooping,
            isShuffling,
            togglePlay,
            toggleLoop,
            toggleShuffle,
            setPlayingState,
            clearPlayerState,
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