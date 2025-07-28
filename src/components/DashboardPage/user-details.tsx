import { getUserDetails } from '@/lib/(fetchings)/fetch';
import Image from 'next/image';
import SettingsIcon from './settingsIcon';

const UserDetails = async () => {
  
  const userData = await getUserDetails();
  
  return (
    <div className='flex items-center justify-between bg-primary-accent gap-3 px-3 py-1 rounded-[8px]'>
      <Image src={userData.avatar_url} width={25} height={25} alt='pfp' className='rounded-full object-cover'/>
      <div>
        <h4>{userData.name}</h4>
        <h5>{userData.user_name}</h5>
      </div>
      <SettingsIcon
       />
    </div>
  )
}

export default UserDetails