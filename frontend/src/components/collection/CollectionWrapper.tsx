import { useEffect, useMemo, useState } from "react";
import BikeGrid from "../bikes/BikeGrid";
import { CollectionFilter } from "./CollectionFilter";

export default function CollectionWrapper({ bikes: initialBikes }: any) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

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
    }

    return result;
  }, [filterText, sortCriteria, isReverse, initialBikes]);

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
      <BikeGrid bikes={displayedBikes} />
    </>
  );
}
