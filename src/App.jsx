import LeftSideBar from './components/LeftSideBar'
import './App.css'
import RightSidebar from './components/RightSideBar'
import { useState } from 'react'

function App() {
  const selectFirstIndex = 0
  const [selectedItem,setSelectedItem] = useState(selectFirstIndex)

  return (
    <div className='flex justify-start h-screen'>
      <div className='className="w-1/4 p-8 border-r-gray-200 border-r'>
        <LeftSideBar setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>
      </div>
      <div className="w-3/4 p-8">
        <RightSidebar selectedItem={selectedItem}/>
      </div>
    </div>
  )
}

export default App
