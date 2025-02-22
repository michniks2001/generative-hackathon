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

const makePostRequest = async (data) => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error making POST request:', error)
    throw error
  }
}
