/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import api from "../api/axios"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth() 

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await api.post("/login", { email, password })
      const { token, name, role } = res.data.data

      login({ token, name, role }) 

      toast.success("Login successful")

      navigate(role === "admin" ? "/admin" : "/")
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Login failed")
    }
  }

  return (
    <div className="w-full flex justify-center items-center mt-20">
      <Card className="w-full max-w-sm bg-white">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center mt-3">
            IRTS Store
          </h1>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <CardFooter className="flex-col gap-2 mt-6 px-0">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Login
              </Button>

              <Button
                variant="outline"
                className="w-full cursor-pointer bg-white hover:bg-gray-100"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
