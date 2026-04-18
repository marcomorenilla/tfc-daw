export function MainButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-teal-600 cursor-pointer rounded-xl p-3 hover:bg-teal-700 text-white font-semibold">
      {children}
    </button>
  );
}
