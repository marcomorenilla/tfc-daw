import React, { useState } from "react";
import { BurgerIcon } from "./BurgerIcon";
import { MenuList } from "./MenuList";

export function MobileNavBar() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {isVisible ? (
        <BurgerIcon handleClick={handleClick} />
      ) : (
        <MenuList handleClick={handleClick} />
      )}
    </>
  );
}
