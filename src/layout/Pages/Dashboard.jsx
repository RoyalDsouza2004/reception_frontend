import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import axios from 'axios';
import { server } from '../../index.js';
import toast from 'react-hot-toast';
ChartJS.register(...registerables);


const Dashboard = () => {
  const [values, setValues] = useState([]);
  const [visitorCounts, setVisitorCounts] = useState([]);
  const [pendingVisitors, setPendingVisitors] = useState(0);
  const [approvedVisitors, setApprovedVisitors] = useState(0);

  useEffect(() => {
    axios.get(`${server}/api/v1/data/count`, {
      withCredentials: true,
    })
      .then((res) => {
        setValues(res.data.results[0]);
        console.log(res?.data?.results)
        setApprovedVisitors(res?.data?.results[0]?.Total_Appointments?.Approved)
        setPendingVisitors(res?.data?.results[0]?.Total_Appointments?.Pending)
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, []);

  console.log(values);

  useEffect(() => {
    axios.get(`${server}/api/v1/data/visitor-count`, {
      withCredentials: true,
    })
      .then((res) => {
        setVisitorCounts(res.data.visitorCount);

      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, []);


  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Visitors',
        data: visitorCounts,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };


  const options = {
    scales: {
      x: {
        type: 'category',
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      },
      y: {
        beginAtZero: true,
      },
    },
  };



  const bdata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Visitors',
        data: visitorCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };


  const boptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    
    <div className='px-8 pt-5 w-full h-full'>
      <p className='uppercase font-semibold text-xl'>Dashboard</p>
      <div className='flex md:flex-row flex-col h-3/4 md:h-56 bg-red-20 justify-around items-center'>
        <div className='border-[1px] bg-blue-50 rounded-md border-blue-700  w-[90%] md:w-[20%] h-[60%] mt-5 shadow-md hover:cursor-pointer text-lg flex flex-col items-center justify-center'>
          <p className='w-full text-center font-semibold text-4xl my-2'>{values.visitors_this_month}</p>
          <p className='w-full text-center font-semibold text-sm text-gray-600'>Visitor this month</p>
          
        </div>
        <div className='border-[1px] bg-orange-50 rounded-md border-orange-700  w-[90%] md:w-[20%] h-[60%] mt-5 shadow-md hover:cursor-pointer flex flex-col items-center justify-center'>
        <p className='w-full text-center font-semibold text-4xl my-2'>{values.Total_Staff_Count}</p>
          <p className='w-full text-center font-semibold text-sm text-gray-600'>Total Staff</p>
          
        </div>
        <div className='border-[1px] bg-green-50 rounded-md border-green-700  w-[90%] md:w-[20%] h-[60%] mt-5 shadow-md hover:cursor-pointer flex flex-col items-center justify-center'>
        <p className='w-full text-center font-semibold text-4xl my-2'>{pendingVisitors==null?0:pendingVisitors}</p>
          <p className='w-full text-center font-semibold text-sm text-gray-600'>Pending Appointment</p>
        
        </div>
        <div className='border-[1px] bg-red-50 rounded-md border-red-300  w-[90%] md:w-[20%] h-[60%] mt-5 shadow-md hover:cursor-pointer flex flex-col items-center justify-center'>
        <p className='w-full text-center font-semibold text-4xl my-2'>{approvedVisitors}</p>
          <p className='w-full text-center font-semibold text-sm text-gray-600'>Approved Appointment</p>
          
        </div>
      </div>

      <div className='w-full h-1/2 flex md:flex-row flex-col justify-evenly'>
        <div className='md:w-[46%] w-[100%] h-full mt-20 md:mt-10'>
          <Line data={data} options={options} />
        </div>
        <div className='md:w-[45%] w-[100%] h-full mt-10'>
          <Bar data={bdata} options={boptions} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
