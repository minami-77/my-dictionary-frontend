import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Link } from 'react-router'
import { Button } from "../ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserWord = {
  id: number
  note: string
  user: string
  status: number
  // shadcn's Data table receive flatten data only (no nest allowed)
  created_at: string
  updated_at: string
  spelling:string
  pronunciation:string
  definition:string
  example: string|null
  synonyms: string|null
  antonym: string|null
}

export const columns: ColumnDef<UserWord>[] = [
  {
    accessorKey: "spelling",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Word
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      const word = row.getValue("spelling")
      return <div className="text-left"><Link to = "/words">{word as string}</Link></div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({row}) => {
      return <div className="text-left">{row.getValue("note")}</div>
    }
  },
  {
    accessorKey: "definition",
    header: "Definition",
    cell: ({row}) => {
      return <div className="text-left">{row.getValue("definition")}</div>
    }
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({row}) => {
      const date = new Date(row.getValue("updated_at"))
      const month = date.getMonth();
      const day = date.getDay();
      const formattedDay = (month+1) + "/" + (day+1)
      return <div>{formattedDay}</div>
    }
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({row}) => {
      const date = new Date(row.getValue("created_at"))
      const month = date.getMonth();
      const day = date.getDay();
      const formattedDay = (month+1) + "/" + (day+1)
      return <div>{formattedDay}</div>
    }
  },


  // {
  //   accessorKey: "pronunciation",
  //   header: "Pronunciation",
  // },
  // {
  //   accessorKey: "part_of_speech",
  //   header: "Part_of_speech",
  // },
  // {
  //   accessorKey: "example",
  //   header: "Example",
  // },
]
