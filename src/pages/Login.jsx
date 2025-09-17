import { useRef, useState } from "react";
import { useUserData } from "../hooks/useUserData";
import { useUsers } from "../hooks/useUsers";
import { useNavigate } from "react-router";

function Login() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [invalidCredentials, setInvalidCreadentials] = useState("");
  const { users } = useUsers();
  const { setUser } = useUserData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorUsername("");

    const usernameFound = users.find(
      (user) => user.username === usernameRef.current.value
    );
    const emailFound = users.find(
      (user) => user.email === emailRef.current.value
    );

    if (!usernameFound || !emailFound) {
      setInvalidCreadentials("Invalid credentials");
      throw new Error("invalid credentials");
    }

    const userFound = users.filter(
      (user) =>
        user.username == usernameRef.current.value &&
        user.email == emailRef.current.value
    );
    setUser(userFound);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center gap-2 py-12 w-90 shadow-xl border border-zinc-400 rounded-md">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-xl font-bold">Login</h1>
          <p className="text-zinc-500">Sign in to your account</p>
        </div>
        <form className="flex flex-col gap-4 w-72 " onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1 text-sm text-zinc-600">
            Username
            <input
              type="text"
              ref={usernameRef}
              className={`outline text-black px-1 py-0.5 rounded-xs ${
                errorUsername && "outline-red-600"
              }`}
              required
            />
            {errorUsername && <p className="text-red-600">{errorUsername}</p>}
          </label>
          <label className="flex flex-col gap-1 text-sm text-zinc-600 ">
            Email
            <input
              type="email"
              ref={emailRef}
              className={`outline text-black px-1 py-0.5 rounded-xs ${
                errorEmail && "outline-red-600"
              }`}
              required
            />
            {errorEmail && <p className="text-red-600">{errorEmail}</p>}
          </label>
          {invalidCredentials && (
            <p className="flex justify-center py-2 text-red-600 text-sm bg-red-300">
              {invalidCredentials}
            </p>
          )}
          <button
            type="submit"
            className="py-1 bg-black text-white cursor-pointer font-semibold rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
