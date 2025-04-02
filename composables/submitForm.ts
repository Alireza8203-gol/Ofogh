import axios from "axios";
import type { EditPost } from "~/types/Global.ts";

export const submitPost = async (data: EditPost): Promise<void> => {
  const updatedData = toRaw(data);
  try {
    await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${updatedData.id}`,
      updatedData,
    );
  } catch (e) {
    console.error(e);
    throw e; // Re-throw the error for handling in caller function
  }
};
