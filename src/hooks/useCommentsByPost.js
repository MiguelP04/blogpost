import { useState, useEffect } from "react";
import { fetchComment } from "../services/fetchApi";

export function useCommentsByPost(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getComments() {
      try {
        setLoading(true);
        const data = await fetchComment(postId);
        setComments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getComments();
  }, []);

  return { comments, loading };
}
