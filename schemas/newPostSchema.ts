import * as z from "zod";

export const newPostSchema = z.object({
  id: z.number().int(), // ID is immutable and must be an integer
  title: z
    .string()
    .min(3, "عنوان باید حداقل ۳ کاراکتر داشته باشد")
    .regex(
      /^[a-zA-Z0-9.,!? ]*$/,
      "عنوان میتواند تنها حروف انگلیسی باشد( کاراکتر های فارسی و خاص ممنون است)",
    ),
  body: z.string().min(3, "بدنه متن باید حداقل ۳ کاراکتر داشته باشد"),
});
