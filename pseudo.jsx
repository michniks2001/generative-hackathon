import React from 'react'

const Pseudo = () => {
  const [count, setCount] = React.useState(0)

  const handleIncrement = () => {
    setCount(prev => prev + 1)
  }

  return (
    <div className='pseudo-container'>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>
        Increment
      </button>
    </div>
  )
}

export default Pseudo
