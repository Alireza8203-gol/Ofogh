import axios from "axios";
import type { EditPost } from "~/types/Global.ts";

export const submitNewPost = async (data: EditPost): Promise<void> => {
  const updatedData = toRaw(data);
  try {
    await axios.post(`https://jsonplaceholder.typicode.com/posts`, updatedData);
  } catch (e) {
    console.error(e);
    throw e; // Re-throw the error for handling in caller function
  }
};
