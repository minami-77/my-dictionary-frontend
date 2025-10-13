import { useState } from "react";
import axios from "axios";

export default function SaveWord(searchedResults) {
  const [message, setMessage] = useState("");

  // Save the searched word to the user's wordbook
  // Only if the user is logged in (i.e., there's a token in localStorage)
  // and there's a searched word

  const wordToSave = async(searchedResults) => {

    if (!searchedResults || !localStorage.getItem("token")){
      return;
    }

    try {
      // Take out the JWT token
      const token = localStorage.getItem("token");
      // Axios
      const req = await axios.post("http://localhost:3001/api/v1/words",{
        // pass the whole searchedResults object to rails
        word_data: searchedResults
      },{
        // pass the token in the header(use Authorization key)
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("✅ Word saved to your wordbook!");
      console.log(req.data);

    } catch (error) {
      setMessage("❌ Error saving word");
      console.error("Error saving word", error.response?.data || error.message);
      return;
    }
  }

  return (
  <>
    <div>
      {searchedResults && localStorage.getItem("token") &&
        <button onClick={()=>wordToSave(searchedResults)}>Save this word</button>
      }
      {!localStorage.getItem("token") &&
        <p>Login to save words</p>
      }
      {message && <p>{message}</p>}
    </div>
  </>

  )
}
