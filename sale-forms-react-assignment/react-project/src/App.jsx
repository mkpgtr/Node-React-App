import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AddSales from './pages/AddSales'
import Login from './pages/Login'
import Register from './pages/Register'
import TodaysRevenue from './pages/TodaysRevenue'
import Top5Sales from './pages/Top5Sales'
import { useSelector } from 'react-redux'


function App() {

  const fromLocalStorage = JSON.parse(localStorage.getItem('user'))
  

  



  

 


 

  

  // ! actually the entire frontend comments are already there in my previous submission of the frontend part of this application.
  return (
    // ! defining all my routes here
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Navbar />}>
      {/* ! this will automatically open up because it has the index prop */}
      <Route index  element={<ProtectedRoute><AddSales/></ProtectedRoute>}  />
      <Route path='top-five-sales' element={<ProtectedRoute ><Top5Sales/></ProtectedRoute>}  />
      <Route path='todays-revenue' element={<ProtectedRoute><TodaysRevenue/></ProtectedRoute>}  />
      <Route path='register' element={<Register/>}  />
      <Route path='login' element={<Login/>}  />
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
