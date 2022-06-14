import { createContext } from 'react'

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
}

export const PlayerContext = createContext({} as EpisodeParams)