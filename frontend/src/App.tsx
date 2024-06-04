import Layout from "./layout/Layout"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import { useAppContext } from "./contexts/Appcontext"
import MyHotels from "./pages/MyHotels"

function App() {
  
const isLoggedIn=useAppContext()
  return (
    <>
      <BrowserRouter>
      

        <Routes>

          <Route path='/' element={<Layout><p>Home page</p></Layout>}>

          </Route>

          <Route path='/register' element={<Layout><Register/></Layout>}>

          </Route>

          <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>}/>

          {isLoggedIn && (<>
          
          <Route path="/add-hotel" element={<Layout>
            <AddHotel/>
          </Layout>}/> 
          <Route path="/my-hotels" element={<Layout>
            <MyHotels/>
          </Layout>}/> 
          </>
        )}
          
          <Route path="/search" element={<Layout><p>Search page</p></Layout>}>
          
          </Route>

        </Routes>
      
      
      </BrowserRouter>

    </>
  )
}

export default App
