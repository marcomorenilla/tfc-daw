export function ProfileHeader({ children }: any) {
  return (
    <section className="text-center mb-16">
      <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
        Tu <span className="text-blue-600">perfil</span>
      </h1>
      <p className="text-slate-500 text-lg max-w-2xl mx-auto">{children}</p>
    </section>
  );
}
