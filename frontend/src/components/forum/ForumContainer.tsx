import { $user } from "@/store/authStore";
import { ForumTopic } from "./ForumTopic";
import { $forums, $isLoading, $errorMsg, getForums } from "@/store/forumStore";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { Loader } from "../shared/Loader";
import { ForumCard } from "./ForumCard";
import { set } from "astro:schema";

export function ForumContainer() {
  const user: any = useStore($user);

  const initialForums: any = useStore($forums);
  const isLoading = useStore($isLoading);
  const errorMsg = useStore($errorMsg);

  const [topic, setTopic] = useState("");
  const [topicContent, setTopicContent] = useState({});

  const asyncForums = () => {
    getForums();
  };

  useEffect(() => {
    asyncForums();
  }, []);

  useEffect(() => {
    if (topic) {
      const currentForum = initialForums.find((f: any) => f.topic === topic);
      setTopicContent(currentForum);
    }
  }, [initialForums, topic]);

  const handleClick = (topic: any) => {
    setTopic(topic);
    initialForums.find((forum: any) => {
      if (forum.topic === topic) {
        setTopicContent(forum);
      }
    });
  };

  const handleSubmit = (payload: any, id: any) => {
    fetch(`https://tfc.localhost/forum/api/v1/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => $forums.set(data.forums))
      .catch((err) => console.log(err));
  };

  const handleReturn = () => {
    setTopic("");
  };

  return (
    <>
      {!isLoading && initialForums?.length > 0 && !topic && (
        <section className="animate-opacity w-full p-3  flex flex-wrap gap-4 justify-between items-center">
          {initialForums.map((forum: any) => (
            <ForumCard
              key={forum.id}
              onClick={handleClick}
              title={forum.topic}
            />
          ))}
        </section>
      )}
      {isLoading && <Loader />}
      {topic && (
        <ForumTopic
          onSubmit={handleSubmit}
          onClick={handleReturn}
          forum={topicContent}
        />
      )}
    </>
  );
}
