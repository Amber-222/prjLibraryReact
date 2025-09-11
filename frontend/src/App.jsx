//calling in required imports tp handle routing between multiple pages
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Dashboard from './pages/dashboard.jsx'
import Login from './pages/login.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'

function App() {
  return (
    //the router is main thing that handles our routing needs
    //need to specfify that there is multiple pages
    //home page sits at main hence a single slash
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
