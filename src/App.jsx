import { BrowserRouter, Routes, Route, Link } from 'react-router';
import './App.css'
import Signup from './components/Signup';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Signup />
    </div>
  );
}

export default App;
