import { MainButton } from "../shared/MainButton";
import { SecondaryButton } from "../shared/SecondaryButton";

export function ProfileInfo({ user, isEditing }: any) {
  return (
    <section className={`items-center animate-opacity flex-col gap-7`}>
      <article className="flex flex-col mt-5 gap-5">
        <div>
          <h2 className="text-xl text-slate-500/80 font-semibold ">Nombre:</h2>
          <p className="text-lg text-slate-800">{user.name}</p>
        </div>
        <div>
          <h2 className="text-xl text-slate-500/80 font-semibold ">
            Apellido:
          </h2>
          <p className="text-lg text-slate-800">{user.surname}</p>
        </div>
        <div>
          <h2 className="text-xl text-slate-500/80 font-semibold ">Email:</h2>
          <p className="text-lg text-slate-800">{user.email}</p>
        </div>
        <div>
          <h2 className="text-xl text-slate-500/80 font-semibold ">
            Teléfono:
          </h2>
          <p className="text-lg text-slate-800">{user.phone}</p>
        </div>
      </article>
    </section>
  );
}
