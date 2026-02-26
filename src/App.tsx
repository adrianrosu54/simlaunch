import { Suspense } from 'react';
import Dashboard from './components/Dashboard.tsx';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';
import { PerformanceSettingProvider } from './context/PerfSettingContext.tsx';

function App() {

  return (
    <>
      <PerformanceSettingProvider>
        <div className="flex flex-col h-screen w-screen m-0 p-0
              bg-clk-background text-clk-text-primary" id="background">
          <Header/>

          <Suspense fallback={
            <section className="flex flex-col justify-center h-full bg-clk-background
                                text-2xl font-bold text-clk-text-secondary">
              <span className="text-center">Loading Graphs...</span>
            </section>
          }>

            <div className="flex flex-row justify-center h-full pt-1 pb-1" id="content">
              <Dashboard/>
            </div>

          </Suspense>

          <Footer/>
        </div>
      </PerformanceSettingProvider>
    </>
  )
}

export default App
