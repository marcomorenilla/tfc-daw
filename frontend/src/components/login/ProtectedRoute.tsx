import { $user, $isLoading } from "@/store/authStore";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
export const ProtectedRoute = ({ children }: any) => {
  const isLoading = useStore($isLoading);
  useEffect(() => {
    fetch("http://localhost:8200/users/api/v1/validate", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => $user.set(data))
      .then(() => $isLoading.set(false))
      .catch((err) => console.log(err));
  }, []);

  return <>{!isLoading && children}</>;
};
