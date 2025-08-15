import * as z from "zod";

export const signInSchema = z
  .object({
    // в v4 “строковые форматы” вынесены на верхний уровень: z.email()
    email: z
      .email()
      // нормализуем, но не меняем тип (v4: .overwrite)
      .overwrite((s) => s.trim().toLowerCase()),

    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters" })
      .max(15, { message: "Password must be at most 15 characters" }),
  })
  // запрет лишних ключей
  .strict();
