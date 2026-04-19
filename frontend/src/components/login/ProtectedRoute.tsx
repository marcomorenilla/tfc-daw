import { $user, $isLoading } from "@/store/authStore";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { Loader } from "../shared/Loader";
import { navigate } from "astro:transitions/client";
export const ProtectedRoute = ({ children }: any) => {
  const isLoading = useStore($isLoading);
  const user = useStore($user);

  useEffect(() => {
    fetch("http://localhost:8200/users/api/v1/validate", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          $user.set(data);
          $isLoading.set(false);
        } else {
          $user.set(null);
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && children}
    </>
  );
};
