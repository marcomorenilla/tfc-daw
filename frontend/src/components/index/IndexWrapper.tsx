import { useEffect, useState } from "react";
import BikeGrid from "../bikes/BikeGrid";
import { Loader } from "../shared/Loader";
import { $bikes, $isLoading, $errorMsg, getBikes } from "@/store/bikesStore";
import { useStore } from "@nanostores/react";
import { ErrorMsg } from "../shared/ErrorMsg";

export function IndexWrapper() {
  const isLoading = useStore($isLoading);
  const errorMsg = useStore($errorMsg);

  const bikes: any = useStore($bikes);

  useEffect(() => asyncBikes(bikes), []);

  const asyncBikes = (bikes: any) => {
    getBikes();
  };

  return (
    <>
      {isLoading && !errorMsg && <Loader />}
      {!isLoading && !errorMsg && (
        <BikeGrid
          bikes={bikes.sort((a: any, b: any) => b.rate - a.rate).slice(0, 6)}
        />
      )}
      {errorMsg && <ErrorMsg>Ups! Algo no fue como debería</ErrorMsg>}
    </>
  );
}
