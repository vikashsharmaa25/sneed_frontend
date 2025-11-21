'use client'
import React from "react"
import Link from "next/link"
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Checkbox } from "@/components/ui/checkbox"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"

function Login() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password)
      const token = await userCred.user.getIdToken()

      // Store token in secure cookie (1 hour expiry)
      setCookie("token", token, {
        maxAge: 60 * 60,
        path: "/",
        sameSite: "strict",
      })

      router.push("/dashboard")
    } catch (err: any) {
      setError(err?.message ?? "Login failed")
    } finally {
      setLoading(false)
    }
  }

    return (
      <Card className="w-full max-w-md overflow-hidden rounded-2xl">
        <div className="bg-[#7b1d16] px-6 py-8 text-center text-white">
          <div className="mx-auto mb-2 flex items-center justify-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-sm bg-white/15">
              <Leaf className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Sneed</span>
          </div>
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="mt-1 text-sm/6 opacity-90">Sign in to your account to continue</p>
        </div>
        <CardContent className="space-y-4 my-5">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  aria-label="Email"
                  placeholder="Enter your email"
                  className="pr-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  aria-label="Password"
                  placeholder="Enter your password"
                  className="pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-muted-foreground">
                <Checkbox />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-primary underline-offset-4 hover:underline">Forgot password?</Link>
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">{error}</p>
            ) : null}

            <Button type="submit" disabled={loading} className="w-full bg-[#7b1d16] text-white hover:bg-[#6b1913]">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="block">
          <div className="space-y-2 text-center text-sm">
            <p className="text-muted-foreground">
              New to Sneed? <Link className="text-primary underline-offset-4 hover:underline" href="/signup">Get started</Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    )
  }

  export default Login