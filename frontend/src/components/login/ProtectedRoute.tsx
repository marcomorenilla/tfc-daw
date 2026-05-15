import { $user, $isLoading } from "@/store/authStore";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { Loader } from "../shared/Loader";
import { navigate } from "astro:transitions/client";
export const ProtectedRoute = ({ children }: any) => {
  const isLoading = useStore($isLoading);
  const user = useStore($user);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    console.log("protegiendo ruta");
    fetch("https://tfc.localhost/users/api/v1/validate", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          $user.set(data);
          console.log("user", user);
        } else {
          console.log("protegiendo ruta");
          setIsErrored(true);
          $user.set(null);
        }
        $isLoading.set(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !isErrored && user && children}
      {!isLoading && isErrored && (
        <h2 className="text-5xl text-center font-bold text-blue-500">
          Necesitas iniciar sesión para ver el foro
        </h2>
      )}
    </>
  );
};
