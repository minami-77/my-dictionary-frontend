import { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
// shadcn-ui
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// 1. Validation schema with zod
const formSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

function Login() {
  // 2. State variables for form inputs
  // no need to use useState for email and password
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // 3. Set up the form with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 3. send login request to the backend
  // receive values of type inferred from formSchema(z.infer<typeof formSchema>)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // no need to write e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/v1/login", {
        user: {
          // receive values from react-hook-form
          email: values.email,
          password: values.password
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
    <>

      <div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field}/>
                </FormControl>
                <FormDescription>
                  Please enter your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormDescription>
                  Please enter your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="secondary" type="submit">Submit</Button>
        </form>
      </Form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Login



      {/* <form onSubmit={form.handleSubmit(onSubmit)}>
        <input {...form.register("email")} placeholder="Email" />
        <input type="password" {...form.register("password")} placeholder="Password" />
        <Button type="submit">Log in</Button>
      </form> */}


  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:3001/api/v1/login", {
  //       user: {
  //         email,
  //         password
  //       }
  //     });

  //     console.log("Full response:", res);
  //     console.log("Headers:", res.headers);

  //     // Get JWT token
  //     const header = res.headers?.authorization || res.headers?.Authorization;
  //     console.log("Auth header:", header);

  //     let token = null;
  //     if (header){
  //       // "Bearer <token>" 形式なら token 部分だけ取る
  //       if (header.startsWith('Bearer ')) {
  //         token = header.split(' ')[1];
  //       } else {
  //       // すでにトークンだけが入っている場合
  //       token = header;
  //       }
  //     }

  //     // Save the token in localStorage to use API requests
  //     if (token){
  //       localStorage.setItem("token", token);
  //     }

  //     setMessage("✅ Login成功！");
  //     navigate("/mypage");
  //     console.log("Success:", res.data);

  //   } catch (err) {
  //       if (axios.isAxiosError(err)) {
  //         const err_message = `❌ Login失敗… ${err.response?.data?.status?.message}`
  //         // if there's no data from JSON(err.response.data), display html message(err.message)
  //         console.error("Error:", err.response?.data || err.message);
  //         console.error("Status:", err.response?.status);
  //         console.error("Data:", err.response?.data);
  //         console.error("Headers:", err.response?.headers);
  //         setMessage(err_message);
  //       } else {
  //         const err_message = `❌ Login失敗… Unknown error occurred.`;
  //         console.error("Error:", err);
  //         setMessage(err_message);
  //       }
  //   }
  // };

  // return (
  //   <div>
  //     <h2>💁Log in💁</h2>
  //     <form onSubmit={handleSubmit}>
  //       <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
  //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
  //       <Button type="submit">Log in</Button>

  //     </form>
