import React from 'react'
import { useTextSelection } from './useTextSelection'

export const ShareableText = ({
  wrapperId,
  children,
  onShare,
}: {
  wrapperId: string
  children: React.ReactElement
  onShare: (selectedText: string) => void
}) => {
  const { textElementRef, textElementSelectionChangeHandler, popupElement } =
    useTextSelection({ wrapperId, callback: onShare })
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      id: wrapperId,
      ref: textElementRef,
      onMouseUp: textElementSelectionChangeHandler,
    })
  )

  return (
    <React.Fragment>
      {childrenWithProps}
      {popupElement}
    </React.Fragment>
  )
}
