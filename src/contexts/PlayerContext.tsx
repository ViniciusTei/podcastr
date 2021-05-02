import { createContext, ReactNode, useContext, useState } from 'react'
interface Episode {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}
interface PlayerContextData  {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasPrevious: boolean;
    hasNext: boolean;
    isLooping: boolean;
    play: (episode: Episode) => void
    togglePlay: () => void
    toggleLooping: () => void
    playNext: () => void
    playPrevious: () => void
    setIsPlayingState: (state: boolean) => void
    playList: (list: Episode[], index: number) => void
}

const PlayerContext = createContext({} as PlayerContextData)

export function usePlayer() {
    return useContext(PlayerContext)
}

export default function PlayerProvider({children}: { children: ReactNode }) {
    const [episodeList, setEpisodeList] = useState([] as Episode[])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)

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

    function toggleLooping() {
        setIsLooping(!isLooping)
    }

    function setIsPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if(hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }        
    }

    function playPrevious() {
        if(hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }        
    }
    return (
        <PlayerContext.Provider value={{
            episodeList, 
            currentEpisodeIndex, 
            play, 
            isPlaying, 
            togglePlay,
            isLooping, 
            toggleLooping,
            setIsPlayingState,
            playList,
            playPrevious,
            playNext,
            hasPrevious,
            hasNext
        }}>
            {children}
        </PlayerContext.Provider>
    )
}