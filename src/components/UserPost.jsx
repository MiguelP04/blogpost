import { useNavigate } from "react-router";
import { usePost } from "../context/PostContext";

export default function UserPost({ userPost }) {
  const navigate = useNavigate();
  const { setPost } = usePost();

  function handleNavigate() {
    setPost(userPost);
    navigate("/post-details");
  }
  return (
    <article className="flex flex-col gap-8 w-2xl h-64 p-6 border border-zinc-300 rounded-md shadow-sm">
      <div className="flex gap-4">
        <img
          src={userPost.user.image}
          alt=""
          className="w-12 h-12 border border-zinc-200 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{userPost.user.name}</span>
          <span className="text-zinc-400 text-sm">{userPost.user.email}</span>
        </div>
      </div>
      <p className="text-sm">{userPost.post.body}</p>
      <div className="border-t border-zinc-200 p-4">
        <button
          className="text-sm text-zinc-500 cursor-pointer"
          onClick={() => handleNavigate()}
        >
          Ver {userPost.commentCount} comentarios
        </button>
      </div>
    </article>
  );
}
