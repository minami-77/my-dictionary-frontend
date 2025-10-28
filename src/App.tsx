import { BrowserRouter, Routes, Route, Link } from 'react-router';
import './App.css'
import Home from './pages/Home/Home';
import Mypage from './pages/Mypage/Mypage';
import UserWord from './components/user-words/UserWord';
import { columns } from './components/user-words/columns'
import { data } from './components/user-words/UserWord';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="mypage" element={<Mypage/>}/>
      <Route path="words" element={<UserWord columns={columns} data={data}/>}/>
      <Route/>

    </Routes>
  );
}

export default App;
