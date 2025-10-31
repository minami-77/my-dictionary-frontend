import axios from 'axios'
import { useState, useEffect } from 'react'
// for data table
import { columns, type UserWord } from "./columns"
import { DataTable } from "./data-table"

export default function UserWord() {
  // Define TypeScript types for the API response
  type UserWords = UserWord[];
  const [userWords, setUserWords] = useState<UserWords|null>(null);
  const [error, setError] = useState("");

  // On component mount, fetch user's words
  useEffect(() => {
    // 1. Define the async function inside useEffect
    const fetchUserWords = async () => {

      // Take out the JWT token on mount
      const token = localStorage.getItem("token");
      // if no token, return
      if(!token){
        setError("No token found. Please log in.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:3001/api/v1/user_words",{
          headers: {
            Authorization: `Bearer ${token}` ,
          }
        });
        setUserWords(res.data.data);
        console.log(res.data);
        console.log(res.data.data);
      } catch (error) {
        // AxiosError or unknown error
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Error fetching user's words");
          console.error("Error fetching user's words", error.response?.data || error.message);
        } else {
          setError("Unknown error occurred");
          console.error("Error fetching user's words", error);
        }
      }
    }

    // 2. Call the async function
    fetchUserWords();
  }, []);


  return (
    <>
      <div>List of User's Words</div>
        {error && <p>{error}</p>}

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={userWords ?? []} />
      </div>

    </>
  )

}
