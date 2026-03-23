import React, { useState } from "react";
import { ErrorModal } from "./ErrorModal.tsx";
import { useStore } from "@nanostores/react";
import { $apiRegisterUrl } from "@/store/authStore.ts";

interface RegisterProps {
  readonly onSwitch: () => void;
}

export default function RegisterForm({ onSwitch }: RegisterProps) {
  const apiUrl = useStore($apiRegisterUrl);
  const [isErrored, setIsErrored] = useState(false);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("enviado", apiUrl);
  };
  return (
    <>
      <form
        className="flex animate-opacity flex-col gap-4"
        onSubmit={handleSubmit}
        id="login-form">
        <section className="relative flex flex-col gap-2">
          <label htmlFor="name" className="font-medium text-sm text-gray-500">
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Tu nombre"
            className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
          />
        </section>
        <section className="relative flex flex-col gap-2">
          <label
            htmlFor="surname"
            className="font-medium text-sm text-gray-500">
            Apellido:
          </label>
          <input
            type="text"
            name="surname"
            id="surname"
            required
            placeholder="Tu apellido"
            className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
          />
        </section>
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
        <section className="relative flex flex-col gap-2">
          <label htmlFor="name" className="font-medium text-sm text-gray-500">
            Teléfono:
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            required
            placeholder="+34 - 666 666 666"
            className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
          />
        </section>

        <section className="flex">
          <button
            className="cursor-pointer w-full p-3.5 font-semibold text-lg text-white rounded-xl bg-teal-600 hover:bg-teal-700 transition duration-150 shadow-sm"
            type="submit">
            Registrar
          </button>
        </section>
        <section className="flex justify-center">
          <button
            onClick={onSwitch}
            className="cursor-pointer w-fit font-semibold text-teal-600  hover:border-b hover:border-teal-600">
            Volver al inicio de sesión
          </button>
        </section>

        <section className="flex items-center justify-start gap-2">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            required
            className="border border-gray-200 rounded-xl p-3  bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
          />
          <label htmlFor="terms" className="font-mediutext-sm text-gray-500">
            Acepto los términos y condiciones
          </label>
        </section>
      </form>
      {isErrored && (
        <ErrorModal
          setIsErrored={setIsErrored}
          message="No se encuentra al usuario en el sistema, regístrate para obtener la
              experiencia completa."
        />
      )}
    </>
  );
}
