import React from "react";
interface BurgerProps {
  handleClick: () => void;
}
export function BurgerIcon({ handleClick }: BurgerProps) {
  return (
    <section className="lg:hidden hover:scale-[1.2]  cursor-pointer m-0 p-3 fixed animate-opacity top-0 left-0">
      <svg
        onClick={handleClick}
        width="80px"
        height="80px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 12H18"
          stroke="#f5f5f5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 17H11"
          stroke="#f5f5f5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 7H15"
          stroke="#f5f5f5"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </section>
  );
}
