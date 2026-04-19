import { atom } from "nanostores";

export const $bikes = atom(null);
export const $isLoading = atom<boolean>(true);
export const $errorMsg = atom(null);

export async function getBikes() {
  $isLoading.set(true);
  $errorMsg.set(null);
  try {
    const res = await fetch("http://localhost:8200/bikes/api/v1/");
    if (res.ok) {
      const data = await res.json();
      $bikes.set(data.bikes);
      $isLoading.set(false);
    } else {
      throw new Error("error haciendo fetch", { cause: res.statusText });
    }
  } catch (error: any) {
    $bikes.set(null);
    $errorMsg.set(error.message);
    console.log(error);
  }
}
