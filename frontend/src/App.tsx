import Layout from "./layout/Layout"
import { BrowserRouter,Routes,Route, } from "react-router-dom"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import { useAppContext } from "./contexts/Appcontext"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import Detail from "./pages/Detail"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"
import Home from "./pages/Home"


function App() {
  
const isLoggedIn=useAppContext()
  return (
    <>
      <BrowserRouter>
      

        <Routes>

          <Route path='/' element={<Layout><Home/></Layout>}>

          </Route>

          <Route path='/register' element={<Layout><Register/></Layout>}>

          </Route>

          <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>}/>

          {isLoggedIn && (<>
          
          <Route path="/add-hotel" element={<Layout>
            <AddHotel/>
          </Layout>}/> 
          <Route path="/hotel/:hotelId/booking" element={<Layout>
            <Booking/>
          </Layout>}/> 
          <Route path="/edit-hotel/:hotelId" element={<Layout>
            <EditHotel/>
          </Layout>}/> 
          <Route path="/my-hotels" element={<Layout>
            <MyHotels/>
          </Layout>}/> 
          <Route path="/my-bookings" element={<Layout>
            <MyBookings/>
          </Layout>}/> 
          </>
        )}
          
          <Route path="/search" element={<Layout><p><Search/></p></Layout>}>
          
          
          </Route>
          <Route path="/detail/:hotelId" element={<Layout><p><Detail/></p></Layout>}></Route>

        </Routes>
      
      
      </BrowserRouter>

    </>
  )
}

export default App
