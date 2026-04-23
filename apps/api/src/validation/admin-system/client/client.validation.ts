import { z } from "zod";
import mongoose from "mongoose";
import { ClientStatusEnum } from "../../../enums/models/client.status";

export const createClientSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string(),
  phoneNumber: z.string(),
});

export const updateStatusSchema = z.object({
  status: z.nativeEnum(ClientStatusEnum),
});


export const idParamSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ID format",
  }),
});