import { Separator } from '@/components/ui/separator'
import Transcript from './components/Transcript'
import Video from './components/Video'

function App() {
  return (
    <div className="h-100 relative flex">
      <div className="w-1/2">
        <Transcript />
      </div>
      <Separator orientation="vertical" />
      <div className="fixed left-1/2 w-1/2">
        <Video />
      </div>
    </div>
  )
}

export default App
