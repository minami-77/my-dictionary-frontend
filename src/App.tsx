import { BrowserRouter, Routes, Route, Link } from 'react-router';
import './App.css'
import Home from './pages/Home/Home.js';
import Mypage from './pages/Mypage/Mypage.js';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="mypage" element={<Mypage/>}/>
      <Route/>
      <Route/>

    </Routes>
  );
}

export default App;
