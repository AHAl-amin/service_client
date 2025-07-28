
import { Outlet } from 'react-router-dom'
import Navbar from '../Pages/Share/Navbar'
import Footer from '../Pages/Share/Footer'

const Main = () => {
  // const [selectedCountry, setSelectedCountry] = useState(null);
  // const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Main
