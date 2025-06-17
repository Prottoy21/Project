import { useState } from "react";
import { useUser } from "../context/UserContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { login } = useUser(); // simulate account creation

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setSuccess(true);
    login(email); // simulate signup
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Sign Up</h2>

      {success && <p className="text-green-600 mb-2 text-center">✅ Account created!</p>}

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
