import type { Dispatch, SetStateAction } from "react";

interface ErrorModalProps {
  readonly setIsErrored: Dispatch<SetStateAction<boolean>>;
  readonly message: string;
}

export function ErrorModal({ setIsErrored, message }: ErrorModalProps) {
  const handleClick = () => {
    setIsErrored(false);
  };
  return (
    <section className="animate-opacity absolute flex items-center justify-center z-10 inset-0 backdrop-blur-lg bg-amber-200/10 w-screen h-screen overflow-hidden">
      <div className="p-10 h-fit  w-1/2 rounded-xl bg-white font bold ">
        <h1 className="font-bold text-teal-600 text-5xl text-center mb-10 ">
          Ups!
        </h1>
        <h2 className="text-gray-600 mb-5">{message}</h2>
        <button
          onClick={handleClick}
          className="mt-2 w-full p-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700">
          Cerrar
        </button>
      </div>
    </section>
  );
}
