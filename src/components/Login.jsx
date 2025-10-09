import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const res = await axios.post("http://localhost:3001/api/v1/login", {
        user: {
          name,
          password,
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

      setMessage("✅ Login成功！");
      navigate("/mypage");
      console.log("Success:", res.data);

    } catch (err) {
      const err_message = `❌ Login失敗… ${err.response?.data?.status?.message}`
      setMessage(err_message);
      // if there's no data from JSON(err.response.data), display html message(err.message)
      console.error("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Log in</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login
