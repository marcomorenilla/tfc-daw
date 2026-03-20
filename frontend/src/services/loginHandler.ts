import { SETTINGS } from '../core/settings';


interface LoginCredentials {
  username: string;
  password: string;
}

export async function handleLogin(credentials: LoginCredentials) {
  const url = SETTINGS.URL_BASE;

  const formData = new URLSearchParams();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData 
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error en el login: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error en handleLogin:", error);
    throw error; 
  }
}