import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;



const Login = () => {
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const payload = {
      emailOrMobile: loginMethod === "email" ? email.trim() : mobile.trim(),
      password: password.trim(),
    };

    console.log("Payload sent:", payload);

    try {
      const res = await fetch("${API_URL}/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("storage"));
        alert("Login successful");
        navigate("/chatbox");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed in client");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-[100px] text-xl ml-[530px] shadow-2xl h-[450px] w-[300px]">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col"
      >
        <h2 className="text-3xl font-bold mb-10">Login</h2>
        {loginMethod === "email" ? (
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded-lg text-[#003D16] border-[#003d16] bg-transparent mb-5"
            required
          />
        ) : (
          <input
            type="text"
            value={mobile}
            placeholder="Enter your Phone number"
            onChange={(e) => setMobile(e.target.value)}
            maxLength={10}
            className="border-2 rounded-lg text-[#003D16] border-[#003d16] bg-transparent mb-5"
            required
          />
        )}

        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 rounded-lg text-[#003D16] border-[#003d16] bg-transparent mb-5"
          required
        />

        <button
          type="button"
          onClick={() =>
            setLoginMethod(loginMethod === "email" ? "mobile" : "email")
          }
          className="mt-6 hover:cursor-pointer rounded-lg bg-[#9c6644] text-[black] h-15 w-56 mb-5"
        >
          {loginMethod === "email"
            ? "Login with mobile instead"
            : "Login with email instead"}
        </button>

        <button
          type="submit"
          className="mt-6 hover:cursor-pointer rounded-lg bg-[#268740] text-[#FFFF] h-11 w-24 mb-5"
        >
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link
            to="/"
            className="flex justify-center items-center text-[#003D16]"
          >
            Signup here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
