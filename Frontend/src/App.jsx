import React from 'react'
import Router from './routes/Router'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
    <Toaster position="top-center" />
    <Router />
    </>
  )
}

export default App