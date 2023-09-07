import './App.css'
import BasicTable from './components/BasicTable'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  return (

    <DndProvider backend={HTML5Backend}>
      <h1>React-table</h1>
      <BasicTable />
    </DndProvider>
  )
}

export default App
