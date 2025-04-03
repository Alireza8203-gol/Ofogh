import axios from "axios";
import type { Comment } from "~/types/Global";

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    return data as Comment[];
  } catch (e) {
    console.error(e);
    throw e; // Re-throw the error for handling in caller function
  }
};
