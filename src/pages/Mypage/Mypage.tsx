import axios from "axios"
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import Logout from "../../components/Logout";
import UserWord from "@/components/user-words/UserWord";
// shadcn/ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import NaviMenu from "@/components/NaviMenu";

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

      <div className="flex w-full max-w-sm items-center space-x-2 my-4">
        <Tabs defaultValue="search" className="w-[400px]">
          <div className="w-full max-w-sm items-center space-x-2 my-4">
            <TabsList>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="mywords">My Words</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="search"><Search/></TabsContent>
            <TabsContent value="mywords"><UserWord/></TabsContent>
            <TabsContent value="history"></TabsContent>
          </div>
        </Tabs>
      </div>



      <Logout/>

    </>
  )
}

export default Mypage
