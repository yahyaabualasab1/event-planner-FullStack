import { z } from "zod";

export const AdminLoginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long")
		.max(100, "Password must be at most 100 characters long"),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
