import { Easing } from 'remotion'
import { interpolate } from 'remotion'
import React from 'react'

const AnimatedWords: React.FC<{
  item: {
    start: number
    end: number
    text: string
  }
  offset: number
  transcriptionColor: string
}> = ({ item, offset, transcriptionColor }) => {
  const opacity = interpolate(offset, [item.start, item.start + 1.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const words = item.text.split(' ')
  const wordDuration = (item.end - item.start) / words.length
  const currentWordIndex = Math.floor(
    interpolate(offset, [item.start, item.end], [0, words.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  )

  const translateY = interpolate(
    offset,
    [item.start, item.start + 1],
    [0.25, 0],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  )

  return (
    <p
      className="text-2xl font-bold"
      style={{
        display: 'inline-block',
        opacity,
        translate: `0 ${translateY}em`,
        color: transcriptionColor,
      }}
    >
      {words.map((word, index) => (
        <span
          style={{
            opacity: index <= currentWordIndex ? 1 : 0.5,
          }}
        >
          {word}{' '}
        </span>
      ))}
    </p>
  )
}

export default AnimatedWords
