import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router";



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
  const navigate = useNavigate();
  const [createdDate, setCreatedDate] = useState<string>("")
  const [updatedDate, setUpdatedDate] = useState("")


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

        // 文字列をDateオブジェクトに変換
        const createdAt = new Date(res.data.data.created_at);
        const updatedAt = new Date(res.data.data.updated_at);

        let c_day=createdAt.getDate();
        let c_month=createdAt.getMonth();
        let c_date=`${c_month+1}/${c_day}`
        let u_day=updatedAt.getDate();
        let u_month=updatedAt.getMonth();
        let u_date=`${u_month+1}/${u_day}`
        setCreatedDate(c_date);
        setUpdatedDate(u_date);

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

  const clickBack = () => {
    navigate(-1);
  }

  return (
    <>
      <div>
        <p>Details of the word</p>
        <div className="p-4 text-3xl">
          <p><strong>{word}</strong></p>
          <p><small>{wordDetails?.pronunciation}</small></p>
        </div>

        <p>Status:{wordDetails?.status}</p>
        <p>Note:{wordDetails?.note}</p>
        <p>Created:{createdDate}</p>
        <p>Updated:{updatedDate}</p>

        {/* <p>{wordDetails?.updated_at}</p> */}
        <br/>

        {wordDetails?.part_of_speeches &&
              wordDetails.part_of_speeches.map((pos,i)=>(
                // wrapper needed (Each .map() returns a single parent element.)
                <div key={i} className="text-left">
                  <div className="text-2xl">
                    <p><strong>{pos.part_of_speech}</strong></p>
                  </div>
                  <ol>
                    {pos.definitions.map((defn,j)=>(
                      // wrapper needed (Each .map() returns a single parent element.)
                      <li key={j}>
                        <p><strong>{j + 1}. </strong>{defn.definition}</p>
                        <p>{defn.example&& defn.example}</p>
                        <p>{defn.synonyms&& defn.synonyms.join(", ")}</p>
                        <p>{defn.antonyms&& defn.antonyms.join(", ")}</p>
                        <br/>
                      </li>
                    ))}
                  </ol>
                </div>
              ))
        }
      </div>
      <div>
        <Button onClick={clickBack}>Back</Button>
      </div>
    </>
  );
};

export default WordsDetails;
