import React from "react";

interface MenuProps {
  handleClick: () => void;
}

export function MenuList({ handleClick }: MenuProps) {
  return (
    <section className="text-xl lg:hidden flex  items-start fixed left-2 top-2 m-0 p-3 border rounded-xl animate-opacity  gap-5 [&_li]:focus:text-amber-200 text-teal-600 bg-white">
      <svg
        onClick={handleClick}
        width="60px"
        height="60px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
          stroke="#009689"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
          stroke="#009689"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <ul className=" [&_li]:p-2 border-2 rounded-xl border-amber-200">
        <a href="/">
          <li className="border-b-2  border-amber-200">Inicio</li>
        </a>
        <a href="/catalog">
          <li className="border-b-2  border-amber-200">Catálogo</li>
        </a>
        <a href="/forum">
          <li>Foro</li>
        </a>
      </ul>
    </section>
  );
}
