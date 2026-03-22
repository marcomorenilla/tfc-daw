import React from "react";
import { handleLogin } from "../../services/loginHandler";

interface LoginFormProps {
  apiUrl: string;
}

export default function LoginForm({ apiUrl }: LoginFormProps) {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const username: string = formData.get("username") as string;
    const password: string = formData.get("password") as string;

    const credentials = {
      username,
      password,
    };

    try {
      const result = await handleLogin(credentials, apiUrl);
      console.log("resultado", result);

      if (result.access_token) {
        localStorage.setItem(
          "access_token",
          JSON.stringify(result.access_token),
        );
      } else {
        throw new Error("No ha llegado un access_token válido");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form
        className="w-auto mt-5 border-b-3 border-orange-500/75 pb-5 flex flex-col gap-4 items-center justify-center"
        onSubmit={handleSubmit}
        id="login-form">
        <section className="relative flex flex-col gap-3">
          <label
            htmlFor="username"
            className="font-bold text-lg text-orange-500 text-xl">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            className="border rounded-sm p-1 w-auto bg-white/50 border-white/50 outline-none focus:ring-4 focus:ring-(--color-primary)/50"
          />
        </section>
        <section className="relative flex flex-col gap-3">
          <label
            htmlFor="password"
            className="font-bold text-lg text-orange-500 text-xl">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="border rounded-sm p-1 bg-white/50 w-auto border-white/50 outline-none focus:ring-4 focus:ring-(--color-primary)/50"
          />
        </section>
        <section className=" text-orange-500  flex items-center justify-center font-bold">
          <a
            href="/reset-password"
            className="cursor-pointer md:text-lg text-(--color-primary-dark) hover:border-b hover:border-white hover:text-white">
            He olvidado mi contraseña
          </a>
        </section>
        <section className="flex gap-2">
          <button
            className="cursor-pointer p-2 font-bold md:text-lg text-white rounded-sm   bg-(--color-primary) hover:border hover:border-(--color-primary) hover:text-(--color-primary)  hover:bg-(--color-bg) "
            type="submit">
            Entrar
          </button>
        </section>
      </form>
      <section className="flex md:text-lg flex-col justify-center items-center gap-1 p-1 text-orange-500 font-bold">
        <p>¿No tienes cuenta?</p>
        <button className="text-(--color-primary-dark) hover:text-white hover:border-b hover:border-white">
          Crear cuenta
        </button>
      </section>
    </>
  );
}
