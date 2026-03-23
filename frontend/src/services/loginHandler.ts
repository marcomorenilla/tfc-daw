interface LoginCredentials {
  username: string;
  password: string;
}

export async function handleLogin(credentials: LoginCredentials, apiUrl: string) {

  const formData = new URLSearchParams();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData 
    });

    if (!response.ok) {
      throw new Error(`Error en el login: ${response.status}`);
    }

    const data = await response.json();
    console.log("Respuesta del servidor:", data);
    return data;

  } catch (error) {
    console.error("Error en handleLogin:", error);
    throw error; 
  }
}