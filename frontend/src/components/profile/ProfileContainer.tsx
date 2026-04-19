import { $user } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { MainButton } from "../shared/MainButton";
import { SecondaryButton } from "../shared/SecondaryButton";
import { navigate } from "astro:transitions/client";
import { set } from "astro:schema";
export function ProfileContainer({}) {
  const [isEditing, setIsEditing] = useState(false);
  const user: any = useStore($user);
  useEffect(() => console.log(isEditing), [isEditing]);
  const onEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="flex items-center border border-black justify-center  mb-5">
        <img
          src="/user.jpg"
          alt="imagen de usuario"
          loading="lazy"
          className="size-50 rounded-full"
        />
      </div>
      <div className=" flex border border-black flex-wrap lg:flex-nowrap justify-center gap-10 items-start">
        <section
          className={`${isEditing ? "items-end" : "items-center"} flex w-1/2  animate-opacity flex-col gap-7`}>
          <article className="flex flex-col mt-5 gap-5">
            <div>
              <h2 className="text-xl text-slate-500/80 font-semibold ">
                Nombre:
              </h2>
              <p className="text-lg text-slate-800">{user.name}</p>
            </div>
            <div>
              <h2 className="text-xl text-slate-500/80 font-semibold ">
                Email:
              </h2>
              <p className="text-lg text-slate-800">{user.email}</p>
            </div>
            <div>
              <h2 className="text-xl text-slate-500/80 font-semibold ">
                Teléfono:
              </h2>
              <p className="text-lg text-slate-800">{user.phone}</p>
            </div>
          </article>
          <div className="flex gap-2 ">
            <MainButton onClick={onEditClick}>
              {isEditing ? "Cancelar" : "Editar"}
            </MainButton>
            <SecondaryButton onClick={() => console.log("delete")}>
              Eliminar
            </SecondaryButton>
          </div>
        </section>
        <aside
          className={
            isEditing
              ? " border-l border-slate-500 flex justify-center w-1/2 animate-opacity "
              : "hidden"
          }>
          <form className="w-auto border border-amber-200 ">
            <section className="relative mt-6 flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-medium text-sm text-gray-500">
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
              <label
                htmlFor="email"
                className="font-medium text-sm text-gray-500">
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
              <label
                htmlFor="name"
                className="font-medium text-sm text-gray-500">
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
            <section className="relative flex flex-col mt-5 gap-2">
              <MainButton onClick={() => setIsEditing(false)} type="submit">
                Guardar
              </MainButton>
            </section>
          </form>
        </aside>
      </div>
    </>
  );
}
