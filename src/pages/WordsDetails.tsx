import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";



const WordsDetails = () => {
  type WordDetails ={
    user_word_id: number
    note: string
    user: string
    status: number
    pronunciation:string
    created_at: string
    updated_at: string
    spelling:string
    part_of_speeches:{
      part_of_speech: string,
      definitions:{
        definition:string|null,
        example: string|null,
        synonyms: string[]|null,
        antonyms: string[]|null
      }[]
    }[]
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
    <>
      <div>
        <p>Details of the word</p>
        <h1>{word}</h1>
        <p>{wordDetails?.pronunciation}</p>
        <p>{wordDetails?.status}</p>
        <p>{wordDetails?.note}</p>
        <p>{wordDetails?.created_at}</p>
        <p>{wordDetails?.updated_at}</p>
        {wordDetails?.part_of_speeches &&
              wordDetails.part_of_speeches.map((pos,i)=>(
                // wrapper needed (Each .map() returns a single parent element.)
                <div key={i}>
                  <h1>{pos.part_of_speech}</h1>
                  <ol>
                    {pos.definitions.map((defn,j)=>(
                      // wrapper needed (Each .map() returns a single parent element.)
                      <li key={j}>
                        <div>{defn.definition}</div>
                        <div>{defn.example&& defn.example}</div>
                        <div>{defn.synonyms&& defn.synonyms.join(", ")}</div>
                        <div>{defn.antonyms&& defn.antonyms.join(", ")}</div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))
        }
      </div>
      <div>
        <Button>Back</Button>
      </div>
    </>
  );
};

export default WordsDetails;
