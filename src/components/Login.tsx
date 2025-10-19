import { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
// shadcn-ui
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"


// Zod schema for form validation
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // React Hook Form setup with Zod resolver
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/v1/login", {
        user: {
          email,
          password
        }
      });

      console.log("Full response:", res);
      console.log("Headers:", res.headers);

      // Get JWT token
      const header = res.headers?.authorization || res.headers?.Authorization;
      console.log("Auth header:", header);

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
        if (axios.isAxiosError(err)) {
          const err_message = `❌ Login失敗… ${err.response?.data?.status?.message}`
          // if there's no data from JSON(err.response.data), display html message(err.message)
          console.error("Error:", err.response?.data || err.message);
          console.error("Status:", err.response?.status);
          console.error("Data:", err.response?.data);
          console.error("Headers:", err.response?.headers);
          setMessage(err_message);
        } else {
          const err_message = `❌ Login失敗… Unknown error occurred.`;
          console.error("Error:", err);
          setMessage(err_message);
        }
    }
  };

  return (
    <div>
      <h2>💁Log in💁</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <Button type="submit">Log in</Button>

      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login
