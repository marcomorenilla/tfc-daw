import React from "react";
import { Logo } from "./Logo";
export function DesktopNavBar() {
  return (
    <>
      <section className="hidden lg:block rounded-full object-top-left overflow-hidden">
        <a href="/">
          <Logo />
        </a>
      </section>
      <section>
        <ul className="hidden  lg:flex text-xl gap-5 [&_li]:hover:text-amber-200 [&_li]:hover:cursor-pointer">
          <a href="/">
            <li>Inicio</li>
          </a>
          <a href="/catalog">
            <li>Catálogo</li>
          </a>
          <a href="/forum">
            <li>Foro</li>
          </a>
        </ul>
      </section>
    </>
  );
}
