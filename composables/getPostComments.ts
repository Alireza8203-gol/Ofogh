import axios from "axios";

export const getPostComments = async (postId: number): Promise<Comment> => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    return data;
  } catch (e) {
    console.error(e);
    throw e; // Re-throw the error for handling in caller function
  }
};
