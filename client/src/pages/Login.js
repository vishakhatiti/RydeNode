import React, { useState } from "react";
import API from "../services/api";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async (e) => {

    e.preventDefault();

    const res = await API.post("/auth/login",{
      email,
      password
    });

    console.log(res.data);

    alert("Login success");

  };

  return (
    <form onSubmit={login}>

      <input
      placeholder="Email"
      onChange={e=>setEmail(e.target.value)}
      />

      <input
      type="password"
      placeholder="Password"
      onChange={e=>setPassword(e.target.value)}
      />

      <button>Login</button>

    </form>
  );
}

export default Login;