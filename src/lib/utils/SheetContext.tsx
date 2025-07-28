// lib/store/sheet-store.ts
import { create } from 'zustand'

type SheetType = 'task' | 'meeting' | 'note' | 'calendar' | "user" | null

type SheetStore = {
  type: SheetType
  isOpen: boolean
  data?: any
  openSheet: (type: SheetType, data?: any) => void
  closeSheet: () => void
}

export const useSheetStore = create<SheetStore>((set) => ({
  type: null,
  isOpen: false,
  data: null,
  openSheet: (type, data = null) =>
    set({
      type,
      isOpen: true,
      data
    }),
  closeSheet: () =>
    set({
      type: null,
      isOpen: false,
      data: null
    })
}))
