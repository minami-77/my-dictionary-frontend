import axios from "axios"
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import Logout from "../../components/Logout";
import UserWord from "@/components/UserWord";
import NaviMenu from "@/components/NaviMenu";

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
      setUser(res.data.user.name);

    } catch (error) {
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
          setUser(res.data.user.name);

        } catch (error) {
          // AxiosError or unknown error
          if (axios.isAxiosError(error)) {
            console.error("Error fetching user", error.response?.data);
          } else {
            console.error("Error fetching user", error);
          }
        }
      }
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
      <h1>Hi,{user ? `${user}` : `Guest`}</h1>
      <NaviMenu />

      <Search/>
      {/* <UserWord/> */}
      <Logout/>

    </>
  )
}

export default Mypage
