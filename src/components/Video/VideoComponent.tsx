import { Sentence, fps } from '../../state'
import { AbsoluteFill, Audio, useCurrentFrame } from 'remotion'
import AnimatedWords from './AnimatedWords'
import AudioVisualizer from './AudioVisualizer'
import { audioBufferToDataUrl } from '@remotion/media-utils'

const Subtitles = ({ sentences }: { sentences: Sentence[] }) => {
  const start = sentences[0]?.start
  const frame = useCurrentFrame()
  const offset = start + frame / fps

  const currentSentence = sentences.find((sentence) => {
    return offset >= sentence.start && offset <= sentence.end
  })
  const index = sentences.indexOf(currentSentence)
  const nextSentence = sentences[index + 1]

  if (!currentSentence) return null

  return (
    <div className="mt-4 text-zinc-50">
      <AnimatedWords
        offset={offset}
        item={{
          start: currentSentence.start,
          end: currentSentence.end,
          text: currentSentence.text,
        }}
        transcriptionColor="white"
      />
    </div>
  )
}

const Speaker = () => {
  return (
    <div className="left-0 right-0 mb-4 flex items-center justify-center">
      <div className="h-12 w-12">
        <img
          src="/jensen.png"
          alt="speaker"
          className="h-12 w-12 rounded-full"
        />
      </div>
      <div className="ml-4 flex flex-col justify-center text-start">
        <span className="text-lg font-normal text-white">Jensen Huang</span>
        <span className="text-sm font-thin text-zinc-400">CEO</span>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div
      className="absolute bottom-8 left-0 flex h-8 w-full justify-between px-8"
      // style={{ border: '1px dotted yellow' }}
    >
      <div className="flex">
        <div
          className="flex w-28 items-center rounded-r-sm"
          style={{ background: '#383838' }}
        >
          <div
            className="flex h-8 w-9 items-center justify-center rounded-sm"
            style={{ background: '#74b71a' }}
          >
            <img src="/nvidia_logo.svg" className="h-4" />
          </div>
          <span className="ml-3">
            <span className="text-white">NVIDIA</span>
          </span>
        </div>
        <div
          className="w-18 ml-2 flex items-center rounded-sm px-2"
          style={{ background: '#383838' }}
        >
          <span>
            <span className="text-white">Q4 2023</span>
          </span>
        </div>
      </div>
      <img src="/logo.svg" />
    </div>
  )
}

const VideoComponent = ({
  audioSrc,
  sentences,
}: {
  audioSrc: string
  sentences: Sentence[]
}) => {
  return (
    <AbsoluteFill>
      <div className="h-full w-full p-8" style={{ background: '#232323' }}>
        <Audio src={audioSrc} />
        <div className="flex w-full justify-between">
          <Speaker />
          <AudioVisualizer audioSrc={audioSrc} />
        </div>
        <Subtitles sentences={sentences} />
        <Footer />
      </div>
    </AbsoluteFill>
  )
}

export default VideoComponent
