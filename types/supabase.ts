import { z } from "zod";

// Lead stages reference (может использоваться как справочник и/или отдельная таблица)
export const leadStageIds = [
  "new",
  "qualification",
  "proposal",
  "negotiation",
  "in_work",
  "won",
  "lost",
] as const;

export type LeadStageId = (typeof leadStageIds)[number];

export const leadSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  phone: z.string().min(3),
  email: z.string().email().nullable(),
  company: z.string().nullable(),
  telegram_id: z.bigint().nullable(),
  telegram_username: z.string().nullable(),
  category: z.string().nullable(),
  potential_amount: z.number().nullable(),
  stage: z.enum(leadStageIds),
  tags: z.array(z.string()),
  notes: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Lead = z.infer<typeof leadSchema>;

export const leadTaskSchema = z.object({
  id: z.string().uuid(),
  lead_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable(),
  due_date: z.string().nullable(),
  completed: z.boolean().default(false),
  created_at: z.string(),
  updated_at: z.string(),
});

export type LeadTask = z.infer<typeof leadTaskSchema>;

export const leadHistorySchema = z.object({
  id: z.string().uuid(),
  lead_id: z.string().uuid(),
  type: z.string(),
  data: z.record(z.string(), z.any()).optional(),
  created_at: z.string(),
});

export type LeadHistory = z.infer<typeof leadHistorySchema>;

export const projectSchema = z.object({
  id: z.string().uuid(),
  lead_id: z.string().uuid().nullable(),
  name: z.string(),
  status: z.string(),
  budget: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

export const projectTaskSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  time_spent_minutes: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ProjectTask = z.infer<typeof projectTaskSchema>;

export const paymentSchema = z.object({
  id: z.string().uuid(),
  lead_id: z.string().uuid().nullable(),
  project_id: z.string().uuid().nullable(),
  amount: z.number(),
  currency: z.string().default("RUB"),
  type: z.enum(["income", "refund"]),
  paid_at: z.string(),
  created_at: z.string(),
});

export type Payment = z.infer<typeof paymentSchema>;

export const expenseSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid().nullable(),
  category: z.string(),
  amount: z.number(),
  currency: z.string().default("RUB"),
  spent_at: z.string(),
  created_at: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;

export const documentSchema = z.object({
  id: z.string().uuid(),
  lead_id: z.string().uuid().nullable(),
  project_id: z.string().uuid().nullable(),
  bucket: z.string(),
  path: z.string(),
  filename: z.string(),
  mime_type: z.string().nullable(),
  size_bytes: z.number().nullable(),
  created_at: z.string(),
});

export type Document = z.infer<typeof documentSchema>;

export const messageTemplateSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  channel: z.enum(["telegram", "whatsapp", "email"]).nullable(),
  body: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type MessageTemplate = z.infer<typeof messageTemplateSchema>;
