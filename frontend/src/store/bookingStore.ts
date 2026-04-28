import { atom } from "nanostores";

export const $bookings = atom(null);
export const $isLoading = atom<boolean>(true);
export const $errorMsg = atom(null);
export const $isBookingSucceded = atom<boolean>(false);

export async function getBookings() {
  $isLoading.set(true);
  $errorMsg.set(null);
  try {
    const res = await fetch("http://localhost:8200/bookings/api/v1/");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      $bookings.set(data);
      $isLoading.set(false);
    } else {
      throw new Error("error haciendo fetch", { cause: res.statusText });
    }
  } catch (error: any) {
    $bookings.set(null);
    $errorMsg.set(error.message);
    console.log(error);
  }
}

export async function makeBooking(data: any) {
  $isLoading.set(true);
  $errorMsg.set(null);
  try {
    const res = await fetch("http://localhost:8200/bookings/api/v1/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      $isBookingSucceded.set(true);
      $isLoading.set(false);
    } else {
      throw new Error("error haciendo fetch", { cause: res.statusText });
    }
  } catch (error: any) {
    $bookings.set(null);
    $errorMsg.set(error.message);
    console.log(error);
  }
}
export async function getBookingsByUser(userId: Number) {
  $isLoading.set(true);
  $errorMsg.set(null);
  try {
    const res = await fetch(
      `http://localhost:8200/bookings/api/v1/user/${userId}`,
    );
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      $bookings.set(data);
      $isLoading.set(false);
    } else {
      throw new Error("error haciendo fetch", { cause: res.statusText });
    }
  } catch (error: any) {
    $bookings.set(null);
    $errorMsg.set(error.message);
    console.log(error);
  }
}
