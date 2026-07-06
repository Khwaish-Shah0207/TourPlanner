import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  date: z.string().min(1, "Date is required"),
  tripId: z.string().min(1),
}).refine(
  (data) => data.date >= new Date().toISOString().slice(0, 10),
  { message: "You can't add a task in the past", path: ["date"] }
);

export type TaskFormValues = z.infer<typeof taskSchema>;
