import React from 'react'
import { useState } from "react";
import axios from "axios";
import SaveWord from './SaveWord';
// shadcn-ui
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Search() {

  // Define TypeScript types for the API response
  type Word = {
    word: string;
    phonetic: string;
    meanings: {
      partOfSpeech: string;
      definitions: {
        definition: string;
        example?: string;
        synonyms?: string[];
        antonyms?: string[];
      }[];
    }[];
  };

  const [typedWord, setTypedWord] = useState<string>("");
  const [error, setError] = useState<string>("");
  // An array of type Word objects (Word[]) or null
  const [searchResults, setSearchResults] = useState<Word[]|null>(null);

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
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error fetching word data");
        console.error("Error fetching word data", error.response?.data || error.message);
      } else {
        setError("Unknown error occurred");
        console.error("Error fetching word data", error);
      }
    }
  }


  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2 my-4">
        <Input type="text"
          placeholder="Type a word to search"
          value = {typedWord}
          onChange={(e)=>setTypedWord(e.target.value)} />
        <Button variant="outline" onClick={handle_search}>Search</Button>
      </div>

      <div className="my-4">
        <h3>Search Results:</h3>


{/* DATA TABLE is component? */}




        <ul>
          {error && <li>{error}</li>}
          {!error && searchResults &&
            searchResults.map((item:Word, index:number) => (
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
      {/* display save button if result exists */}
      {searchResults && <SaveWord searchedResults={searchResults}/>}

    </>
  )
}
