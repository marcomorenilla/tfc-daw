export function MainButton({ children, onClick, type = "button" }: any) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-teal-600 cursor-pointer rounded-xl p-3 hover:bg-teal-700 text-white font-semibold">
      {children}
    </button>
  );
}
