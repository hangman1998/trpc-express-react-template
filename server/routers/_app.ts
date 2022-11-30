import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { hi } from "./hi"

// main router, each router is merged here
export const appRouter = router({
	hi,
})

// this is for client
export type AppRouter = typeof appRouter
