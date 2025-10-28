import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserWord = {
  id: number
  user: string
  word: string
  note: string
  pronunciation:string
  definition:string
  example: string|null
  synonyms: [string]|null
  antonym: [string]|null
}

export const columns: ColumnDef<UserWord>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "word",
    header: "Word",
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
  {
    accessorKey: "synonyms",
    header: "Synonyms",
  },
  {
    accessorKey: "antonyms",
    header: "Antonyms",
  },
]
