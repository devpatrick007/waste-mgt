"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                "https://pellakes-backend.prospafin.com/api/auth/sign-up/email",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        name: formData.name,
                        password: formData.password,
                    }),
                }
            );

            if (!res.ok) {
                const msg = await res.text();
                setError(msg || "Registration failed");
                setLoading(false);
                return;
            }
            alert("Registration successful! Please log in.");
            window.location.href = "/login";
            // const result = await signIn("credentials", {
            //     redirect: false,
            //     email: formData.email,
            //     password: formData.password,
            // });

            // if (result.error) {
            //     setError(result.error);
            //     setLoading(false);
            // } else {
            //     router.push("/dashboard");
            // }
        } catch (err) {
            setError("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md animate-fadeIn"
            >
                <h2 className="text-3xl font-extrabold mb-8 text-center text-green-600">
                    Sign Up
                </h2>

                {error && (
                    <p className="text-red-500 mb-4 text-center font-medium">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mb-4 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mb-4 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mb-4 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="mb-6 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {loading && (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    )}
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Log in
                    </a>
                </p>
            </form>
        </div>
    );
}