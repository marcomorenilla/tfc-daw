import { useEffect, useState } from "react";

export function ForumMessage({ topicMessage }: any) {
  const { user_name: userName, message } = topicMessage;
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    handleImage();
  }, []);

  const handleImage = () => {
    fetch(`https://tfc.localhost/minio/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const image = data.find(
          (item: any) => item.name.split(".")[0] == `${topicMessage.user_id}`,
        );
        if (image) {
          const cacheBuster = `?t=${new Date().getTime()}`;
          setImage(image.url + cacheBuster);
        } else {
          setImage("https://tfc.localhost/images/user.jpg");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="w-full border border-slate-300 rounded-xl flex flex-col gap-2 justify-center items-start">
      <div className="flex justify-start gap-2 items-center border-b border-slate-300 w-full p-2">
        <img
          src={image || "https://tfc.localhost/images/user.jpg"}
          alt=" Imagen avatar usuario"
          loading="lazy"
          className="size-10 rounded-full flex items-center justify-center"
        />
        <h2 className="text-slate-500">
          Autor: <span className="text-blue-500 font-bold">{userName}</span>
        </h2>
      </div>
      <div className="p-2 text-slate-600 italic ">
        <p>{message}</p>
      </div>
    </article>
  );
}
