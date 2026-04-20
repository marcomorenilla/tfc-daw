import { $user } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { MainButton } from "../shared/MainButton";
import { SecondaryButton } from "../shared/SecondaryButton";
import { navigate } from "astro:transitions/client";
import { set } from "astro:schema";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileEditForm } from "./ProfileEditForm";
export function ProfileContainer({}) {
  const [isEditing, setIsEditing] = useState(false);
  const user: any = useStore($user);
  const onEditClick = () => {
    setIsEditing(!isEditing);
  };

  console.log(user);

  const handleConfirm = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-2 items-center  justify-center  mb-5">
        <img
          src={"/user.jpg"}
          alt="imagen de usuario"
          loading="lazy"
          className="size-50 rounded-full"
        />
        <div className="flex gap-2 ">
          <MainButton onClick={onEditClick}>
            {isEditing ? "Cancelar" : "Editar"}
          </MainButton>
          <SecondaryButton onClick={() => console.log("delete")}>
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
    </>
  );
}
