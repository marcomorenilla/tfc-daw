export function SecondaryButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 rounded-xl p-3 hover:bg-red-700 text-white font-semibold cursor-pointer">
      {children}
    </button>
  );
}
