import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";


const WordsDetails = () => {
  type WordDetails ={
    user_word_id: number
    note: string
    user: string
    status: number
    created_at: string
    updated_at: string
    word:{
      spelling:string
      pronunciation:string
      part_of_speeches:{
        part_of_speech: string
        definitions:{
          definition:string
          example: string|null
          synonyms: string|null
          antonym: string|null
        }
      }
    }
  }

  const {word}= useParams();
  const [wordDetails, setWordDetails] = useState<WordDetails|null>(null);
  const [error, setError] = useState("");

 // On component mount, fetch user's words
  useEffect(() => {
    const fetchWordDetails = async() => {
      // Take out the JWT token on mount
      const token = localStorage.getItem("token");
      // if no token, return
      if(!token){
        setError("No token found. Please log in.");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3001/api/v1/user_words/${word}`,{
          headers:{
                Authorization: `Bearer ${token}` ,
              }
        });
        setWordDetails(res.data.data);
        console.log(res.data)

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

    fetchWordDetails();
  },[])

  return (
    <div>
      <h2>Details of the word</h2>
      <h2>{word}</h2>
      <h2>{wordDetails?.created_at}</h2>

    </div>
  );
};

export default WordsDetails;
