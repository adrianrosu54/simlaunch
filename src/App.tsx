import './App.css';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <>
      <div className="flex flex-col h-screen w-screen m-0 p-0
          bg-slate-950 text-slate-100" id="background">
        <header className="p-1 bg-slate-900 border-b-2 border-orange-600">
            <h1 className="text-2xl font-bold text-center">FTC Decode Launcher Simulation</h1>
        </header>
        <div className="flex flex-row justify-center h-full" id="content">
          <Dashboard/>
        </div>
        <footer className="p-1 bg-slate-900">
            <h2 className="text-right font-bold">Team #19075 Clockworks</h2>
        </footer>
      </div>
    </>
  )
}

export default App
