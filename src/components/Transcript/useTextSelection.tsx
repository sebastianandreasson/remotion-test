import React from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import type { VirtualElement } from '@popperjs/core'

type NullableVirtualElement = {
  getBoundingClientRect: () => DOMRect | null
}

type PopupProps = {
  onClick: () => void
  popperTooltipStyles: React.CSSProperties | undefined
}

const SharePopup = React.forwardRef<HTMLDivElement | null, PopupProps>(
  (props, ref) => {
    const { onClick, popperTooltipStyles } = props

    return (
      <span
        ref={ref}
        style={{ ...popperTooltipStyles }}
        className="cursor-pointer rounded-md bg-black p-2 text-white"
      >
        <button onClick={onClick}>Share quote to Twitter</button>
      </span>
    )
  }
)

export const useTextSelection = ({
  wrapperId,
  callback,
}: {
  wrapperId: string
  callback: (string) => void
}) => {
  const [selectedText, setSelectedText] = React.useState<string>('')
  const [referenceElement, setReferenceElement] = React.useState<
    HTMLElement | NullableVirtualElement | undefined | null
  >(null)
  const [popperTooltipElement, setPopperTooltipElement] =
    React.useState<HTMLDivElement | null>(null)
  const { styles: popperTooltipStyles, attributes: popperTooltipAttributes } =
    usePopper(referenceElement as VirtualElement, popperTooltipElement, {
      modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      placement: 'top',
    })

  React.useEffect(() => {
    let tooltipElement = document.querySelector('#selectable-text-tooltip')
    if (!tooltipElement) {
      tooltipElement = document.createElement('div')
      tooltipElement.setAttribute('id', 'selectable-text-tooltip')
      const articleWrapper = document.getElementById(wrapperId)
      articleWrapper?.append(tooltipElement)
    }
  }, [wrapperId])

  const selectionChange = React.useCallback(() => {
    const selection = window.getSelection()
    if (selection) {
      const selectedText = selection.toString()
      if (selection.isCollapsed || !selectedText.length) {
        setSelectedText('')
      }
      setSelectedText(selectedText)
    }
    const virtualReference: NullableVirtualElement = {
      getBoundingClientRect: () => {
        return window
          .getSelection()
          ?.getRangeAt(0)
          .getBoundingClientRect() as DOMRect | null
      },
    }
    setReferenceElement(virtualReference)
  }, [setSelectedText])

  document.onselectionchange = () => {
    selectionChange()
  }

  const popupElement = React.useMemo(() => {
    if (!selectedText || typeof window === 'undefined') {
      return null
    }

    const tooltipElement = document.querySelector('#selectable-text-tooltip')
    if (!tooltipElement) {
      return null
    }

    return ReactDOM.createPortal(
      <SharePopup
        popperTooltipStyles={popperTooltipStyles.popper}
        ref={setPopperTooltipElement}
        onClick={() => {
          callback(selectedText)
          setSelectedText('')
        }}
      />,
      tooltipElement
    )
  }, [
    selectedText,
    setPopperTooltipElement,
    popperTooltipStyles,
    popperTooltipAttributes,
  ])

  return {
    textElementRef: setReferenceElement,
    textElementSelectionChangeHandler: selectionChange,
    popupElement,
  }
}
