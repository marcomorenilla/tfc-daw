export function ErrorMsg({ children }: any) {
  return (
    <h2 className="text-center w-full text-3xl text-blue-500 animate-opacity font-bold">
      {children}
    </h2>
  );
}
