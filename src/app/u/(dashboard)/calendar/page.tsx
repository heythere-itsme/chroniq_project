import Calendar from '@/components/Calendar/Calendar'
import React from 'react'

const WorldPage = () => {
  return (
    <div className='mx-5 px-4 rounded-[10px] w-[1300px]'>
      <div className='flex items-center justify-between pb-4 pt-2'>
        <h2 className='font-semibold'>Calendar</h2>
      </div>
      <div>
          <Calendar />
        </div>
    </div>
  )
}

export default WorldPage