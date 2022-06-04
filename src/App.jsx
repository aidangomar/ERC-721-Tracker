import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useHistory,
  useNavigate,
  HomeLayoutRoute,
  Link,
} from 'react-router-dom'

import Address from './components/Address'
import Home from './components/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/address/:id' element={<Address />} />
    </Routes> 
  )
}

export default App;
