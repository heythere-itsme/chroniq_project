import DashboardSidebar from '@/components/DashboardPage/dashboard-Sidebar';
import RightSection from '@/components/DashboardPage/RightSection';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "ChroniQ",
  description: "Your Goto Task Management App",
};

const DashBoardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='bg-primary-dark w-full h-screen flex justify-between'>
      <DashboardSidebar />
      <section className='w-auto'>
        {children}
        </section>
        <RightSection />
    </div>
  )
}

export default DashBoardLayout