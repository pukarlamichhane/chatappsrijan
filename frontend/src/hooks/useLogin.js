import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
 
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const login = async (username, password) => {
        setLoading(true)
        try{
            const res = await fetch("/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user", JSON.stringify({username, password}))
            setAuthUser(data)

        }catch(error){
            toast.error(error.message)

        }finally{
            setLoading(false)
        }

       
    }
    return {loading, login}

}

export default useLogin
