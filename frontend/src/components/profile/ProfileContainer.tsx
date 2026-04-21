import { $user } from "@/store/authStore";
import { use, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { MainButton } from "../shared/MainButton";
import { SecondaryButton } from "../shared/SecondaryButton";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileEditForm } from "./ProfileEditForm";
import { set } from "astro:schema";
import { navigate } from "astro:transitions/client";
export function ProfileContainer({}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const user: any = useStore($user);
  const onEditClick = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);
  const handleConfirm = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8200/users/api/v1/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        $user.set(null);
        navigate("/login");
      })
      .catch((err) => console.log(err));
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-2 items-center  justify-center  mb-5">
        <img
          src={"https://tfc.localhost/images/user.jpg"}
          alt="imagen de usuario"
          loading="lazy"
          className="size-50 rounded-full"
        />
        <div className="flex gap-2 ">
          <MainButton onClick={onEditClick}>
            {isEditing ? "Cancelar" : "Editar"}
          </MainButton>
          <SecondaryButton onClick={() => setIsDialogOpen(true)}>
            Eliminar
          </SecondaryButton>
        </div>
      </div>
      <div className=" flex flex-wrap lg:flex-nowrap justify-center  items-start">
        {!isEditing && (
          <ProfileInfo
            user={user}
            isEditing={isEditing}
            onEditClick={onEditClick}
          />
        )}

        {isEditing && (
          <aside>
            <ProfileEditForm handleConfirm={handleConfirm} />
          </aside>
        )}
      </div>
      <dialog
        ref={dialogRef}
        onClose={() => setIsDialogOpen(false)}
        className="max-w-none max-h-none  bg-transparent backdrop-blur-lg h-full w-full fixed inset-0 ">
        <div className="animate-opacity  bg-teal-600/50 h-full w-full flex justify-center border border-black items-center">
          <div className="bg-white rounded-xl border-2 border-teal-600 flex flex-col items-center justify-center gap-4 p-3">
            <h2 className="text-xl text-teal-600 font-bold">
              La acción que vas a realizar no se puede recuperar
            </h2>
            <h2 className="text-xl text-teal-600 font-bold">
              ¿Estás seguro de que quieres continuar?
            </h2>
            <div className="flex gap-2 self-end">
              <MainButton onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </MainButton>
              <SecondaryButton onClick={handleDelete}>Aceptar</SecondaryButton>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
