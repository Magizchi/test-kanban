import { z } from 'zod';

export const TodoResponseItemSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
});

export type TodoResponseItem = z.infer<typeof TodoResponseItemSchema>;

export const KanbanItemStatusSchema = z.enum(['todo', 'in_progress', 'done']);
export type KanbanItemStatus = z.infer<typeof KanbanItemStatusSchema>;

export const KanbanItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    cost: z.number(),
    status: KanbanItemStatusSchema,
    updateMode: z.boolean().nullable()
});
export type KanbanItem = z.infer<typeof KanbanItemSchema>;

export const KanbanItemColumnSchema = z.object({
    label: z.string(),
    status: z.enum(['todo', 'in_progress', 'done']),
});
export type KanbanColumn = z.infer<typeof KanbanItemColumnSchema>;
