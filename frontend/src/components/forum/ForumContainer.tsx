import { $user } from "@/store/authStore";
import { ForumTopic } from "./ForumTopic";
import { useStore } from "@nanostores/react";

export function ForumContainer({ initialTopics }: any) {
  const user: any = useStore($user);
  return (
    <>
      {user?.id &&
        initialTopics.map((topic: any, index: number) => (
          <ForumTopic key={index} topic={topic} client:load />
        ))}
      {!user?.id && (
        <h2 className="text-3xl text-teal-800">
          Necesitas iniciar sesión para ver el foro
        </h2>
      )}
    </>
  );
}
