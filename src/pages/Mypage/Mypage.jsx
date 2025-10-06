import axios from "axios"
import { useEffect, useState } from "react";

function Mypage() {
  // initial value is null since user info is an object
  const [user, setUser] = useState(null);

  const fetchUser = async() => {
    try {
      // Take out the JWT token
      const token = localStorage.getItem("token");
      // Axios
      const res = await axios.get("http://localhost:3001/api/v1/users/me",{
        headers: {
          Authorization: `Bearer ${token}` ,
        }
      });
      console.log(res.data);
      setUser(res.data.data.name);

    } catch (error) {
      console.error("Error fetching user", error.response?.data);
    }
  }

  useEffect(()=>{
    fetchUser();
    // Need empty [] to execute once on mount
  },[])

  return (
    <>
      <div>
        <h1>Mypage</h1>
      </div>
      <h2>Hi,{user ? `${user}` : `Guest`}</h2>
      <h2>Search a word</h2>
      <h2>List of my wordbooks</h2>
      <h2>Search history</h2>

    </>
  )
}

export default Mypage
