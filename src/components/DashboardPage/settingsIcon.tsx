'use client'
import gsap from 'gsap'
import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

const SettingsIcon = () => {
    const router = useRouter()
    const iconRef = useRef(null)

    const handleEnter = () => {
        gsap.to(iconRef.current, {
            rotation: 180,
            duration: 0.5,
            ease: 'circ.in'
        })
    }
    const handleLeave = () => {
        gsap.to(iconRef.current, {
            rotation: 0,
            duration: 0.5,
            ease: 'circ.out'
        })
    }
    const handleClick = () => {
        router.push('/u/setting')
    }

  return (
    <Settings
    className='cursor-pointer'
    onMouseEnter={handleEnter}
    onMouseLeave={handleLeave}
     ref={iconRef}
     onClick={handleClick}
      />
  )
}

export default SettingsIcon