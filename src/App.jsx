import { BrowserRouter, Routes, Route, Link } from 'react-router';
import './App.css'
import Home from './pages/Home';
import Signup from './components/Signup';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route/>
      <Route/>
      <Route/>

    </Routes>
  );
}

export default App;
