// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { todosRouter } from "./todos";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("todos.", todosRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
