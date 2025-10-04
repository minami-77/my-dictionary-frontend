import axios from "axios"
import { useState } from "react";

constfirstge = () => {
  const [user, setUser] = useState("");

  const fetchUser = async(e) => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/users/me");
      setUser(res.data.user);

    } catch (error) {
      console.error("Error fetching user");
    }
  }

  return (
    <>
      <div>
        <h1>Mypage</h1>
      </div>
      <h2>Hi,...</h2>
      <h2>Search a word</h2>
      <h2>List of my wordbooks</h2>
      <h2>Search history</h2>

    </>
  )
}

export default Mypage
