import { useState, useEffect } from "react";
import { fetchUsers } from "../services/fetchUsers";

export function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  return { users };
}
