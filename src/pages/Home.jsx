import UserPost from "../components/UserPost";
import { useEffect, useMemo, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { useUsers } from "../hooks/useUsers";
import { useComments } from "../hooks/useComments";
import PostSkeleton from "../components/PostSkeleton";

export default function Home() {
  const { users, loading: loadingUsers } = useUsers();
  const { posts, loading: loadingPosts } = usePosts();
  const { comments, loading: loadingComments } = useComments();
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [userPosts, setUserPosts] = useState([]);

  const loading = loadingUsers || loadingPosts || loadingComments;

  const currentPosts = useMemo(() => {
    const indexOfLastPost = postsPerPage * currentPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, posts]);

  useEffect(() => {
    if (users.length === 0 || posts.length === 0) return;

    const combined = currentPosts.map((post) => {
      const user = users.find((u) => u.id === post.userId);

      const commentCount = comments.filter(
        (comment) => comment.postId === post.id
      ).length;
      return { post, user, commentCount };
    });

    setUserPosts(combined);
  }, [currentPosts, users, comments]);

  return (
    <main className="flex flex-col justify-center items-center m-12 min-h-[1000px]">
      {loading ? (
        <PostSkeleton />
      ) : (
        <>
          <ul className="flex flex-col gap-12">
            {userPosts.map((userPost) => (
              <li key={userPost.post.id}>
                <UserPost userPost={userPost} />
              </li>
            ))}
          </ul>
          <div className="flex gap-12 mt-6">
            {currentPage <= 1 || (
              <button
                className="px-4 py-1 text-white text-sm bg-zinc-400 cursor-pointer"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Anterior
              </button>
            )}
            {currentPage >= 10 || (
              <button
                className="px-4 py-1 text-white text-sm bg-blue-700 cursor-pointer"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Siguiente
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
