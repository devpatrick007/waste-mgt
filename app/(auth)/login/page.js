// app/(auth)/login/page.js
"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     setLoading(true)
    //     setError("")

    //     const res = await signIn("credentials", {
    //         email,
    //         password,
    //         redirect: false,
    //     })

    //     setLoading(false)

    //     if (res?.error) {
    //         setError("Invalid email or password")
    //         return
    //     }

    //     router.push("/") // redirect after login
    // }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        console.log("signIn result:", res)

        if (res?.ok) {
            // router.replace("/")
            // router.refresh()
            window.location.href = "/"
            //alert("Login successful! Redirecting to dashboard...")
        } else {
            setError("Invalid email or password")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-6">
                {/* Logo */}
                <h1 className="text-4xl font-bold text-center text-green-600">♻</h1>

                {/* Subtitle */}
                <p className="text-center text-black/70">Login to your account</p>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-black/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-black/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-black/70">
                    Don’t have an account?{" "}
                    <Link href="/signup" className="text-green-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}