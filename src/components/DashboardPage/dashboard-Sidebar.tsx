import React from 'react'
import UserDetails from './user-details'
import DashButton from './dash-Button'
import { BellRing, Calendar, ClipboardList, ClockFading, Home, MessageSquare, Phone, StickyNote, Trash,} from 'lucide-react';
import Image from 'next/image';
import LogoutBut from './LogoutBut';

const DashboardSidebar = () => {

  const sidebarRows = [
    {
      name: 'Home',
      path: '/u/home',
      icon: <Home size={25}/>,
    },
    {
      name: 'Task',
      path: '/u/task',
      icon: <ClipboardList size={25}/>,
    },
    {
      name: 'Meeting',
      path: '/u/meeting',
      icon: <Phone size={25}/>,
    },
    {
      name: 'Notes',
      path: '/u/notes',
      icon: <StickyNote size={25}/>,
    },
    {
      name: 'Timer',
      path: '/u/pomodoro',
      icon: <ClockFading size={25}/>,
    },
    {
      name: 'Calender',
      path: '/u/calendar',
      icon: <Calendar size={25}/>,
    },
    {
      name: 'Notification',
      path: '/u/notification',
      icon: <BellRing size={25}/>,
    },
    {
      name: 'Friends',
      path: '/u/friends',
      icon: <MessageSquare size={25}/>,
    },
    {
      name: 'Trash',
      path: '/u/trash',
      icon: <Trash size={25}/>,
    },
  ]

  return (
    <div className='bg-Secondary h-screen rounded-r-[16px]'>
      <div className='w-fit px-3 py-5 h-fit'>
      <div className='sidebar'>
        <div className='flex gap-3 items-center absolute top-5'>
          <Image src={'/chroniq.svg'} width={55} height={55} alt='icon' className='relative top-2'/>
          <h2 className='font-bold'>ChroniQ</h2>
        </div>
        <div className='!mt-10'>
        {sidebarRows.map(({name, path, icon}) =>{
          return (
              <DashButton key={name} name={name} path={path} icon={icon}/>
          )
        })}
        </div>
        <UserDetails />
        <LogoutBut />
      </div>
      </div>
    </div>
  )
}

export default DashboardSidebar