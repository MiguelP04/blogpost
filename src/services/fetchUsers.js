const BASE_URL = import.meta.env.VITE_BASE_API;

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const data = response.json();
  return data;
}
