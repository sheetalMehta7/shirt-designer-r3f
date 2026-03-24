import Home from './pages/Home'
import Customizer from './pages/Customizer'
import CanvasModel from './canvas'
import { useSnapshot } from 'valtio'
import state from './store'
import { generatePastelColor } from './config/helpers'

function App() {
  const snap = useSnapshot(state)
  return (
   <main className='app transition-all ease-in' style={{backgroundColor: generatePastelColor(snap.color)}}>
    <Home/>
    <Customizer/>
    <CanvasModel/>
   </main>
  )
}

export default App
