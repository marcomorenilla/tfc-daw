import React from "react";
import { StarIcon } from "./StarIcon";

export default function BikeCard({ bike }: any) {
  return (
    <article
      key={bike["_id"]}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
      <div className="aspect-16/10 overflow-hidden">
        <img
          src={bike.img}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {bike.name}
          </h2>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
            <StarIcon filled={true} />
            <span className="text-sm font-bold text-slate-700">
              {bike.rate}
            </span>
          </div>
        </div>

        <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < bike.rate} />
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">{bike.posts} Reseñas</span>
          </div>

          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn">
            Ver más
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
