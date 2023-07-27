import './global.css'
import './App.module.css'
import {Header} from "./components/Header.tsx";
import {Task} from "./components/Task.tsx";

function App() {

  return (
    <>
        <div>
        <Header/>
            <main>
                <Task/>
            </main>
        </div>

    </>
  )
}

export default App
