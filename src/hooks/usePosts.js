import { useState, useEffect } from "react";
import { fetchPosts } from "../services/fetchApi";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  return { posts, loading };
}
