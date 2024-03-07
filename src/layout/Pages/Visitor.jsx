import React, { useEffect, useState } from 'react';
import Addvisitor from '../components/Addvisitor';
import axios from 'axios';
import { server } from '../../index';


const Visitor = () => {
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState(null)

    async function fetchDetails() {
        await axios.get(`${server}/api/v1/view/visitorDetails`,{
            withCredentials: true,
          }).then((res) => {
            if (res?.data?.success === true) {
                setData(res?.data?.visitors)
            }
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchDetails()
    },[])

    return (
        <div className='px-8 pt-5 '>
            <p className='uppercase font-semibold text-xl'>Visitor</p>
            {
                showModal === true ?
                    <Addvisitor setShowModal={setShowModal} fetchDetails={fetchDetails} />
                    : <>
                        <button className='py-2 px-3 border-[1px] border-green-600 text-green-600 rounded-md my-4 text-sm font-semibold flex justify-center items-center hover:bg-green-500 hover:text-white shadow-md' onClick={() => {
                            setShowModal(true)
                        }}>Add Visitor</button>

                        <>
                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-[1px] border-gray-300 rounded-md">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">VisitorID</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone no</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Purpose</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Appointmet Present</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Waiting Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data?.map((ele, index) => {
                                                            return <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Visitor_ID}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{ele?.Name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Phone_Number}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Purpose}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Appointment_Present}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{ele?.Waiting_Time} minutes</td>
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

export default Visitor
