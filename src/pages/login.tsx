import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { useState } from "react"

export function Login() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle authentication
    console.log("Authenticating...", { email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/30 via-background to-primary/30">
      <div className="container px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <motion.div
            className="bg-card p-6 sm:p-8 rounded-2xl shadow-xl border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-grotesk font-bold mb-2">
                {isSignIn ? "Welcome Back!" : "Create Account"}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {isSignIn
                  ? "Sign in to continue your learning journey"
                  : "Join our community of Web3 learners"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Google Sign In */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-accent/5 transition-colors"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full rounded-lg border bg-background focus:ring-2 focus:ring-accent/20 transition-shadow"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full rounded-lg border bg-background focus:ring-2 focus:ring-accent/20 transition-shadow"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {isSignIn && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      Remember me
                    </label>
                    <button type="button" className="text-accent hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                >
                  {isSignIn ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-accent hover:underline"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}