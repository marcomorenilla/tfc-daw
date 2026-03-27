import React, { useState } from "react";
import { ErrorModal } from "./ErrorModal.tsx";
import { useStore } from "@nanostores/react";
import { $apiRegisterUrl } from "@/store/authStore.ts";
import { handleRegister } from "@/services/registerHandler.ts";
import { ErrorSpan } from "./ErrorSpan.tsx";

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
  nameError: { error: false, message: "" },
  emailError: { error: false, message: "" },
  surnameError: { error: false, message: "" },
  passwordError: { error: false, message: "" },
  phoneError: { error: false, message: "" },
};

export default function RegisterForm({ onSwitch }: RegisterProps) {
  const apiUrl = useStore($apiRegisterUrl);
  const [error, setError] = useState(initialRegisterError);

  const onRegister = async (credentials: RegisterData, apiUrl: string) => {
    await handleRegister(credentials, apiUrl);
  };

  const validateFields = (credentials: RegisterData) => {
    const { name, surname, email, password, phone } = credentials;
    let newErrors = { ...error };

    if (!name.trim()) {
      newErrors.nameError = {
        error: true,
        message: "El nombre no puede estar vacío",
      };
    } else {
      newErrors.nameError = { error: false, message: "" };
    }

    if (!surname.trim()) {
      newErrors.surnameError = {
        error: true,
        message: "El apellido no puede estar vacío",
      };
    } else {
      newErrors.surnameError = { error: false, message: "" };
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{6,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.passwordError = {
        error: true,
        message: "Contraseña demasiado débil",
      };
    } else {
      newErrors.passwordError = { error: false, message: "" };
    }

    const phoneRegex = /^\+?(\d[\s-]?){7,15}\d$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phoneError = {
        error: true,
        message: "Número con formato incorrecto",
      };
    } else {
      newErrors.phoneError = { error: false, message: "" };
    }

    const emailRegex = /^[\w\d/.]+@[\w\d/.]+\.(com|es|dev|org)$/;
    if (!emailRegex.test(email)) {
      newErrors.emailError = {
        error: true,
        message: "Email con formato incorrecto",
      };
    } else {
      newErrors.emailError = { error: false, message: "" };
    }

    setError(newErrors);
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
    onRegister(credentials, apiUrl);
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
        {error.nameError.error && (
          <ErrorSpan>{error.nameError.message}</ErrorSpan>
        )}
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
        {error.surnameError.error && (
          <ErrorSpan>{error.surnameError.message}</ErrorSpan>
        )}
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
        {error.emailError.error && (
          <ErrorSpan>{error.emailError.message}</ErrorSpan>
        )}
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
        {error.passwordError.error && (
          <ErrorSpan>{error.passwordError.message}</ErrorSpan>
        )}
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
        {error.phoneError.error && (
          <ErrorSpan>{error.phoneError.message}</ErrorSpan>
        )}

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
