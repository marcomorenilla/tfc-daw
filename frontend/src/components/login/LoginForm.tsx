import { useState } from "react";
import { handleLogin } from "../../services/loginHandler";
import { ErrorModal } from "./ErrorModal.tsx";
import { useStore } from "@nanostores/react";
import { $apiLoginUrl, $user } from "@/store/authStore.ts";
import { navigate } from "astro:transitions/client";

interface LoginProps {
  readonly onSwitch: () => void;
}

export default function LoginForm({ onSwitch }: LoginProps) {
  const [isErrored, setIsErrored] = useState(false);
  const apiUrl = useStore($apiLoginUrl);

  const handleCloseModal = () => setIsErrored(false);

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

      if (result.access_token) {
        $user.set(result.user);
        navigate("/");
      } else {
        throw new Error("No ha llegado un access_token válido");
      }
    } catch (error) {
      setIsErrored(true);
      console.error(error);
    }
    e.target.reset();
  };
  return (
    <>
      <form
        className="w-full animate-opacity mt-2 pb-6 flex flex-col gap-6"
        onSubmit={handleSubmit}
        id="login-form">
        <section className="relative flex flex-col gap-2">
          <label
            htmlFor="username"
            className="font-medium text-sm text-gray-500">
            Correo electrónico:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            placeholder="ejemplo@email.com"
            className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
          />
        </section>
        <section className="relative flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-medium text-sm text-gray-500">
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="••••••••"
            className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition"
          />
        </section>

        <section className="flex items-center justify-end font-medium">
          <a
            href="/reset-password"
            className="cursor-pointer text-sm text-teal-600 hover:text-teal-700 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </section>

        <section className="flex">
          <button
            className="cursor-pointer w-full p-3.5 font-semibold text-lg text-white rounded-xl bg-teal-600 hover:bg-teal-700 transition duration-150 shadow-sm"
            type="submit">
            Iniciar sesión
          </button>
        </section>
      </form>

      <section className="flex flex-col justify-center items-center gap-3 pt-6 border-t border-gray-100 text-gray-600">
        <p className="text-sm">¿No tienes cuenta?</p>
        <button
          onClick={onSwitch}
          className="font-semibold text-teal-600 hover:text-teal-700 hover:underline">
          Regístrate
        </button>
      </section>
      {isErrored && (
        <ErrorModal
          handleClose={handleCloseModal}
          message="No se encuentra al usuario en el sistema, regístrate para obtener la
          experiencia completa."
        />
      )}
    </>
  );
}
