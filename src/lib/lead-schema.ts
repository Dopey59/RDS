import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(2).max(120),
  email: z.string().email().max(160),
  budget: z.string().max(60).optional().or(z.literal("")),
  message: z.string().min(10).max(2000),
  // honeypot anti-spam : doit rester vide
  website: z.string().max(0).optional().or(z.literal("")),
});

export type Lead = z.infer<typeof leadSchema>;
