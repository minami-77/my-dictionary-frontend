import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserWord = {
  id: number
  note: string
  user: string
  // shadcn's Data table receive flatten data only (no nest allowed)
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
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "pronunciation",
    header: "Pronunciation",
  },
  {
    accessorKey: "part_of_speech",
    header: "Part_of_speech",
  },
  {
    accessorKey: "definition",
    header: "Definition",
  },
  {
    accessorKey: "example",
    header: "Example",
  },
]
