import { Composition } from 'remotion'
import VideoComponent from './VideoComponent'
import { fps } from '../../state'

const RenderComposition = ({
  start = 0,
  end = 10,
  sentences = [
    {
      text: 'Okay, yes.',
      start: 0,
      end: 0.9799999999997908,
    },
    {
      text: 'Well, you know we guide 1 quarter at a time.',
      start: 2.2899999999999636,
      end: 4.740000000000009,
    },
    {
      text: "But fundamentally, the conditions are excellent for continued growth, calendar '24 to calendar '25 and beyond, and let me tell you why.",
      start: 5.559999999999945,
      end: 17.45999999999981,
    },
  ],
}: any) => {
  const durationInFrames = Math.floor((end - start) * fps)
  return (
    <>
      <Composition
        id="Transcript"
        component={VideoComponent}
        fps={fps}
        width={512}
        height={384}
        defaultProps={{
          audioSrc: `http://localhost:3000/audio-slice?start=${start}&end=${end}`,
          sentences,
        }}
        durationInFrames={durationInFrames}
      />
    </>
  )
}

export default RenderComposition
