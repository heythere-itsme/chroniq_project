import HomePage from '@/components/HomePage/HomePage'
import React from 'react'

const HomeLayout = () => {
  return (
    <div className="mx-5 px-4 rounded-[10px] w-[1150px]">
      <div className="flex items-center justify-between pb-4 pt-2">
        <h2 className="font-semibold">Home</h2>
    </div>
    <HomePage />
    </div>

  )
}

export default HomeLayout