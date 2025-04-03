import * as z from "zod";
import { editPostSchema } from "~/schemas/editPostSchema";

export type EditPostForm = z.output<typeof editPostSchema>;

export interface Post {
  id: number;
  userId: string;
  title: string;
  body: string;
}

export interface EditPost {
  id: number | undefined;
  body: string | undefined;
  title: string | undefined;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

export interface RowItem {
  label: string;
  icon: string;
  onSelect: () => void;
}
