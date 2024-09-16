import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Propertie from './pages/Propertie'
import About from './pages/About'
import Contact from './pages/Contact'
import Details from './pages/Details'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navebar'
import Footer from './pages/Footer'
import MyPropertie from './pages/MyPropertie'
import Interested from './pages/Interested'
import CreateProperty from './pages/CreateProperty'
import EditPropertyForm from './pages/EditPropertyForm '
import MapComponent from './pages/MapComponent'

function App() {
  return (
      <div className="px-0 ">
        <Navbar />
        <Routes>
          {/* Suggested code may be subject to a license. Learn more: ~LicenseLog:918669726. */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Propertie />} />
          <Route path="/myproperties" element={<MyPropertie />} />
          <Route path="/myinterest" element={<Interested />} />
          <Route path="/editproperty/:id" element={<EditPropertyForm />} />
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:id" Component={Details} />
          <Route path="/property/create" Component={CreateProperty} />
          <Route path="/map" Component={MapComponent} />
        </Routes>
        <Footer />
      </div>
  )
}

export default App;
