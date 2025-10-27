import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserWord = {
  id: number
  user_id: number
  word_id: number
  note: string
  created_at: string
}

export const columns: ColumnDef<UserWord>[] = [
  {
    accessorKey: "user-id",
    header: "User-id",
  },
  {
    accessorKey: "word-id",
    header: "Word-id",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "created_at",
    header: "Added Date",
  },
]
