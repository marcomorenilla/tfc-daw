export function ForumCard({ title, onClick }: any) {
  const handleClick = () => {
    onClick(title);
  };
  return (
    <article
      onClick={handleClick}
      className="rounded-xl  cursor-pointer hover:text-white text-4xl bg-linear-to-r from-teal-500 p-2  size-80 to-teal-300 font-bold text-indigo-600 flex justify-center items-center">
      {title}
    </article>
  );
}
