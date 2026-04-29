import React, { use, useEffect, useRef, useState } from "react";
import { StarIcon } from "./StarIcon";
import { useStore } from "@nanostores/react";
import { $user } from "@/store/authStore";
import { $isBookingSucceded, makeBooking } from "@/store/bookingStore";

export default function BikeCard({ bike }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const user: any = useStore($user);
  const isBookingSucceded = useStore($isBookingSucceded);
  const dialogSuccessRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (isBookingSucceded) {
      dialogSuccessRef.current?.showModal();
      setTimeout(() => {
        $isBookingSucceded.set(false);
      }, 2000);
    } else {
      dialogSuccessRef.current?.close();
    }
  }, [isBookingSucceded]);

  const handleReservation = () => {
    console.log("click");
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const init = formData.get("init");
    const end = formData.get("end");
    console.log(init, end);
    if (init != "" && end != "") {
      const payload = {
        user_id: user.id,
        bike_id: bike["_id"],
        start_date: init,
        end_date: end,
      };
      console.log(payload);
      makeBooking(payload);
    }
    setIsDialogOpen(false);
  };
  return (
    <>
      <article
        key={bike["_id"]}
        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
        <div className="aspect-16/10 overflow-hidden">
          <img
            src={bike.img}
            alt={bike.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        <div className="p-6 flex flex-col grow">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {bike.name}
            </h2>
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
              <StarIcon filled={true} />
              <span className="text-sm font-bold text-slate-700">
                {bike.rate}
              </span>
            </div>
          </div>

          <div className="flex gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < bike.rate} />
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-500/20 flex justify-between items-center text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">{bike.posts} Reseñas</span>
            </div>

            <button
              onClick={handleReservation}
              className={`${user ? "opacity-100" : "opacity-50 pointer-events-none"} border cursor-pointer rounded-xl p-2 text-sm font-semibold text-blue-600 hover:scale-110 transition-all duration-300 ease-in-out`}>
              Reservar
            </button>
          </div>
          {!user && (
            <p className="text-sm text-center text-amber-500/80 mt-1 font-semibold">
              Inicia sesión para reservar
            </p>
          )}
        </div>
      </article>
      <dialog
        ref={dialogRef}
        onClose={handleClose}
        className="max-w-none max-h-none bg-transparent">
        <div className="h-screen flex w-screen justify-center items-center">
          <form
            className="bg-white  flex text-slate-600 flex-col items-center justify-center gap-5 rounded-xl p-4 "
            method="dialog"
            onSubmit={handleSubmit}>
            <h1 className="text-xl font-bold">Selecciona fechas de reserva</h1>
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="init">
                Fecha de inicio:
              </label>
              <input name="init" id="init" type="date" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="end">
                Fecha de fin:
              </label>
              <input name="end" id="end" type="date" />
            </div>
            <div className="flex gap-2 w-full items-center justify-center">
              <button
                type="submit"
                className=" cursor-pointer hover:bg-blue-600 rounded-xl p-2 text-sm font-semibold bg-blue-500 text-white hover:scale-110 transition-all duration-300 ease-in-out">
                Confirmar
              </button>
              <button
                type="button"
                onClick={handleClose}
                className=" border hover:bg-blue-100 cursor-pointer rounded-xl p-2 text-sm font-semibold text-blue-600 hover:scale-110 transition-all duration-300 ease-in-out">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog
        ref={dialogSuccessRef}
        className="max-w-none max-h-none bg-transparent">
        <div className="h-screen flex w-screen justify-center items-center">
          <div className="bg-white p-10 rounded-xl animate-bt">
            <p className="text-green-600 font-bold  text-2xl text-center">
              Reserva realizada con éxito
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
