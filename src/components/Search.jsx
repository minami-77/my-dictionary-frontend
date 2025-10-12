import React from 'react'
import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState([]);

  const handle_search= async() => {
    try {
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      console.log(res.data);
      setResults(res.data[0].meanings[0].definitions[0].definition);
      console.log(results);
    } catch (error) {
      console.error("Error fetching word", error.response?.data || error.message);
      setResults(["No results found"]);
    }
  }

  return (
    <>
      <h2>Search</h2>
      <input type="text"
        placeholder="Type a word to search"
        value = {word}
        onChange={(e)=>setWord(e.target.value)} />
      <button onClick={handle_search}>Search</button>
      <div>
        <h3>Search Results:</h3>
        <p>{results}</p>
      </div>
    </>

  )
}
