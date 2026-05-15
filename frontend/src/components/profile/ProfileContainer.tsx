import { $user } from "@/store/authStore";
import { use, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { MainButton } from "../shared/MainButton";
import { SecondaryButton } from "../shared/SecondaryButton";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileEditForm } from "./ProfileEditForm";
import { set } from "astro:schema";
import { navigate } from "astro:transitions/client";
import { ProfileHeader } from "./ProfileHeader";
export function ProfileContainer({}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogImgRef = useRef<HTMLDialogElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImgDialogOpen, setIsImgDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const user: any = useStore($user);

  const onEditClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    handleImage();
  }, []);
  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);
  useEffect(() => {
    if (isDialogOpen) {
      dialogImgRef.current?.showModal();
    } else {
      dialogImgRef.current?.close();
    }
  }, [isImgDialogOpen]);
  const handleConfirm = () => {
    setIsEditing(false);
  };

  const handleInputImgChange = (e: any) => {
    console.log("cambiando imagen input", e.target.files[0]);
    setFile(e.target.files[0]);
    setIsUploading(true);
  };

  const handleImgSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (file && allowedTypes.includes(file.type)) {
      formData.append("image", file);
      const fileExtension = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExtension}`;
      formData.append("fileName", `${fileName}`);
      fetch(`http://localhost:8200/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          handleImage();
        })
        .catch((err) => console.log(err));
    }

    setIsUploading(false);
  };

  const handleImage = () => {
    fetch(`http://localhost:8200/minio/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const image = data.find(
          (item: any) => item.name.split(".")[0] == `${user.id}`,
        );
        if (image) {
          const cacheBuster = `?t=${new Date().getTime()}`;
          setImage(image.url + cacheBuster);
        } else {
          setImage("http://localhost:8200/images/user.jpg");
        }
      })
      .catch((err) => console.log(err));
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
      <ProfileHeader>Gestiona tu perfil</ProfileHeader>
      <div className="flex flex-col gap-3 p-2 items-center  justify-center  mb-5">
        <div className="relative">
          <img
            src={image || "http://localhost:8200/images/user.jpg"}
            alt="imagen de usuario"
            loading="lazy"
            className="size-50 rounded-full"
          />
          <form
            onSubmit={handleImgSubmit}
            className="flex flex-col items-center justify-center mt-2 gap-3">
            <label
              className="absolute top-0 -right-5 hover:bg-teal-700 hover:scale-120 transition-all duration-300 ease-in-out size-10 bg-teal-600 rounded-full cursor-pointer  flex items-center justify-center"
              htmlFor="avatar">
              <svg
                viewBox="0 0 24 24"
                width="25px"
                height="25px"
                version="1.1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"></path>{" "}
                  <path
                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"></path>{" "}
                </g>
              </svg>
              <input
                onChange={handleInputImgChange}
                id="avatar"
                className="hidden"
                name="avatar"
                accept="image/png, image/jpg, image/jpeg, image/webp"
                type="file"
              />
            </label>
            <button
              className={`${isUploading ? "flex" : "hidden"} text-white  font-bold p-3 hover:bg-teal-700 hover:scale-120 transition-all duration-300 ease-in-out  bg-teal-600 rounded-full cursor-pointer  items-center justify-center`}>
              Subir Imagen
            </button>
          </form>
        </div>
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
        {!isEditing && user && (
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
      <dialog
        ref={dialogImgRef}
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
