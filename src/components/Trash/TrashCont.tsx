'use client'
import React from 'react'
import ButtonSection from './ButtonSection'
import ItemStack from './ItemStack'
import { useData } from '@/lib/(fetchings)/fetchClient';
import SheetContainer from '../task/SheetContainer';

const TrashCont = () => {
    const { data: tasks = [] } = useData({ table: "tasks", date: "end_date" });
    const { data: meet = [] } = useData({ table: "meetings", date: "date_time" });
    const { data: note = [] } = useData({ table: "notes", date: "updated_at" });
    const combined = [...tasks, ...meet, ...note];
    const filtered = combined.filter((task) => task.is_deleted);

  return (
    <div className="space-y-5 ml-5">
        <ButtonSection data={filtered}  />
        <ItemStack data={filtered} />
        <SheetContainer />
    </div>
  )
}

export default TrashCont