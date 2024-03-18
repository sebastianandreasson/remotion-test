import { audioBufferToDataUrl } from '@remotion/media-utils'
import { atom, useAtomValue } from 'jotai'
import { unwrap } from 'jotai/utils'
import { useCurrentFrame } from 'remotion'

export type Sentence = {
  text: string
  start: number
  end: number
  speaker: string
}

export const selectedSentencesAtom = atom<Sentence[]>([])

export type VideoConfig = {
  fps: number
  start: number
  end: number
  frameOffset: number
  durationInFrames: number
  sentences: number
}

export const fps = 24
export const videoConfigAtom = atom<VideoConfig>((get) => {
  const sentences = get(selectedSentencesAtom)
  const start = sentences[0]?.start || 0
  const end = sentences[sentences.length - 1]?.end || 0

  return {
    fps,
    start,
    end,
    frameOffset: Math.floor(start * fps),
    durationInFrames: Math.floor((end - start) * fps),
    sentences: sentences.length,
  }
})

// export const audioBufferAtom = atom(async () => {
//   const response = await fetch('http://localhost:3000/')
//   const arrayBuffer = await response.arrayBuffer()
//   const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer)
//   return audioBuffer
// })

// function sliceAudioBuffer(audioContext, sourceBuffer, startTime, endTime) {
//   // Calculate start and end sample frames
//   const startSample = Math.floor(startTime * sourceBuffer.sampleRate)
//   const endSample = Math.floor(endTime * sourceBuffer.sampleRate)
//   const sampleFrames = endSample - startSample

//   // Create a new AudioBuffer to hold the slice
//   const slicedBuffer = audioContext.createBuffer(
//     sourceBuffer.numberOfChannels,
//     sampleFrames,
//     sourceBuffer.sampleRate
//   )

//   // Copy the data for each channel
//   for (let channel = 0; channel < sourceBuffer.numberOfChannels; channel++) {
//     const sourceData = sourceBuffer.getChannelData(channel)
//     const slicedData = slicedBuffer.getChannelData(channel)

//     // Copy the segment of interest from sourceData to slicedData
//     for (let i = startSample, j = 0; i < endSample; i++, j++) {
//       slicedData[j] = sourceData[i]
//     }
//   }

//   return slicedBuffer
// }

// export const audioSliceAtom = unwrap(
//   atom(async (get) => {
//     console.log('audioSliceAtom run get')
//     const response = await fetch(
//       `http://localhost:3000/audio-slice?start=0&end=10`
//     )

//     // const audioBuffer = await get(audioBufferAtom)
//     // const videoConfig = get(videoConfigAtom)

//     // if (!videoConfig || !audioBuffer) return null

//     // const audioContext = new AudioContext()

//     // const slicedBuffer = sliceAudioBuffer(
//     //   audioContext,
//     //   audioBuffer,
//     //   videoConfig.start,
//     //   videoConfig.end
//     // )
//     // return slicedBuffer
//   })
// )
