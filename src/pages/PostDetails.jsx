import PostComment from "../components/PostComment";
import { usePost } from "../context/PostContext";
import { useCommentsByPost } from "../hooks/useCommentsByPost";
import PostDetailSkeleton from "../components/PostDetailSkeleton";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function PostDetails() {
  const { post } = usePost();
  const { comments, loading } = useCommentsByPost(post.post.id);
  const navigate = useNavigate();

  if (!post || post.length === 0) {
    return <p>No hay datos del post para mostrar</p>;
  }

  return (
    <>
      <div className="absolute left-16 top-24 px-6 py-1 rounded-md border border-zinc-400 hover:bg-zinc-200">
        <button
          onClick={() => navigate("/")}
          className="text-sm cursor-pointer"
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} /> Volver
        </button>
      </div>
      <div className="flex justify-center m-12">
        {loading ? (
          <PostDetailSkeleton />
        ) : (
          <article className="flex flex-col gap-8 py-10 px-8 min-h-98 w-3xl border border-zinc-300 rounded-md shadow-md">
            <div className="flex gap-4">
              <img
                src={post.user.image}
                alt=""
                className="w-12 h-12 border border-zinc-200 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{post.user.name}</span>
                <span className="text-zinc-400 text-sm">{post.user.email}</span>
              </div>
            </div>
            <p className="text-sm">{post.post.body}</p>
            <section className="border-t border-t-zinc-200 pt-6">
              <h2 className="font-bold text-lg">
                Comentarios({post.commentCount})
              </h2>
              <ul className="flex flex-col gap-12 mt-6">
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <PostComment comment={comment} />
                  </li>
                ))}
              </ul>
            </section>
          </article>
        )}
      </div>
    </>
  );
}
