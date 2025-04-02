import * as z from "zod";

export const editPostSchema = z.object({
  id: z.number().int(), // ID is immutable and must be an integer
  title: z
    .string()
    .min(3, "عنوان باید حداقل ۳ کاراکتر داشته باشد")
    .regex(
      /^[a-zA-Z\u0600-\u06FF\s]{3,}$/,
      "عنوان میتواند تنها حروف انگلیسی و فارسی باشد (کاراکتر های خاص ممنون است)",
    ),
  body: z
    .string()
    .min(3, "بدنه متن باید حداقل ۳ کاراکتر داشته باشد")
    .regex(
      /^[a-zA-Z0-9\u0600-\u06FF\s\W]+$/,
      "بدنه تنها میتواند کاراکتر های فارسی و انگلیسی داشته باشد.",
    ),
});
