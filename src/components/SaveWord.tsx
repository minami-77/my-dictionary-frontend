import { useState } from "react";
import axios from "axios";
// shadcn-ui
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


export default function SaveWord(searchedResults: any) {
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");

  // Save the searched word to the user's wordbook
  // Only if the user is logged in (i.e., there's a token in localStorage)
  // and there's a searched word

  const wordToSave = async(searchedResults: any) => {

    if (!searchedResults || !localStorage.getItem("token")){
      return;
    }

    try {
      // Take out the JWT token
      const token = localStorage.getItem("token");
      // Axios
      const req = await axios.post("http://localhost:3001/api/v1/words",{
        // pass the whole searchedResults object to rails
        word_data: searchedResults,
        note: note
      },{
        // pass the token in the header(use Authorization key)
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("✅ Word saved to your wordbook!");
      console.log(req.data);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error saving word", error.response?.data || error.message);
      } else {
        console.error("Error saving word", error);
      }
      setMessage("❌ Error saving word");
      return;
    }
  }

  return (
  <>
    <div>
      {searchedResults && localStorage.getItem("token") &&
        // <button onClick={()=>wordToSave(searchedResults)}>Save this word</button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Save this word</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Note to the Word</DialogTitle>
              <DialogDescription>
                You can add notes here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">

                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Type your notes here."
                  className="col-span-4"
                />

              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={()=>wordToSave(searchedResults)}>
                  Save
                </Button>
              </DialogClose>

            </DialogFooter>
          </DialogContent>
        </Dialog>
      }

      {!localStorage.getItem("token") &&
        <p>Login to save words</p>
      }

      {message && <p>{message}</p>}

    </div>

  </>
  )
}
