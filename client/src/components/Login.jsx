import { useState } from "react";
import { useUser } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const { login } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim()) {
      login(email); // Simulate login with email
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xs mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
