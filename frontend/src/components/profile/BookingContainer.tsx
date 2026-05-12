import { useStore } from "@nanostores/react";
import { ProfileHeader } from "./ProfileHeader";
import { $bikes, getBikes } from "@/store/bikesStore";
import { $user } from "@/store/authStore";
import { $bookings, getBookingsByUser } from "@/store/bookingStore";
import { use, useEffect, useRef, useState } from "react";
import { MainButton } from "../shared/MainButton";
import { SecondaryButton } from "../shared/SecondaryButton";
import { set } from "astro:schema";

export function BookingContainer() {
  const bikes: any = useStore($bikes);
  const user: any = useStore($user);
  const bookings: any = useStore($bookings);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [bikeToDelete, setBikeToDelete] = useState<any>(null);

  const handleDelete = () => {
    fetch(`https://tfc.localhost/bookings/api/v1/${bikeToDelete}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getBookingsByUser(user.id);
      })
      .catch((err) => console.log(err));
    setIsDialogOpen(false);
  };

  const handleOpenDialog = (bookingId: Number) => {
    setIsDialogOpen(true);
    setBikeToDelete(bookingId);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setBikeToDelete(null);
  };

  useEffect(() => {
    getBikes();
    getBookingsByUser(user.id);
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);

  console.log(bikes);
  console.log(user);
  console.log(bookings);
  return (
    <>
      <ProfileHeader>Gestiona tus reservas</ProfileHeader>
      {!bookings ||
        (bookings.length == 0 && (
          <p className="text-lg font-bold border text-center py-5 rounded-xl bg-amber-200/20 border-amber-500 text-amber-500">
            No hay reservas que mostrar
          </p>
        ))}
      <section className="flex flex-col items-center justify-center gap-3 w-full">
        {bookings &&
          bookings.map((booking: any) => {
            const bike = bikes.find(
              (bike: any) => bike["_id"] == booking.bike_id,
            );
            return (
              <article
                className="flex flex-wrap w-full  overflow-hidden justify-between items-between text-slate-600 border border-slate-200 rounded-xl "
                key={booking.id}>
                <div className="">
                  <img
                    className="size-30"
                    src={bike.img}
                    alt="imagen de bicicleta"
                    loading="lazy"
                  />
                </div>
                <div className="px-2 flex items-center justify-center">
                  {bike.name}
                </div>
                <div className="border-l border-slate-200 flex p-2  flex-col justify-center">
                  <p className="font-bold text-slate-600">Inicio:</p>
                  <p>{booking.start_date}</p>
                </div>
                <div className="flex border-l border-slate-200 flex-col justify-center p-2">
                  <p className="font-bold text-slate-600">Fin:</p>
                  <p>{booking.end_date}</p>
                </div>
                <div className="border-l flex items-center justify-center border-slate-200  px-10">
                  <button
                    onClick={() => {
                      handleOpenDialog(booking.id);
                    }}
                    className="border  p-1 hover:scale-110 font-bold  hover:bg-red-500  hover:text-white  transition-all duration-150 ease-in-out cursor-pointer border-red-500 text-red-500 rounded-xl">
                    Eliminar
                  </button>
                </div>
              </article>
            );
          })}
      </section>
      <dialog
        ref={dialogRef}
        onClose={handleCloseDialog}
        className="max-w-none max-h-none  bg-transparent backdrop-blur-lg h-full w-full fixed inset-0 ">
        <div className="animate-opacity  bg-teal-600/50 h-full w-full flex justify-center border border-black items-center">
          <div className="bg-white rounded-xl border-2 border-teal-600 flex flex-col items-center justify-center gap-4 p-3">
            <h2 className="text-xl text-teal-600 font-bold">
              La acción que vas a realizar no se puede recuperar
            </h2>
            <h2 className="text-xl text-teal-600 font-bold">
              ¿Estás seguro de que quieres continuar?
            </h2>
            <div className="flex gap-2 self-end">
              <MainButton onClick={handleCloseDialog}>Cancelar</MainButton>
              <SecondaryButton onClick={handleDelete}>Aceptar</SecondaryButton>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
