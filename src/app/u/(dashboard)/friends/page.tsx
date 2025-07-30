import ChatArea from '@/components/Friends/ChatArea'
import Sidebar from '@/components/Friends/Sidebar'
import React from 'react'

const FriendsPage = () => {
  return (
    <div className='mx-5 px-4 rounded-[10px] w-[1300px] flex items-center gap-2 my-5 justify-between'>
      <Sidebar />
      <ChatArea />
    </div>
  )
}

export default FriendsPage