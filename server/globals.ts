import { initTRPC } from "@trpc/server"
import type { Context } from "./context"
import { OpenApiMeta } from "trpc-openapi"
import { PrismaClient } from "@prisma/client"
// this the place where trpc is initialized
const t = initTRPC.meta<OpenApiMeta>().context<Context>().create()
export const middleware = t.middleware
export const router = t.router
export const publicProcedure = t.procedure
export const prisma = new PrismaClient()
