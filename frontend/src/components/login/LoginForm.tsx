import type { SubmitEventHandler } from "react";
import { handleLogin } from "../../services/loginHandler";

export function LoginForm() {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.target);
    const username: string = formData.get("username") as string;
    const password: string = formData.get("password") as string;

    const credentials = {
      username,
      password,
    };
    handleLogin(credentials);
  };
  return (
    <form
      action=""
      method="post"
      className="w-auto mt-5 flex flex-col gap-4 items-center justify-center"
      onSubmit={handleSubmit}
      id="login-form">
      <section className="relative flex flex-col gap-3">
        <label htmlFor="username" className="font-bold text-lg">
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="border rounded-sm p-1 w-auto border-(--color-primary) outline-none focus:ring-4 focus:ring-(--color-primary)/50"
        />
      </section>
      <section className="relative flex flex-col gap-3">
        <label htmlFor="password" className="font-bold text-lg">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border rounded-sm p-1 w-auto border-(--color-primary) outline-none focus:ring-4 focus:ring-(--color-primary)/50"
        />
      </section>
      <section className="flex gap-2">
        <button
          className="cursor-pointer p-2 text-white rounded-sm font-semibold  bg-(--color-primary) hover:border hover:border-(--color-primary) hover:text-(--color-primary)  hover:bg-(--color-bg) "
          type="submit">
          Login
        </button>
        <button
          className="cursor-pointer p-2 text-(--color-primary) rounded-sm font-semibold bg-white border border-(--color-primary) hover:bg-(--color-primary) hover:text-white "
          type="submit">
          Register
        </button>
      </section>
    </form>
  );
}
