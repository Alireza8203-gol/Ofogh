import axios from "axios";

export const deletePost = async (postId: number) => {
  try {
    const { data } = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    console.info(data);
    return data;
  } catch (error) {
    console.error("Error while deleting the post: ", error);
    throw error;
  }
};
