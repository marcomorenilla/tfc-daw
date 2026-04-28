import { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileContainer } from "./ProfileContainer";
import { BookingContainer } from "./BookingContainer";

export function ProfileWrapper() {
  const [isProfile, setIsProfile] = useState(true);
  const focusStyles = "border-2 border-teal-600 bg-white text-teal-600";
  const unFocusStyles = "bg-teal-600 text-white";
  return (
    <section className="flex h-auto">
      <aside className="flex  flex-col bg-teal-600 min-h-screen w-2/6 md:w-1/6">
        <button
          onClick={() => setIsProfile(true)}
          className={`${isProfile ? focusStyles : unFocusStyles} font-bold p-3 text-lg cursor-pointer`}>
          Perfil
        </button>
        <button
          onClick={() => setIsProfile(false)}
          className={`${isProfile ? unFocusStyles : focusStyles} font-bold p-3 text-lg cursor-pointer`}>
          Reservas
        </button>
      </aside>
      <article className="py-4 border px-4 w-5/6">
        {isProfile && <ProfileContainer />}
        {!isProfile && <BookingContainer />}
      </article>
    </section>
  );
}
