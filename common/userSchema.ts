import z from "zod";

export const roleSchema = z.enum(["USER", "ADMIN", "SUPER_ADMIN"]);

export const userSchema = z.object({
  name: z.string().min(1, { message: "Username can't be blank" }),
  email: z.email().min(1, { message: "Email can't be blank" }),
  password: z.string().min(6, { message: "Password must be atleast 6 digits" }),
  role: roleSchema.optional(),
});
export type UserSchema = z.infer<typeof userSchema>;
