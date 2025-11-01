import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams } from "react-router";
import './App.css'
import Home from './pages/Home/Home';
import Mypage from './pages/Mypage/Mypage';
import WordsDetails from './pages/WordsDetails';
// import { columns} from "./components/user-words/columns"
// import UserWord from "./components/user-words/UserWord";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="mypage" element={<Mypage/>}/>
      {/* define :word as a parameter of useParams*/}
      <Route path="mypage/word_details/:word" element={<WordsDetails/>}/>
      <Route/>

    </Routes>
  );
}

export default App;
