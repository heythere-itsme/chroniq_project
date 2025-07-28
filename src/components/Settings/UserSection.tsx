import { getUserDetails } from '@/lib/(fetchings)/fetch'
import Image from 'next/image'
import React from 'react'

const UserSection = async () => {
    const userData = await getUserDetails()
  return (
    <div className='flex items-center gap-10 bg-Secondary py-2 px-5 w-fit rounded-2xl'>
        <Image src={userData.avatar_url} width={120} height={120} alt='User Avatar' className='rounded-full border-r-Selected/60 border-l-Secondary border-4' />
        <div>
            <h3 className='font-semibold'>{userData.name}</h3>
            <h5>{userData.user_name}</h5>
            <h5>{userData.user_email}</h5>
        </div>

    </div>
  )
}

export default UserSection