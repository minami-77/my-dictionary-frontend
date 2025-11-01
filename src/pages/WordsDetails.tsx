import React from 'react';
import { useParams } from "react-router";


const WordsDetails = () => {

const params = useParams();


  return (
    <div>
      <h2>Details of the word</h2>
      <h2>{params.word}</h2>
    </div>
  );
};

export default WordsDetails;
