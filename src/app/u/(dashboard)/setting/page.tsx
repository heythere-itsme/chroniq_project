import SettingCont from '@/components/Settings/SettingCont'
import UserSection from '@/components/Settings/UserSection'
import React from 'react'

const SettingsPage = () => {

  return (
    <div className="mx-5 px-4 rounded-[10px] w-[1300px]">
      <div className="flex items-center justify-between pb-4 pt-2">
        <h2 className="font-semibold">Profile Settings</h2>
      </div>
        <div className='ml-5'>
            <UserSection />
            <SettingCont />
        </div>      
    </div>
  )
}

export default SettingsPage