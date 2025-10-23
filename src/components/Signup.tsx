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
  name: z.string().min(2, { message: "Username must be at least 2 characters."}),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  passwordConfirmation: z.string().min(6, { message: "Password confirmation must be at least 6 characters long" }),
})

function Signup() {
  // 2. State variables for form inputs
  // no need to use useState for name, email, password, passwordConfirmation
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 3. Set up the form with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  // Designate the type of event as FormEvent
  const onSubmit = async (values: z.infer<typeof formSchema>)=> {
    // no need to write e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/v1/signup", {
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
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
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 6 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must match the password entered above.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outline" type="submit">Submit</Button>
          </form>
        </Form>

        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Signup;




{/* <form onSubmit={handleSubmit}>
  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
  <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" />
  <Button type="submit">Sign Up</Button>
</form> */}
