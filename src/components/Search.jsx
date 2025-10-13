import React from 'react'
import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [typedWord, setTypedWord] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState("");

  const handle_search= async() => {
    // Clear previous results and error messages
    setSearchResults(null);
    setError("");

    if (typedWord.trim() === "") {
      setError("Please enter a word to search");
      return;
    }

    try {
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${typedWord}`);

      if (!res.data|| res.data.length === 0) {
        setError("No results found");
        console.log(searchResults);
        return;
      }
      else {
        setSearchResults(res.data);
        console.log(res.data);
      }

    } catch (error) {
        setError(error.response?.data?.message || "Error fetching word data");
        console.error("Error fetching word data", error.response?.data || error.message);
        return;
    }
  }


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

        <ul>
          {error && <li>{error}</li>}
          {!error && searchResults &&
            searchResults.map((item, index) => (
              <li key={index}>
                <strong>Word:</strong> {item.word} <br />
                <strong>Phonetic:</strong> {item.phonetic} <br />
                {item.meanings.map((meaning, mIndex) => (
                  <div key={mIndex} >
                    <strong>Part of Speech:</strong> {meaning.partOfSpeech} <br />
                    {meaning.definitions.map((def, dIndex) => (
                      <div key={dIndex} >
                        <strong>Definition {dIndex + 1}:</strong> {def.definition} <br />
                        {def.example && (
                          <>
                            <strong>Example:</strong> {def.example} <br />
                          </>
                        )}
                        {def.synonyms && def.synonyms.length > 0 && (
                          <>
                            <strong>Synonyms:</strong> {def.synonyms.join(", ")} <br />
                          </>
                        )}
                        {def.antonyms && def.antonyms.length > 0 && (
                          <>
                            <strong>Antonyms:</strong> {def.antonyms.join(", ")} <br />
                          </>
                        )} <br />
                      </div>
                    ))}
                  </div>
                ))}
              </li>
            ))
          }
        </ul>

      </div>

    </>
  )
}
