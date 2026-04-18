import { atom } from "nanostores";

export const $apiLoginUrl = atom(
  `${import.meta.env.PUBLIC_URL_BASE}/users/api/v1/token`,
);
export const $apiRegisterUrl = atom(
  `${import.meta.env.PUBLIC_URL_BASE}/users/api/v1/register`,
);
export const $user = atom(null);
export const $isLoading = atom(true);
