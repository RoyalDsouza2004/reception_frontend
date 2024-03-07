import { Link, useNavigate} from "react-router-dom"
import '../../index.css';
import { useState } from "react";
import axios from 'axios';
import { server } from "../..";


const Register = () => {

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  async function submitHandler(){
    await axios.post(`${server}/api/v1/admin/register`,{
      name,
      id,
      email,
      password
    } ,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    } ).then((res)=>{
      if(res?.data?.success===true){
        navigate("/layout")
      }
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className='w-screen h-screen flex flex-row'>

      {/* <div className='w-[80%] max-h-full hidden lg:flex justify-evenly items-center bg-gray-200'>
        <SiLoop className="w-[200px] h-[200px] align-middle animate-spin text-red-500" />
        <p className="text-6xl font-bold">LinkLoop</p>
      </div> */}

      <div className='w-[60%] h-[100%] bg-red-5 flex-auto'>
        <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            {/* <SiLoop className="w-[40px] h-[40px] align-middle animate-spin text-red-500" /> */}

            <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-2 md:p-6 space-y-4 md:space-y-5 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Signup
                </h1>
                <p className='inline-block'>Existing user.&nbsp;</p>
                <Link to="/" className='font-semibold text-[#1A5ACC] hover:underline inline-block'>Login?</Link>

                <div className="space-y-4 md:space-y-6" >

                  <div>
                    <input type="text" name="id" id="id" className="auth-inputs" placeholder="Enter id" required="" value={id} onChange={(e) => { setId(e.target.value) }} />
                  </div>
                  <div>
                    <input type="text" name="name" id="name" className="auth-inputs" placeholder="Full name" required="" value={name} onChange={(e) => { setName(e.target.value) }} />
                  </div>

                  <div>
                    <input type="email" name="email" id="email" className="auth-inputs" placeholder="Email Address" required="" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                  </div>

                  <div>
                    <input type="password" name="password" id="password" placeholder="Enter Password" className="auth-inputs" required="" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                  </div>


                  <div className='items-center justify-center text-center'>
                    <button className="w-[50%] m-auto text-white bg-[#1A5ACC] font-medium rounded-md text-sm px-5 py-2.5 mt-3 text-center hover:shadow-lg flex flex-row justify-center" onClick={(e) => { submitHandler(e) }}>
                      {/* {
                        loading === false ? 'Signup' :
                          <> */}
                            {/* <div className='rounded-full border-t-[2px] border-white w-5 h-5  mr-5'></div> */}
                            Signup
                          {/* </> */}
                      {/* } */}
                    </button>
                  </div>

                  <div className='flex items-center'>
                    <hr className='w-[40%] mx-2' />
                    <p className='text-sm font-thin text-gray'>OR</p>
                    <hr className='w-[40%] mx-2' />
                  </div>

                  <div className='flex flex-row w-full justify-around'>
                    <img className='hover:shadow-md cursor-pointer' src={require("../../assets/Google.png")} alt="" />
                    <img className='hover:shadow-md cursor-pointer' src={require("../../assets/Linkedin.png")} alt="" />
                    <img className='hover:shadow-md cursor-pointer' src={require("../../assets/Facebook.png")} alt="" />
                    <img className='hover:shadow-md cursor-pointer' src={require("../../assets/Twitter X.png")} alt="" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Register
