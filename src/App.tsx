import './App.css';

function App() {

  return (
    <>
      <div className="flex flex-col h-screen w-screen m-0 p-0
          bg-slate-950 text-slate-100" id="background">
        <header className="p-1 bg-slate-900 border-b-4 border-amber-700 ">
            <h1 className="text-2xl font-bold text-center">FTC Decode Launcher Simulation</h1>
        </header>
        <div className="flex flex-row justify-center h-full" id="content">
          <main className='max-w-340 bg-slate-800'>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam voluptates dolores deleniti! Pariatur error qui culpa perspiciatis vitae suscipit, dolore numquam quaerat quo perferendis labore? Aperiam consequuntur eos dolores ut?</p>
            
          </main>
        </div>
        <footer className="p-1 bg-slate-900 text-right border-t-4 border-amber-700">
            <h2>Team #19075 Clockworks</h2>
        </footer>
      </div>
    </>
  )
}

export default App
