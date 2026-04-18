import { $user } from "@/store/authStore";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { MainButton } from "../shared/MainButton";
import { SecondaryButton } from "../shared/SecondaryButton";
export function ProfileContainer({}) {
  const user: any = useStore($user);

  if (!user.name) {
    window.location.href = "/login";
    console.log("redirecting a login");
  }

  return (
    <>
      <section className="flex flex-col place-items-center gap-7">
        <img
          src="/user.jpg"
          alt="imagen de usuario"
          loading="lazy"
          className="size-50 rounded-full"
        />
        <article className="flex flex-col mt-5 gap-5">
          <div>
            <h2 className="text-3xl text-slate-500/80 font-semibold ">
              Nombre:
            </h2>
            <p className="text-lg text-slate-800">{user.name}</p>
          </div>
          <div>
            <h2 className="text-3xl text-slate-500/80 font-semibold ">
              Email:
            </h2>
            <p className="text-lg text-slate-800">{user.email}</p>
          </div>
        </article>
        <div className="flex gap-2 ">
          <MainButton onClick={() => console.log("edit")}>Editar</MainButton>
          <SecondaryButton onClick={() => console.log("delete")}>
            Eliminar
          </SecondaryButton>
        </div>
      </section>
    </>
  );
}
