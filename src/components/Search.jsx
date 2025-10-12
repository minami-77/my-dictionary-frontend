import React from 'react'
import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState([]);

  const handle_search= async() => {

      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      console.log(res.data);
      // console.log(`antonyms: ${res.data[0].antonyms}`);
      // console.log(`definitions: ${res.data[0].meanings[0].definitions}`);
      // console.log(`partOfSpeech: ${res.data[0].meanings[0].partOfSpeech}`);

      res.data.map((item)=>{
        console.log(`word: ${item.word}`);
        item.meanings.map((meaning,index)=>{
          console.log(`<${index + 1}>`);
          console.log(`partOfSpeech: ${meaning.partOfSpeech}`);
          meaning.definitions.map((def,index)=>{
            console.log(index + 1);
            console.log(`definition: ${def.definition}`);
            console.log(`example: ${def.example}`);
            console.log(`synonyms: ${def.synonyms}`);
            console.log(`antonyms: ${def.antonyms}`);
          })
        })
      })

      if (!res.data || res.data.length === 0) {
        setResults(["No results found"]);
        return;
      }
      else {
        // Display the first definition of the first meaning
        setResults(
          res.data[0].meanings[0].definitions[0].definition
        );
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
