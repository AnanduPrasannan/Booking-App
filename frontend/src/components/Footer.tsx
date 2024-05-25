import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-blue-400">
       <div className="container mx-auto py-10 flex justify-between  ">
                       <span className='text-white text-3xl  font-bold'><Link to='/'>Home stay</Link></span>
                       <span className='flex space-x-2 '><Link to='/signup' className='text-white flex items-center text-sm font-mono px-3'>Privacy policy</Link></span>
                       <span className='flex space-x-2 '><Link to='/signup' className='text-white flex items-center text-sm font-mono px-3'>Terms of service</Link></span>
            </div>
    </div>
  )
}

export default Footer