import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { $apiRegisterUrl } from "@/store/authStore.ts";
import { handleRegister } from "@/services/registerHandler.ts";
import { ErrorSpan } from "./ErrorSpan.tsx";
import { SecondaryButton } from "../shared/SecondaryButton.tsx";

interface RegisterProps {
  readonly onSwitch: () => void;
}

interface RegisterData {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  disabled: boolean;
  is_superuser: boolean;
}

const initialFormData = {
  name: "",
  surname: "",
  email: "",
  password: "",
  phone: "",
};

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<any>(initialFormData);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);

  const onRegister = async (credentials: RegisterData, apiUrl: string) => {
    try {
      await handleRegister(credentials, apiUrl);
      onSwitch();
    } catch (err: any) {
      setErrorMessage(err.message);
      setIsDialogOpen(true);
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateSingleField(name, value);
  };

  const validateSingleField = (fieldName: string, value: string) => {
    let newError = { error: false, message: "" };
    let isErrored = false;

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          newError = { error: true, message: "El nombre no puede estar vacío" };
          isErrored = true;
        }
        break;
      case "surname":
        if (!value.trim()) {
          newError = {
            error: true,
            message: "El apellido no puede estar vacío",
          };
          isErrored = true;
        }
        break;
      case "password":
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{6,}$/;
        if (!passwordRegex.test(value)) {
          newError = {
            error: true,
            message:
              "La contraseña debe tener mayúsculas minúsculas, números y caracteres especiales. Mínimo 6 caracteres",
          };
          isErrored = true;
        }
        break;
      case "phone":
        const phoneRegex = /^\+?(\d[\s-]?){7,15}\d$/;
        if (!phoneRegex.test(value)) {
          newError = { error: true, message: "Número con formato incorrecto" };
          isErrored = true;
        }
        break;
      case "email":
        const emailRegex = /^[\w\d/.]+@[\w\d/.]+\.(com|es|dev|org)$/;
        if (!emailRegex.test(value)) {
          newError = {
            error: true,
            message:
              "Email con formato incorrecto solamente se aceptan .com | .es | .dev | .org",
          };
          isErrored = true;
        }
        break;
    }

    setIsErrored(isErrored);

    setError((prev) => ({
      ...prev,
      [`${fieldName}Error`]: newError,
    }));
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
      disabled: false,
      is_superuser: false,
    };
    console.log("password:", password);
    if (!isErrored) {
      onRegister(credentials, apiUrl);
      e.target.reset();
    }
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
            onChange={handleChange}
            value={formData.name}
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
            onChange={handleChange}
            value={formData.surname}
            required
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
            onChange={handleChange}
            value={formData.email}
            required
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
            onChange={handleChange}
            value={formData.password}
            required
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
            onChange={handleChange}
            value={formData.phone}
            required
            name="phone"
            id="phone"
            placeholder="+34 - 666 666 666"
            className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
          />
        </section>
        {error.phoneError.error && (
          <ErrorSpan>{error.phoneError.message}</ErrorSpan>
        )}
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
      </form>
      <dialog
        ref={dialogRef}
        onClose={() => setIsDialogOpen(false)}
        className="max-w-none max-h-none  bg-transparent backdrop-blur-lg h-full w-full fixed inset-0 ">
        <div className="animate-opacity  bg-red-600/50 h-full w-full flex justify-center border border-red items-center">
          <div className="bg-white rounded-xl border-2 border-red-600 flex flex-col items-center justify-center gap-4 p-3">
            <h2 className="text-xl text-red-600 font-bold">{errorMessage} </h2>
            <SecondaryButton onClick={() => setIsDialogOpen(false)}>
              Aceptar
            </SecondaryButton>
          </div>
        </div>
      </dialog>
    </>
  );
}
