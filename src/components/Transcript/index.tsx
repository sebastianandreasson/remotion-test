import React from 'react'
import { selectedSentencesAtom } from '@/state'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import type { VirtualElement } from '@popperjs/core'
import { ShareableText } from './ShareableText'

type TranscriptType = {
  paragraphs: {
    speaker: {
      name: string
    }
    text: string
    sentences: {
      text: string
      start: number
      end: number
    }[]
  }[]
}

const TranscriptInner = ({ transcript }: { transcript: TranscriptType }) => {
  const setSentences = useSetAtom(selectedSentencesAtom)

  const onShare = (selectedText: string) => {
    console.log('ON SHARE', selectedText)
    const selectedParagraph = transcript.paragraphs.find((paragraph) => {
      return paragraph.text.includes(selectedText)
    })

    if (selectedParagraph) {
      // const selectedSentences = selectedParagraph.sentences.filter(
      //   (sentence) => {
      //     return selectedText.includes(sentence.text)
      //   }
      // )
      setSentences(
        selectedParagraph.sentences.map((sentence) => ({
          start: sentence.start,
          end: sentence.end,
          text: sentence.text,
          speaker: selectedParagraph.speaker.name,
        }))
      )
    }
  }

  // const selectionChange = useCallback(() => {
  //   const selection = window.getSelection()
  //   if (selection) {
  //     const selectedText = selection.toString()
  //     if (selection.isCollapsed || !selectedText.length) {
  //       setSelectedText([])
  //     }

  //     const selectedParagraph = transcript.paragraphs.find((paragraph) => {
  //       return paragraph.text.includes(selectedText)
  //     })

  //     if (selectedParagraph) {
  //       // const selectedSentences = selectedParagraph.sentences.filter(
  //       //   (sentence) => {
  //       //     return selectedText.includes(sentence.text)
  //       //   }
  //       // )
  //       setSelectedText(
  //         selectedParagraph.sentences.map((sentence) => ({
  //           start: sentence.start,
  //           end: sentence.end,
  //           text: sentence.text,
  //           speaker: selectedParagraph.speaker.name,
  //         }))
  //       )
  //     }
  //   }
  // }, [setSelectedText])

  // document.onselectionchange = () => {
  //   selectionChange()
  // }

  return (
    <ShareableText wrapperId="transcript" onShare={onShare}>
      <div className="p-8 text-sm">
        {transcript.paragraphs.map((paragraph, index) => (
          <p key={`Paragraph_${index}`} className="mb-4 text-left">
            <strong>{paragraph.speaker.name}</strong>: {paragraph.text}
            {paragraph.text}
          </p>
        ))}
      </div>
    </ShareableText>
  )
}

const Transcript = () => {
  const [transcript, setTranscript] = useState<TranscriptType | null>(null)
  useEffect(() => {
    fetch('/nvidia.json')
      .then((response) => response.json())
      .then((data) => {
        setTranscript(data)
      })
  }, [])

  if (!transcript) return <div>Loading...</div>

  return <TranscriptInner transcript={transcript} />
}

export default Transcript
