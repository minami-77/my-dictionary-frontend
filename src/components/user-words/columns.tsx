import type { ColumnDef } from "@tanstack/react-table"

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
    header: "Word",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "definition",
    header: "Definition",
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
  },
  {
    accessorKey: "created_at",
    header: "Created",
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
