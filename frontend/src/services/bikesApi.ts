export async function getBikes() {
  try {
    const res = await fetch("http://localhost:8200/bikes/api/v1/");
    if (res.ok) {
      const data = await res.json();
      return data.bikes;
    } else {
      throw new Error("error haciendo fetch", { cause: res.statusText });
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}
