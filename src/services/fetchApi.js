const BASE_URL = import.meta.env.VITE_BASE_API;
const USER_IMAGES = import.meta.env.VITE_USER_IMAGES_API;

export async function fetchUsers() {
  const responseUsers = await fetch(`${BASE_URL}/users`);
  const responseImages = await fetch(`${USER_IMAGES}/?results=10`);

  const dataUsers = await responseUsers.json();
  const dataImages = await responseImages.json();

  const data = dataUsers.map((user, index) => {
    return {
      ...user,
      image: dataImages.results[index]?.picture.large || null,
    };
  });
  return data;
}

export async function fetchPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  return data;
}

export async function fetchComments() {
  const response = await fetch(`${BASE_URL}/comments`);
  const data = await response.json();
  return data;
}

export async function fetchComment(postId) {
  const responseComments = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  const responseImages = await fetch(`${USER_IMAGES}/?results=5`);

  const dataComments = await responseComments.json();
  const dataImages = await responseImages.json();

  const data = dataComments.map((comment, index) => {
    return {
      ...comment,
      image: dataImages.results[index]?.picture.large || null,
    };
  });

  return data;
}
