import {Link} from 'react-router-dom'
import { useAppContext } from '../contexts/Appcontext'
import SignOut from './SignOut'

const Header = () => {
  const {isLoggedIn}=useAppContext()
  console.log(isLoggedIn)
  
  return (
    <div className="bg-blue-400 py-6">

            <div className="container mx-auto  flex justify-between">
                       <span className='text-white text-3xl  font-bold'><Link to='/'>Summer Holidays</Link></span>
                       <span className='flex space-x-2 '>
                        {isLoggedIn?(<>
                        <Link to='/my-bookings' className='flex items-center px-3 rounded-md font-bold text-white hover:bg-black'>My Bookings</Link>
                        <Link to='/my-hotels' className='flex items-center px-3 rounded-md font-bold text-white hover:bg-black'>My Hotels</Link>
                       <SignOut/>
                        </>): 
                         (<Link to='/sign-in' className='flex items-center px-3 font-bold text-white bg-black rounded-md hover:bg-transparent hover:text-black'>Sign In</Link>)
                        }
                         </span>

                        
            </div>
    </div>
  )
}

export default Header