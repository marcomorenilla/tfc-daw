import React, { useEffect, useRef, useState } from "react"

const fakeDbUsers = [
    {
        id: '1',
        name: "fake",
        surname: "fake demo example1",
        email: "fake@gmail.com",
        phone: "655565556555",
        rol: "Admin",
        disabled: false,
        super: false
    }
]

type User = {
    id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    rol: string,
    disabled: boolean,
    super: boolean

}

export const AdminPage = () => {

    const labelClassName: string = "text-2xl font-bold text-left text-gray-800"
    const inputClassName: string = "rounded-sm border  border-blue-500 focus:shadow-lg focus:shadow-blue-500"

    const [users, setUsers] = useState(fakeDbUsers)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (isOpen){
            ref.current?.showModal()
        } else {
            ref.current?.close()
        
        }
    }, [isOpen])





    const addUser = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(users);
        const formData = new FormData(e.currentTarget);

        setUsers([...users, {
            id: String(Date.now()),
            name: formData.get('name') as string,
            surname: formData.get('surname') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            rol: "User",
            disabled: false,
            super: false
        }])
        e.target.reset()
    }

    const openModal = (user: User) => {
        setSelectedUser(user)
        setIsOpen(true)
    }

    const closeModal = () => {
        setSelectedUser(null)
        setIsOpen(false)
    }



    const editForm = (user: User) => {
        setIsEditing(true)

    }




    const editUser = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    const deleteUser = (user: User | null) => {

        if (user) {
            setUsers(users.filter(dbUser => dbUser.id !== user.id))

        }

        setSelectedUser(null)

    }



    return (<>

        <h1 className="text-center text-2xl font-bold">Admin Page</h1>

        <section id="user-form-section" className="flex flex-col mt-4 justify-center items-center gap-4">
            <form onSubmit={addUser} id="user-form" className=" flex border border-gray-200 rounded-sm p-2 flex-col gap-2 w-1/2 shadow-lg items-start  w-fit px-20 py-10">

                <label htmlFor="name" className="text-2xl font-bold  text-gray-800">Nombre:</label>
                <input type="text" name="name" id="name" className="rounded-sm border border-blue-500 focus:shadow-lg focus:shadow-blue-500" />

                <label htmlFor="surname" className="text-2xl font-bold  text-gray-800">Apellido:</label>
                <input type="text" name="surname" id="surname" className="rounded-sm border border-blue-500 focus:shadow-lg focus:shadow-blue-500" />

                <label htmlFor="email" className={labelClassName}>Email:</label>
                <input type="email" name="email" id="email" className={inputClassName} />


                <label htmlFor="phone" className={labelClassName}>Phone:</label>
                <input type="text" name="phone" id="phone" className={inputClassName} />

                <label htmlFor="pass" className={labelClassName}>Password:</label>
                <input type="password" name="pass" id="pass" className={inputClassName} />

                <div className="flex gap-3  justify-center items-center flex-wrap">
                    <input type="checkbox" name="super" id="super" />
                    <label htmlFor="super" className="text-semibold">Super user</label>

                    <input type="checkbox" name="disabled" id="disabled" />
                    <label htmlFor="disabled" className="text-semibold">Disabled</label>
                </div>

                <div className="flex flex-wrap justify-center self-center items-center">
                    <button type="submit" className="text-white bg-blue-500 font-bold rounded-sm p-3 hover:bg-blue-700">Añadir usuario</button>
                </div>

            </form>

        </section>
        <section className="mt-5 flex flex-col justify-center items-center gap-4">
            <div className="mx-auto w-fit rounded-lg overflow-hidden">
                <table className="table-auto">
                    <thead className="">
                        <tr>
                            <th className="bg-blue-500 text-white text-xl p-2">Nombre</th>
                            <th className="bg-blue-500 text-white text-xl p-2">Apellidos</th>
                            <th className="bg-blue-500 text-white text-xl p-2">Email</th>
                            <th className="bg-blue-500 text-white text-xl p-2">Teléfono</th>
                            <th className="bg-blue-500 text-white text-xl p-2">Rol</th>
                            <th className="bg-blue-500 text-white text-xl p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody >

                        {
                            users.map(user => {
                                return (
                                    <tr key={user.id} className="odd:bg-blue-100 text-lg">
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.surname}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.phone}</td>
                                        <td className="p-2">{user.rol}</td>
                                        <td className="p-2 flex justify-center gap-2">
                                            <img onClick={() => { openModal(user) }} className="size-5 hover:size-7 transition-all duration-300 ease-in-out" src="delete.svg" alt="Eliminar" />
                                            <img onClick={() => editForm(user)} className="size-5 hover:size-7 transition-all duration-300 ease-in-out" src="edit.svg" alt="Editar" />
                                        </td>
                                    </tr>)

                            })
                        }

                    </tbody>


                </table>
            </div>

        </section>
        <dialog ref={ref} className="fixed self-center justify-self-center rounded-sm w-fit">
            <form method="dialog" className="p-4">
                <h2 className="font-bold text-2xl text-center p-4">¿Estás seguro de borrar a {selectedUser?.name}?</h2>
                <p className="text-xl mb-4">Esta acción es de caracter irreversible, no se podrá volver a recuperar al usuario</p>

                <div className="flex justify-center  gap-2">
                    <button type="submit" 
                    onClick={() => closeModal()}
                    className=" text-red-500 border border-red-500  rounded-sm font-bold py-1 px-3 hover:bg-red-700 hover:text-white">No</button>

                    <button
                        type="submit"
                        onClick={() => deleteUser(selectedUser)}
                        className="bg-red-500 text-white  rounded-sm font-bold py-1 px-3 hover:bg-red-700"
                    >
                        Sí
                    </button>
                </div>
            </form>
        </dialog>

    </>


    )
}