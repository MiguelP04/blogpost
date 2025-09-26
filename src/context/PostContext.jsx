import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [post, setPost] = useState(() => {
    const postStoraged = localStorage.getItem("post");
    return postStoraged ? JSON.parse(postStoraged) : [];
  });

  useEffect(() => {
    if (post && post.length !== 0) {
      localStorage.setItem("post", JSON.stringify(post));
    }
  }, [post]);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
}
