import { z } from "zod";

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

export const SendManageMessageSchema = z.object({
	clientId: objectIdSchema,
	threadId: objectIdSchema,
	message: z.string().min(1, "Message is required"),
});

export const MessageThreadIdParamSchema = z.object({
	threadId: objectIdSchema,
});

export const MessageClientIdParamSchema = z.object({
	clientId: objectIdSchema,
});

export type SendManageMessageInput = z.infer<typeof SendManageMessageSchema>;

export const manageMessagesValidationSchemas = {
	SendManageMessageSchema,
	MessageThreadIdParamSchema,
	MessageClientIdParamSchema,
};
