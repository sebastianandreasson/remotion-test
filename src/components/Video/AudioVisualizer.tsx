import { fps } from '../../state'
import { useAudioData, visualizeAudio } from '@remotion/media-utils'
import { useCurrentFrame } from 'remotion'

const AudioVisualizer = ({ audioSrc }: { audioSrc: string }) => {
  const frame = useCurrentFrame()
  const audioData = useAudioData(audioSrc)

  if (!audioData) {
    return null
  }

  const frequencyData = visualizeAudio({
    fps: fps,
    frame: frame,
    audioData: audioData,
    numberOfSamples: 256,
  })

  // Pick the low values because they look nicer than high values
  // feel free to play around :)
  const frequencyDataSubset = frequencyData.slice(7, 7 + Math.round(18 / 2))

  const frequencesToDisplay = [
    ...frequencyDataSubset.slice(1).reverse(),
    ...frequencyDataSubset,
  ]

  return (
    <div className="flex h-12 w-1/4 items-center justify-center gap-1">
      {frequencesToDisplay.map((v, i) => {
        return (
          <div
            key={`AudioViz_${i}`}
            className="rounded-sm border-r-2"
            style={{
              height: `${100 * Math.sqrt(v)}%`,
            }}
          />
        )
      })}
    </div>
  )
}

export default AudioVisualizer
