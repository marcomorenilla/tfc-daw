import React, { useState } from "react";
import { ErrorModal } from "./ErrorModal.tsx";
import { useStore } from "@nanostores/react";
import { $apiRegisterUrl } from "@/store/authStore.ts";
import { handleRegister } from "@/services/registerHandler.ts";

interface RegisterProps {
  readonly onSwitch: () => void;
}

interface RegisterData {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}

const initialRegisterError = {
  name: false,
  surname: false,
  email: false,
  password: false,
  phone: false,
};

export default function RegisterForm({ onSwitch }: RegisterProps) {
  const apiUrl = useStore($apiRegisterUrl);
  const [error, setError] = useState({
    nameError: { error: false, message: "" },
    emailError: { error: false, message: "" },
    surnameError: { error: false, message: "" },
    passwordError: { error: false, message: "" },
    phoneError: { error: false, message: "" },
  });

  const onRegister = async (credentials: RegisterData, apiUrl: string) => {
    await handleRegister(credentials, apiUrl);
  };

  const validateFields = (credentials: RegisterData) => {
    console.log(credentials);

    const { name, surname, email, password, phone } = credentials;
    const emptyRegex = /^·*$/;
    const emailRegex = /^[\w\d/.]+@[\w\d/.]+\.(com|es|dev|org)$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{6,}$/;

    if (!emptyRegex.test(name)) {
      const { nameError } = error;
      const newNameError = {
        error: true,
        message: "El nombre del usuario no puede estar vacío",
      };
      setError({ ...error, nameError: newNameError });
    }
    console.log("error", error);
    console.log("empty name", emailRegex.test(name));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("enviado", apiUrl);
    const formData: FormData = new FormData(e.currentTarget);
    const name: string = formData.get("name") as string;
    const surname: string = formData.get("surname") as string;
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    const phone: string = formData.get("phone") as string;

    const credentials: RegisterData = {
      name,
      surname,
      email,
      password,
      phone,
    };
    validateFields(credentials);
    //onRegister(credentials, apiUrl);
    e.target.reset();
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
            placeholder="Tu nombre"
            className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
          />
        </section>
        {error.nameError.error && <span>{error.nameError.message}</span>}
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
            placeholder="Tu apellido"
            className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
          />
        </section>
        <section className="relative flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-sm text-gray-500">
            Correo electrónico:
          </label>
          <input
            type="text"
            name="email"
            id="email"
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
    </>
  );
}
