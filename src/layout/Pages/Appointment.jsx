import React, { useEffect, useState } from 'react';
import { server } from '../..';
import axios from 'axios';
import AddAppointment from '../components/AddAppointment';
import { formatDate } from '../../utils/timeFunctions';
const Appointment = () => {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)

  async function fetchDetails() {
    await axios.get(`${server}/api/v1/view/appointmentDetails` , {
      withCredentials: true,
    }).then((res) => {
      if (res?.data?.success === true) {
        setData(res?.data?.appointments)
      }
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }


  async function approveAppointment(id,value){
    
    await axios.patch(`${server}/api/v1/data/approval/${id}`,{approval:value}).then((res)=>{
      if(res?.data?.success===true){
        fetchDetails()
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    fetchDetails()
  }, [])


  return (
    <div className='px-8 pt-5'>
      <p className='uppercase font-semibold text-xl'>Appointment</p>

      {
        showModal === true ?
          <AddAppointment setShowModal={setShowModal} fetchDetails={fetchDetails} />
          : <>
            <button className='py-2 px-3 border-[1px] border-green-600 text-green-600 rounded-md my-4 text-sm font-semibold flex justify-center items-center hover:bg-green-500 hover:text-white shadow-md' onClick={() => {
              setShowModal(true)
            }}>Add Appointment</button>

            <>
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-[1px] border-gray-300 rounded-md">
                        <thead>
                          <tr>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Appointment_ID</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Visitor_Name</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Visitor_Email</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Approved_on</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Appointment_Date_Time</th>
                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Appointment_Status</th>
                            <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            data?.map((ele, index) => {
                              return <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Appointment_ID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ele?.Visitor_Name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Visitor_Email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Approved_on}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{formatDate(ele?.Appointment_Date_Time)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Appointment_Status}</td>
                                {
                                  ele?.Appointment_Status === "Approved" ?
                                  <td class="px-6 py-4">
                                  <a href="#" class="font-medium text-green-600 dark:text-green-500 hover:underline" onClick={()=>{
                                    
                                  }}></a>
                                </td>
                                  : <td class="px-6 py-4">
                                  <button class="font-medium text-green-600 dark:text-green-500 hover:underline" onClick={()=>{
                                    approveAppointment(ele?.Appointment_ID, true)
                                  }}>Approve</button>
                                   <button class="font-medium text-red-600 dark:text-red-500 hover:underline ml-3" onClick={()=>{
                                    approveAppointment(ele?.Appointment_ID , false)
                                  }}>Cancel</button>
                                </td>
                                }
                              </tr>
                            })

                          }

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>


            </>
          </>
      }
    </div>
  )
}

export default Appointment;

