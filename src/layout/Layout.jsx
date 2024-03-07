import React, { useEffect, useRef, useState} from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { GoSidebarCollapse } from "react-icons/go";
import { data } from './data/sidebarData';
import { MdAdminPanelSettings } from "react-icons/md";
import axios from 'axios';
import { server } from '..';


const Layout = () => {

  const [userName, setUserName] = useState('')

  const navigate = useNavigate()

  const [openSideBar, setOpenSideBar] = useState(false)

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {

      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSideBar(false)

      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  useEffect(() => {
    axios
      .get(`${server}/api/v1/admin/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserName(res?.data?.user?.Name);
        
      })
      .catch((error) => {
        setUserName('');
      });
      // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className='w-screen h-screen flex flex-row relative'>
        {
          openSideBar === true ?
            <div ref={sidebarRef} className='absolute w-[65%] md:hidden h-screen flex flex-col bg-[#253245] text-white z-100 border-r-[1px] border-gray-200 '>
              <div className='py-6 border-b-[1px] border-gray-200 flex flex-row justify-center items-center' >
                <MdAdminPanelSettings className='text-3xl' />
                <p className=' font-semi mr-5 text-xl'>Welcome, {userName}</p>
              </div>
              {
                data.map((ele, index) => {
                  return <div key={index} className='py-4 pl-5 border-b-[1px] border-gray-200 flex flex-row justify-left items-center hover:cursor-pointer hover:bg-white hover:text-black' onClick={() => {
                    navigate(ele.url)
                    setOpenSideBar(false)
                  }}>
                    {ele.icon}
                    <p className='ml-5'>{ele.name}</p>
                  </div>
                })
              }
              
            </div>
            : null
        }
        <div className='w-[18%] h-full hidden md:flex flex-col text-white bg-[#253245]'>
          <div className='py-6 border-b-[1px] border-gray-200 flex flex-row justify-center items-center' >
            <MdAdminPanelSettings className='text-3xl' />
            <p className=' font-semi mr-5 text-md'>Welcome, {userName}</p>
          </div>
          {
            data.map((ele, index) => {
              return <div key={index} className='py-4 pl-5 border-b-[1px] border-gray-200 flex flex-row justify-left items-center hover:cursor-pointer hover:bg-white hover:text-black' onClick={() => {
                navigate(ele.url)
              }}>
                {ele.icon}
                <p className='ml-5'>{ele.name}</p>
              </div>
            })
          }
        </div>
        <div className='flex-1 h-full bg-red-00'>
          <GoSidebarCollapse className='md:hidden ml-8 mt-2 text-xl hover:cursor-pointer hover:shadow-md' onClick={() => {
            setOpenSideBar(!openSideBar)
          }} />
          <Outlet />
        </div>
      </div >
    </>
  )
}

export default Layout
