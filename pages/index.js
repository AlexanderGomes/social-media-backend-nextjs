import { useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios'

export default function Home() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/api/register/auth", user);
          router.push('/dash')
          console.log(user)

      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>App</h1>
      <div>
        <form onSubmit={handleClick}>
          <input
            placeholder="Username"
            required
            ref={username}
            className="loginInput"
          />
          <input
            placeholder="Email"
            required
            ref={email}
            className="loginInput"
            type="email"
          />
          <input
            placeholder="Password"
            required
            ref={password}
            className="loginInput"
            type="password"
            minLength="6"
          />
          <input
            placeholder="Password Again"
            required
            ref={passwordAgain}
            className="loginInput"
            type="password"
          />
          <button type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}



