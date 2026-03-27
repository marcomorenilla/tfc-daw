import type { Dispatch, SetStateAction } from "react";

interface ErrorModalProps {
  readonly handleClose: () => void;
  readonly message: string;
}

export function ErrorModal({ handleClose, message }: ErrorModalProps) {
  return (
    <section className="animate-opacity h-screen fixed top-0 flex items-center justify-center z-10 inset-0 backdrop-blur-lg bg-amber-200/10 w-screen overflow-hidden">
      <div className="p-10 h-fit  w-1/2 rounded-xl bg-white font bold ">
        <h1 className="font-bold text-teal-600 text-5xl text-center mb-10 ">
          Ups!
        </h1>
        <h2 className="text-gray-600 mb-5">{message}</h2>
        <button
          onClick={handleClose}
          className="mt-2 w-full p-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700">
          Cerrar
        </button>
      </div>
    </section>
  );
}
