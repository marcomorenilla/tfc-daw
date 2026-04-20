import { MainButton } from "../shared/MainButton";
import { $user } from "@/store/authStore";
import { useStore } from "@nanostores/react";
import { useState } from "react";

export function ProfileEditForm({ handleConfirm }: any) {
  const user: any = useStore($user);
  const [initialValues, setInitialValues] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInitialValues({ ...initialValues, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const surname = formData.get("surname");
    const email = formData.get("email");
    const phone = formData.get("phone");

    const payload = {
      email: email,
      name: name,
      surname: surname,
      phone: phone,
      disabled: false,
      is_superuser: true,
      password: "string",
    };

    fetch(`http://localhost:8200/users/api/v1/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => $user.set(data.user))
      .catch((err) => console.log(err));
    handleConfirm();
  };

  return (
    <form className="w-auto flex flex-col gap-3  " onSubmit={handleSubmit}>
      <section className="relative mt-6 flex flex-col gap-2">
        <label htmlFor="name" className="font-medium text-xl text-gray-500">
          Nombre:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={initialValues.name || ""}
          placeholder="Tu nombre"
          className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
        />
      </section>

      <section className="relative flex flex-col gap-2">
        <label htmlFor="surname" className="font-medium text-xl text-gray-500">
          Apellido:
        </label>
        <input
          type="text"
          name="surname"
          onChange={handleChange}
          value={initialValues.surname || ""}
          id="surname"
          placeholder="Tu apellido"
          className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
        />
      </section>

      <section className="relative flex flex-col gap-2">
        <label htmlFor="email" className="font-medium text-xl text-gray-500">
          Correo electrónico:
        </label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          id="email"
          value={initialValues.email || ""}
          placeholder="ejemplo@email.com"
          className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
        />
      </section>

      <section className="relative flex flex-col gap-2">
        <label htmlFor="name" className="font-medium text-xl text-gray-500">
          Teléfono:
        </label>
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          id="phone"
          value={initialValues.phone || ""}
          placeholder="+34 - 666 666 666"
          className="border border-gray-200 rounded-xl p-3 w-full bg-white outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400"
        />
      </section>
      <section className="relative flex flex-col mt-5 gap-2">
        <MainButton onClick={() => {}} type="submit">
          Guardar
        </MainButton>
      </section>
    </form>
  );
}
