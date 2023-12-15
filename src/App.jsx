import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainLogin from './components/Log/MainLogin'
import Login from './components/Log/Login'
import IndexPaginaPrincipal from './components/Paginaprincipal/IndexPaginaPrincipal'
import { Pantalla1 } from './components/Pantalla1/Pantalla1'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<IndexPaginaPrincipal/>}></Route>
        <Route path="/register" element={<MainLogin />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/pantalla1" element={<Pantalla1/>}></Route>
      </Routes>
    </>
  )
}

export default App;
