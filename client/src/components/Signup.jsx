import { useState } from "react";
import { useUser } from "../context/UserContext";

function Signup() {
  const [email, setEmail] = useState("");
  const { login } = useUser();

  const handleSignup = (e) => {
    e.preventDefault();
    if (email.trim()) {
      login(email); // Simulate signup with email
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xs mx-auto">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
