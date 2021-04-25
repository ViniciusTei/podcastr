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
    play: (episode: Episode) => void
    togglePlay: () => void
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

    function setIsPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function playNext() {
        
        const nextIndex = currentEpisodeIndex + 1
        if(nextIndex >= episodeList.length) {
            return
        }
        
        setCurrentEpisodeIndex(nextIndex)
    }

    function playPrevious() {
        const nextIndex = currentEpisodeIndex - 1
        if(nextIndex == 0) {
            return
        }
        setCurrentEpisodeIndex(nextIndex)
    }
    return (
        <PlayerContext.Provider value={{
            episodeList, 
            currentEpisodeIndex, 
            play, 
            isPlaying, 
            togglePlay, 
            setIsPlayingState,
            playList,
            playPrevious,
            playNext
        }}>
            {children}
        </PlayerContext.Provider>
    )
}