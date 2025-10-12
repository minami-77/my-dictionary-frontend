import React from 'react'
import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [typedWord, setTypedWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const [word, setWord] = useState("");
  // const [phonetic, setPhonetic] = useState("");
  // const [partOfSpeech, setPartOfSpeech] = useState("");
  // const [definition, setDefinition] = useState("");
  // const [definitions, setDefinitions] = useState({});
  // const [example, setExample] = useState("");
  // const [synonyms, setSynonyms] = useState([]);
  // const [antonyms, setAntonyms] = useState([]);

  const handle_search= async() => {

      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${typedWord}`);
      console.log(res.data);

            if (!res.data || res.data.length === 0) {
              setSearchResults(["No results found"]);
              return;
            }
            else
            {
              setSearchResults(res.data);
            }

  }

      // res.data.map((item)=>{
      //   // Word,Phonetic
      //   console.log(`word: ${item.word}`);
      //   console.log(`phonetic: ${item.phonetic}`);

      //   // PartOfSpeech
      //   item.meanings.map((meaning,index)=>{
      //     console.log(`<${index + 1}>`);
      //     console.log(`partOfSpeech: ${meaning.partOfSpeech}`);
      //     // Definitions
      //     // meaning.definitions is an array
      //     // so need to map again
      //     // to get each definition
      //     // Each definition has
      //     // Definitions,Example,Synonyms,Antonyms
      //     meaning.definitions.map((def,index)=>{
      //       console.log(index + 1);
      //       console.log(`definition: ${def.definition}`);
      //       console.log(`example: ${def.example}`);
      //       console.log(`synonyms: ${def.synonyms}`);
      //       console.log(`antonyms: ${def.antonyms}`);
      //     })
      //   })
      // })

      // (prevDefs) => [...prevDefs, def.definition]



  return (
    <>
      <h2>Search</h2>
      <input type="text"
        placeholder="Type a word to search"
        value = {typedWord}
        onChange={(e)=>setTypedWord(e.target.value)} />
      <button onClick={handle_search}>Search</button>
      <div>
        <h3>Search Results:</h3>
        <p>{}</p>
      </div>
    </>

  )
}
