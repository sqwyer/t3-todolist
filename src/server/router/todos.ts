import { createRouter } from "./context";
import { z } from 'zod';

export const todosRouter = createRouter()
  .query("getTodos", {
      input: z.object({
          owner: z.string().email()
      }),
      resolve: async ({ input, ctx }) => {
        return await ctx.prisma.todo.findMany({where: {owner: input.owner}})
      },
  })
  .mutation("deleteTodo", {
      input: z.object({
        id: z.string()
      }),
      resolve: async ({ input, ctx }) => {
          return await ctx.prisma.todo.delete({
              where: { id: input.id }
          })
      }
  })
  .mutation("createTodo", {
      input: z.object({
          label: z.string(),
          created: z.string(),
          owner: z.string()
      }),
      resolve: async ({ input, ctx }) => {
          return await ctx.prisma.todo.create({
            data: { label: input.label, created: input.created, done: false, owner: input.owner }
          })
      }
  }).mutation("updateTodo", {
    input: z.object({
        id: z.string(),
        data: z.any()
    }),
    resolve: async ({ input, ctx }) => {
        return await ctx.prisma.todo.update({
          where: {id: input.id},
          data: input.data
        })
    }
});
  