import axios from "axios";

export const deletePost = async (postId: number): Promise<number> => {
  try {
    const { status } = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    console.info(status);
    return status;
  } catch (error) {
    console.error("Error while deleting the post: ", error);
    throw error;
  }
};
