function Login() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center gap-6 h-80 w-90 border rounded-md">
        <div className="flex flex-col items-center">
          <h1 className="mt-12 text-xl font-bold">Login</h1>
          <p className="text-zinc-500">Sign in to your account</p>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="" className="flex flex-col">
            Username
            <input type="text" className="outline" />
          </label>
          <label htmlFor="" className="flex flex-col">
            Password
            <input type="text" className="outline" />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Login;
