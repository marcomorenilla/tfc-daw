interface RegisterData {
    name:string;
    surname:string;
  email: string;
  password: string;
  phone:string;

}

export async function handleRegister(userData: RegisterData, apiUrl: string) {


  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData) 
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