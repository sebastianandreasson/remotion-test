import {
  VideoConfig,
  audioSliceAtom,
  selectedSentencesAtom,
  videoConfigAtom,
} from '../../state'
import { Player, PlayerRef } from '@remotion/player'
import { useAtomValue } from 'jotai'
import VideoComponent from './VideoComponent'
import { useEffect, useRef } from 'react'
import { Button } from '../ui/button'

const PlayerWrapper = () => {
  const playerRef = useRef<PlayerRef>(null)
  const videoConfig = useAtomValue(videoConfigAtom)
  const sentences = useAtomValue(selectedSentencesAtom)

  useEffect(() => {
    if (!playerRef.current) return
    playerRef.current.seekTo(0)
  }, [videoConfig])

  return (
    <div className="flex flex-col items-center">
      <Player
        style={{
          borderRadius: 32,
        }}
        ref={playerRef}
        fps={videoConfig.fps}
        durationInFrames={videoConfig.durationInFrames}
        component={() => (
          <VideoComponent
            audioSrc={`http://localhost:3000/audio-slice?start=${videoConfig.start}&end=${videoConfig.end}`}
            sentences={sentences}
          />
        )}
        compositionWidth={512}
        compositionHeight={384}
        autoPlay
        // controls
        // alwaysShowControls
      />
      <Button className="mt-4 w-1/4" onClick={() => {}}>
        Download video
      </Button>
    </div>
  )
}

const Video = () => {
  const selectedSentences = useAtomValue(selectedSentencesAtom)

  if (selectedSentences.length === 0) {
    return (
      <div className="p-16">
        <p className="text-center">Select a paragraph to share</p>
      </div>
    )
  }

  return (
    <div className="p-16">
      <PlayerWrapper />
    </div>
  )
}

export default Video
