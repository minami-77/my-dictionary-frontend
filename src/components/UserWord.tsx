import axios from 'axios'
import { useState, useEffect } from 'react'

export default function UserWord() {
  // Define TypeScript types for the API response
  type UserWords = [...UserWord[]];
  type UserWord = {
    word: {
      spelling: string;
      pronunciation: string;
      language: string;
      note: string;
      created_at: string;
      updated_at: string;
    };
  };

  const [userWords, setUserWords] = useState<UserWords|null>(null);
  const [token, setToken] = useState<string|null>("");
  const [error, setError] = useState("");


   // Take out the JWT token on mount
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  // Fetch user's saved words from backend
  const fetchUserWords = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/user_words",{
        headers: {
          Authorization: `Bearer ${token}` ,
        }
      });
      console.log(res.data);
      console.log(res.data.data);
      setUserWords(res.data.data);

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

  // useEffect(()=>{
  //   fetchUserWords();
  // },[])


  return (
    <>
      <div>List of User's Words</div>
      {/* retrieve only titles */}
      <button onClick={fetchUserWords}>Your Words</button>
      {error && <p>{error}</p>}
      <ul>
        {
          userWords && userWords.map((item:UserWord, index:number)=>(
            <li key={index}>{item.word.spelling}</li>
          ))
        }
      </ul>

    </>
  )

}
