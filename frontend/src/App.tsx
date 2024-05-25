import Layout from "./layout/Layout"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"

function App() {
  

  return (
    <>
      <BrowserRouter>
      

        <Routes>

          <Route path='/' element={<Layout><p>Home page</p></Layout>}>

          </Route>

          <Route path='/register' element={<Layout><Register/></Layout>}>

          </Route>

          <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>}/>
          <Route path="/search" element={<Layout><p>Search page</p></Layout>}>
          
          </Route>

        </Routes>
      
      
      </BrowserRouter>

    </>
  )
}

export default App
