import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 className='text-3xl text-center bg-red-800'>Welcome to Todo List</h1>
    </>
  )
}

export default App
