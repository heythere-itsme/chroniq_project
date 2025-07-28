"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ImagePlus } from "lucide-react"
import { useState } from "react"

export default function ImagePopoverButton({ editor }: { editor: any }) {
  const [url, setUrl] = useState("")
  const [open, setOpen] = useState(false)

  const insertImage = () => {
    if (!url) return
    editor.chain().focus().setImage({ src: url }).run()
    setUrl("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
          <ImagePlus className="w-5 h-5 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-2">
        <Input
          type="url"
          placeholder="Enter image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={insertImage} className="w-full bg-[hsl(120,20%,20%)] hover:bg-[hsl(120,20%,30%)] cursor-pointer">
          Insert Image
        </Button>
      </PopoverContent>
    </Popover>
  )
}
