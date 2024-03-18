import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { enableTailwind } from '@remotion/tailwind'

import path from 'path'

// The composition you want to render
const compositionId = 'Transcript'

// You only have to create a bundle once, and you may reuse it
// for multiple renders that you can parametrize using input props.
const bundleLocation = await bundle({
  entryPoint: path.resolve('./src/render.ts'),
  // If you have a Webpack override, make sure to add it here
  webpackOverride: (config) => {
    console.log(config)
    const withTailwind = enableTailwind(config)
    console.log(withTailwind)
    return withTailwind
  },
})

// Parametrize the video by passing props to your component.
const inputProps = {
  sentences: [
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
}

// Get the composition you want to render. Pass `inputProps` if you
// want to customize the duration or other metadata.
const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: compositionId,
  inputProps,
})

// Render the video. Pass the same `inputProps` again
// if your video is parametrized with data.
await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: 'h264',
  outputLocation: `out/${compositionId}.mp4`,
  inputProps,
})

console.log('Render done!')
