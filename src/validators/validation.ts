import z from "zod";

export const validateRegisterSchema = z.object({
  first_name: z.string({ required_error: "firstname is required" }),
  last_name: z.string({ required_error: "lastname is required" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "mail is invalid" }),
  password: z.string({ required_error: "password is required" }).min(6),
  confirm_password: z.string({ required_error: "password is required" }).min(6),
  user_name: z.string({ required_error: "username is required" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email" }),
  password: z.string({ required_error: "password is required" }),
});

export const validateAdminSchema = z.object({
  first_name: z.string({ required_error: "firstname is required" }),
  last_name: z.string({ required_error: "lastname is required" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "mail is invalid" }),
  password: z.string({ required_error: "password is required" }).min(6),
  confirm_password: z.string({ required_error: "password is required" }).min(6),
  user_name: z.string({ required_error: "username is required" }),
});