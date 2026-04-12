export function ForumTopic({ topic }: any) {
  const { category, date, title, author, replies } = topic;
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <article
      onClick={handleClick}
      className="group  border  rounded-xl p-3  w-full border-gray-300 hover:shadow-xl bg-white hover:shadow-blue-500">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 text-xs font-semibold text-blue-600 -blue-50 rounded-full">
            {category}
          </span>
          <span className="text-sm text-slate-400">{date}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 cursor-pointer group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Iniciado por{" "}
          <span className="font-medium text-slate-700">{author}</span>
        </p>
      </div>

      <div className="mt-4 sm:mt-0 flex items-center gap-6">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-900">{replies}</p>
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Respuestas
          </p>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 text-slate-400 group-hover:text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
