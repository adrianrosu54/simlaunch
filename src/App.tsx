import './App.css'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">
        <h1 className="text-4xl font-bold mb-4">Flywheel Sim</h1>
        <Button variant="outline">Launch Test</Button>
      </div>
    </>
  )
}

export default App
