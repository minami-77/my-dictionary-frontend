// shadcn-ui
import { Button } from "@/components/ui/button"

export default function Logout() {

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // redirect the user to the home or login page
    window.location.href = "/";
  }

  return (
    <>
      <Button onClick={handleLogout}>Log out</Button>
    </>
  )
}
