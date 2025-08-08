import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login.jsx'
import Dashboard from '../components/Dashboard.jsx'

const Signup = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [mobile,setMobile] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res =await fetch("http://localhost:5000/api/auth/signup",{
                method : 'POST',
                headers : {"Content-type":"application/json"},
                body : JSON.stringify({name,email,mobile,password})
            })
            localStorage.setItem("token",res.data.token)
            const data = await res.json()
            if(res.ok){
                alert("Signup successfull")
                console.log(data)
            }
            navigate("/dashboard")
        }
        catch(error){
            console.log(error)
            alert("Signup failed in client")
        }
    }


  return (
    <div className="flex justify-center items-center flex-col mt-[100px] text-xl ml-[530px]  shadow-2xl h-[500px] w-[300px]">
        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col ">
            <h2 className="text-3xl font-bold mb-10">SignUp</h2>
            <input
                type='text'
                value={name}
                placeholder='Enter your name'
                onChange={(e)=>setName(e.target.value)}
                className="border-2 rounded-lg text-[#003D16] border-[#003d16]  bg-transparent mb-5"
            />
            <input
                type='email'
                value={email}
                placeholder='Enter your email'
                onChange={(e)=>setEmail(e.target.value)}
                className="border-2 rounded-lg text-[#003D16] border-[#003d16]  bg-transparent mb-5"
            />
            <input
                type='text'
                value={mobile}
                placeholder='Enter your Phone number'
                onChange={(e)=>setMobile(e.target.value)}
                maxLength={10}
                className="border-2 rounded-lg text-[#003D16] border-[#003d16]  bg-transparent mb-5"
            />
            <input
                type='password'
                value={password}
                placeholder='Enter your password'
                onChange={(e)=>setPassword(e.target.value)}
                className="border-2 rounded-lg text-[#003D16] border-[#003d16]  bg-transparent mb-5"
            />
            <button type='submit' className="mt-6  hover:cursor-pointer rounded-lg bg-[#268740] text-[#FFFF] h-11 w-24 mb-5">Signup</button>
            <p>
                Already an User?
                <Link to="/login" className='flex justify-center items-center text-[#003D16]'>Login here</Link>
            </p>
        </form>
    </div>
  )
}

export default Signup