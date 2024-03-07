import axios from 'axios'
import React, { useState } from 'react'
import { server } from '../..'

const Addvisitor = ({setShowModal,fetchDetails}) => {

      const [staffId,setStaffId]=useState("")
      const [name,setName]=useState("")
      const [email,setEmail]=useState("")
      const [phone,setPhone]=useState("")
      const [purpose,setPurpose]=useState("")

      async function handleSubmit(){
            await axios.post(`${server}/api/v1/insert/add-visitor`,{
                  staffId,name,email,phone,purpose
            },{
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }).then((res)=>{
                  if(res?.data?.success===true){
                        fetchDetails()
                  }
                  console.log(res)
            }).catch((error)=>{
                  console.log(error)
            })
            setShowModal(false)
      }
  return (
    <>
       <form className=" p-2 max-w-md mx-auto border-[1px] border-gray sha min-w-500">
      <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="floating_email" id="floating_email" className=" text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none " placeholder=" " required value={staffId} onChange={(e)=>{
            setStaffId(e.target.value)
          }}/>
          <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ID</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none " placeholder=" " required value={name} onChange={(e)=>{
            setName(e.target.value)
          }}/>
          <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none" placeholder=" " required value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
          <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div>

          <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none" placeholder=" " required value={phone} onChange={(e)=>{
                  setPhone(e.target.value)
              }}/>
              <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          </div>

      <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none" placeholder=" " required value={purpose} onChange={(e)=>{
            setPurpose(e.target.value)
              }}/>
              <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Purpose</label>
          </div>
          
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{
        handleSubmit()
      }}>Submit</button>
  </form>
    </>
  )
}

export default Addvisitor