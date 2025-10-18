import { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Designate the type of event as FormEvent
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/v1/signup", {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });

      // Get JWT token
      const header = res.headers?.authorization || res.headers?.Authorization;
      let token = null;
      if (header){
        // "Bearer <token>" 形式なら token 部分だけ取る
        if (header.startsWith('Bearer ')) {
          token = header.split(' ')[1];
        } else {
        // すでにトークンだけが入っている場合
        token = header;
        }
      }

      // Save the token in localStorage to use API requests
      if (token){
        localStorage.setItem("token", token);
      }

      setMessage("✅ サインアップ成功！");
      navigate("/mypage");
      console.log("Success:", res.data);

    } catch (err) {
      let err_message = "❌ サインアップ失敗…";
      //  AxiosError or unknown error
      if (axios.isAxiosError(err)) {
        err_message += `${err.response?.data?.status?.message}`
        // if there's no data from JSON(err.response.data), display html message(err.message)
        console.error("Error:", err.response?.data || err.message);
      } else {
        err_message += `Unknown error occurred.`;
        console.error("Error:", err);
      }
      setMessage(err_message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
