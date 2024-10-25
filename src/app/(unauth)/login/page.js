"use client";
import "./index.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("userName");
    const password = formData.get("password");

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
      });

      if (response.ok) {
        const body = await response.json();
        document.cookie = `refreshToken=${body.refreshToken}; path=/`;

        document.cookie = `accessToken=${body.accessToken}; path=/`;
        router.replace("/");
      } else {
        alert("Invalid login credentials");
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Unsuccessfull login", error);
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to Mushroom Kingdom</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="name"
          name="userName"
          placeholder="Username"
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button className="login-button" type="submit">
          Log in
        </button>
        <div className="forgotten-password">Forgotten password?</div>
        <div className="horizontal-divider"></div>
        <button type="button" className="create-account-button">
          Create New Account
        </button>
      </form>
    </div>
  );
}
