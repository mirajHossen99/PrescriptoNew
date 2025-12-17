import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctor from '../components/RelatedDoctor';

const Appointment = () => {
  const {docId} = useParams();
  const { doctors, currencySymbol, assets } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState([]);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);

  }

  const getAvaiableSlots = async() => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for(let i=0; i<7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21,0,0,0);

      // setting hours
      if(today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }
      else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);

      }
      setDocSlots(prev => ([...prev, timeSlots]))

    }
  }

  useEffect(() => {
    fetchDocInfo();

  },[doctors, docId]);

  useEffect(() => {
    getAvaiableSlots();

  },[docInfo,]);

  useEffect(()=> {
    console.log(docSlots)
  }, [docSlots])

  return docInfo && (
    <div>
      {/* ------------- Doctor Details ------------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className=''>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="image" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* --------- Doc Info : name, degree, experience---------- */}
          <p className='flex items-center gap-2 text-2xl md:text-3xl font-medium text-gray-700'>
            {docInfo.name} 
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p className='text-base'>
              {docInfo.degree} - {docInfo.speciality}
              <button className='py-0.5 px-2 ml-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </p>
          </div>
          {/* ------ Doctor About ------- */}
          <div className='mt-3'>
            <p className='flex items-center gap-1 text-base font-medium text-gray-800'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-3'>Appointment fee: <span className='text-gray-800 text-lg'>{currencySymbol}{docInfo.fees}</span></p>

        </div>
      </div>

       {/* --------- Booking Slots ---------- */}
       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
          {
            docSlots.length && docSlots.map((slot, index)=>(
              <div
                 onClick={()=> setSlotIndex(index)}
                 className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                 key={index}>
                <p>{slot[0] && daysOfWeek[slot[0].datetime.getDay()]}</p>
                <p>{slot[0] && slot[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
         {docSlots.length && docSlots[slotIndex].map((slot, index)=> (
           <p 
             onClick={()=> setSlotTime(slot.time)}
             className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slot.time === slotTime ? 'bg-primary text-white' : 'text-gray-700 border border-gray-400'}`}
             key={index}>
             {slot.time.toLowerCase()}
           </p>
         ))}
       </div>
       <button className='bg-primary text-white flex items-center text-sm font-light px-14 py-3 rounded-full my-6 hover:bg-indigo-700 transition-all duration-200 gap-2'>
         <p>Book an appointment</p>
         <img className='w-3 ' src={assets.arrow_icon} alt="" />
       </button>
       </div>

       {/* ---------- Listing Related Doctors -------- */}

       <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment