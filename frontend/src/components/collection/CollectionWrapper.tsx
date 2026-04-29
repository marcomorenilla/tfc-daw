import { useEffect, useMemo, useState } from "react";
import BikeGrid from "../bikes/BikeGrid";
import { CollectionFilter } from "./CollectionFilter";
import { Loader } from "../shared/Loader";
import { $bikes, $isLoading, $errorMsg, getBikes } from "@/store/bikesStore";
import { useStore } from "@nanostores/react";
import { $bookings, getBookingsByUser } from "@/store/bookingStore";
import { $user } from "@/store/authStore";
import { ErrorMsg } from "../shared/ErrorMsg";
export default function CollectionWrapper() {
  const [isFiltered, setIsFiltered] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  const initialBikes: any = useStore($bikes) || [];
  const isLoading: boolean = useStore($isLoading);
  const bookings: any = useStore($bookings);
  const user: any = useStore($user);
  const errorMsg: any = useStore($errorMsg);

  const asyncBikes = () => {
    getBikes();
  };

  useEffect(() => {
    asyncBikes();
    if (user) {
      getBookingsByUser(user.id);
    }
  }, []);

  useEffect(() => {
    if (sortCriteria == "unfiltered") setIsFiltered(false);
  }, [sortCriteria]);

  const displayedBikes = useMemo(() => {
    let result = [...initialBikes].filter((p: any) =>
      p.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    if (sortCriteria === "posts") {
      if (isReverse) {
        result.sort((a, b) => b.posts - a.posts);
      } else {
        result.sort((a, b) => a.posts - b.posts);
      }
    } else if (sortCriteria === "name") {
      if (isReverse) {
        result.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }
    } else if (sortCriteria === "rate") {
      if (isReverse) {
        result.sort((a, b) => b.rate - a.rate);
      } else {
        result.sort((a, b) => a.rate - b.rate);
      }
    } else if (sortCriteria === "booked") {
      if (bookings && bookings.length > 0) {
        result = bookings.map((booking: any) => {
          const bike = [...initialBikes].find(
            (bike: any) => bike["_id"] === booking.bike_id,
          );
          if (bike) return bike;
        });
        if (isReverse) {
          result.sort((a, b) => b.name.localeCompare(a.name));
        } else {
          result.sort((a, b) => a.name.localeCompare(b.name));
        }
      } else {
        result = [];
      }
    }
    return result;
  }, [filterText, sortCriteria, isReverse, initialBikes, bookings]);

  const handleInputChange = (value: string) => {
    setFilterText(value);
    setIsFiltered(value.trim() !== "");
  };

  const handleSelectionChange = (sortCriteria: any) => {
    const value = sortCriteria;
    if (value) setIsFiltered(true);
    setSortCriteria(value);
  };

  const handleReverse = () => {
    setIsReverse(!isReverse);
  };

  return (
    <>
      <CollectionFilter
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
        onReverseClick={handleReverse}
      />
      {isLoading && !errorMsg && <Loader />}
      {!isLoading && !errorMsg && <BikeGrid bikes={displayedBikes} />}
      {errorMsg && (
        <ErrorMsg>Ups! Parece que algo no está funcionando</ErrorMsg>
      )}
    </>
  );
}
