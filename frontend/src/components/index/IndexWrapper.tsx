import React from "react";

const bikeObj = [
  {
    name: "Aurum Magma",
    img: "https://images.unsplash.com/es/fotos/bicicleta-de-carretera-negra-yjAFnkLtKY0",
    rate: 4,
    posts: 3,
  },
  {
    name: "Basso Diamante",
    img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2000&auto=format&fit=crop",
    rate: 5,
    posts: 4,
  },
  {
    name: "Berria Belador",
    img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2000&auto=format&fit=crop",
    rate: 3,
    posts: 7,
  },
  {
    name: "Giant TCR Advanced",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77891?q=80&w=2000&auto=format&fit=crop",
    rate: 5,
    posts: 15,
  },
  {
    name: "Factor Ostro VAM",
    img: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?q=80&w=2000&auto=format&fit=crop",
    rate: 4,
    posts: 9,
  },
  {
    name: "Cannondale SuperSix",
    img: "https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=2000&auto=format&fit=crop",
    rate: 5,
    posts: 3,
  },
];

const StarIcon = ({ filled }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

export default function IndexWrapper() {
  return (
    <section className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Nuestras <span className="text-blue-600">bicis</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Mira las últimas bicis valoradas por nuestros
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikeObj.map((bike, index) => (
            <article
              key={index}
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
                    <span className="text-sm font-medium">
                      {bike.posts} Reseñas
                    </span>
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
          ))}
        </section>
      </div>
    </section>
  );
}
