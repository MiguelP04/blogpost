import { fetchComments } from "../services/fetchApi";
import { useEffect, useState } from "react";

export function useComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getComments() {
      try {
        setLoading(true);
        const data = await fetchComments();
        setComments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getComments();
  }, []);

  return { comments, loading };
}
