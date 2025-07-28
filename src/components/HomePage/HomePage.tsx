import React from 'react'
import HomeCard from './HomeCard'
import Header from './Header'

const HomePage = () => {
  return (
    <div>
        <Header />
        <div className='space-y-3'>
        <HomeCard type='task' />
        <HomeCard type='meeting' />
        </div>
        
    </div>
  )
}

export default HomePage