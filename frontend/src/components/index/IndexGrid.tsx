import React from "react";
import { StarIcon } from "../shared/StarIcon";
import BikeCard from "../shared/BikeCard";

export default function IndexGrid({ bikes }: any) {
  return (
    <section className="max-w-screen place-content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {bikes.map((bike: any) => (
        <BikeCard bike={bike} />
      ))}
    </section>
  );
}
