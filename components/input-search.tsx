"use client"

import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "./ui/button"

interface InputSearchProps extends React.ComponentProps<"input"> {
  onSubmit?: () => void
}

export function InputSearch({ onSubmit, ...props }: InputSearchProps) {
  return (
    <InputGroup className="h-11 rounded-xl pl-2">
      <InputGroupInput
        id="search"
        placeholder="Search books by title, author, or keyword..."
        className="text-sm"
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <Button
          onClick={onSubmit}
          size="icon"
          className="rounded-full"
          variant="secondary"
        >
          <Search size={16} />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
