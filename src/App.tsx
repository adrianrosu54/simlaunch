import Dashboard from './components/Dashboard.tsx';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';

function App() {

  return (
    <>
      <div className="flex flex-col h-screen w-screen m-0 p-0
          bg-clk-background text-clk-text-primary" id="background">
        <Header/>
        <div className="flex flex-row justify-center h-full" id="content">
          <Dashboard/>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App
