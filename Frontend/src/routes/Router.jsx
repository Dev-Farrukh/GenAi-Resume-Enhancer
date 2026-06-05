import React from 'react'
import Login from '../features/Authentication/pages/Login'
import { Route, Routes } from 'react-router'
import Signup from '../features/Authentication/pages/Signup'
import Protected from '../features/Authentication/components/Protected'
import Home from '../features/Interview_Report/pages/Home'
import Report from '../features/Interview_Report/pages/Report'

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/" element={ <Protected><Home /></Protected>} />
        <Route path="/report/:id" element={ <Protected><Report /></Protected>} />
    </Routes>
  )
}

export default Router