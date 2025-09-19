import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // e is an event object of the handleSubmit function, which is passed when onSubmit
  // same as "async function handleSubmit(e){...}"
  const handleSubmit = async (e) => {

    //  prevent reload
    e.preventDefault();
    console.log("イベントオブジェクト e:", e);
    console.log("フォーム要素:", e.target);
    console.log("フォームデータ:", Object.fromEntries(new FormData(e.target)));

    // try/catch syntax (JS)
    try {
      //if success, pass url and data
      const res = await axios.post(
        'http://localhost:3001/users',
        {
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
          }
        }
      );
      console.log("Success:", res.data);
    } catch (err) {
      // if fail, error message
      console.error("Error:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input value ={name} onChange={(e)=> setName(e.target.value)} placeholder='Name'/>
          <input value ={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'/>
          <input type="password" value={password}onChange={(e)=> setPassword(e.target.value)} placeholder='Password'/>
          <input type="password" value ={passwordConfirmation} onChange={(e)=> setPasswordConfirmation(e.target.value)} placeholder='Confirm Password '/>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default App
