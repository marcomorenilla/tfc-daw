import { atom } from "nanostores";

export const $forums = atom(null);
export const $isLoading = atom<boolean>(true);
export const $errorMsg = atom(null);

export async function getForums() {
  console.log("getForums");
  $isLoading.set(true);
  $errorMsg.set(null);
  try {
    const res = await fetch("http://localhost:8200/forum/api/v1/", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      $forums.set(data.forums);
      $isLoading.set(false);
    } else {
      throw new Error("error haciendo fetch", { cause: res.statusText });
    }
  } catch (error: any) {
    $forums.set(null);
    $errorMsg.set(error.message);
    console.log(error);
  }
}
