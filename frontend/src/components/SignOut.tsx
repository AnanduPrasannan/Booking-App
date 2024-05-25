import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../api-clients'
import { useAppContext } from "../contexts/Appcontext"

const SignOut = () => {
    const {showToast}=useAppContext()
    const queryClient=useQueryClient()
    
    const mutation=useMutation(apiClient.signOut,{
        onSuccess:async ()=>{
            await queryClient.invalidateQueries('validateToken')
            showToast({message:"Logged out succesfully",type:"SUCCESS"})
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:'ERROR'})
        }
    })

    const handleClick=()=>{
        mutation.mutate()
    }
  return (
    <>
    <button className='flex items-center px-3 font-bold text-white rounded-md hover:bg-blue-900' onClick={handleClick}>SignOut</button>
    </>
  )
}

export default SignOut