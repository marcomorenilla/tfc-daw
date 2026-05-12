import { useState } from "react";

export function CollectionFilter({
  onInputChange,
  onSelectionChange,
  onReverseClick,
}: any) {
  const [isClicked, setIsClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = ({ target }: any) => {
    const { value } = target;
    onInputChange(value);
    setInputValue(value);
  };

  const handleSelectionChange = ({ target }: any) => {
    const { value } = target;
    onSelectionChange(value);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    onReverseClick();
  };

  const handleChecked = () => {
    console.log("click");
    setIsChecked(!isChecked);
    const selectionValue = isChecked ? "unfiltered" : "booked";
    onSelectionChange(selectionValue);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    onInputChange(inputValue);
  };
  return (
    <section className="mb-4 ps-3">
      <form
        id="filterForm"
        onSubmit={handleSubmit}
        className="relative flex flex-wrap items-center justify-between gap-2">
        <section className="group relative grow-2">
          <label htmlFor="textFilter"></label>
          <input
            type="text"
            onChange={handleInputChange}
            value={inputValue}
            name="textFilter"
            className="group w-full rounded-xl border border-gray-500 py-3 ps-15 text-gray-500 outline-none focus:ring-2 focus:ring-teal-600"
            placeholder="Buscar por nombre o ID... "
            id="textFilter"
          />
          <svg
            width="30px"
            className="absolute top-2 left-2 fill-gray-500 stroke-gray-500 group-focus-within:fill-teal-600"
            height="30px"
            viewBox="-2.64 -2.64 29.28 29.28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="0">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke=""
              strokeWidth="0.048"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z"
              />{" "}
            </g>
          </svg>
        </section>
        <section className="">
          <select
            onChange={handleSelectionChange}
            className="cursor-pointer rounded-xl border border-gray-500 px-5 py-4 text-gray-500 focus:text-[bg-teal-600] focus:ring-2 focus:ring-teal-600"
            name="orderCondition"
            id="orderCondition">
            <option value="unfiltered">
              Selecciona criterio de ordenación...
            </option>
            <option value="rate">Ordenar por valoración</option>
            <option value="name">Ordenar por nombre</option>
            <option value="posts">Ordenar por menciones</option>
          </select>
        </section>
        <section
          onClick={handleClick}
          className="group flex-none cursor-pointer rounded-xl border border-gray-500 p-2 hover:border-teal-600 hover:bg-gray-300">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            className={`${isClicked ? "rotate-180" : ""}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="Edit / Sort_Descending">
              <path
                id="Vector"
                d="M4 17H16M4 12H13M4 7H10M18 13V5M18 5L21 8M18 5L15 8"
                className="stroke-gray-500 group-hover:stroke-teal-600"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </section>
        <section
          onClick={handleChecked}
          tabIndex={-1}
          className={`group flex flex-1 cursor-pointer items-center justify-center gap-5 rounded-xl border px-2 py-3 ${isChecked ? "border-teal-600" : "border-gray-500"}`}>
          <div
            className={`flex size-5 items-center justify-center rounded-sm border border-slate-500 ${isChecked ? "bg-teal-600 text-white border-teal-500" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${isChecked ? "block" : "hidden"} stroke-3`}
              aria-hidden="true">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </div>
          <p className={`${isChecked ? "text-teal-600" : "text-gray-500"} `}>
            Reservadas
          </p>
        </section>
      </form>
    </section>
  );
}
