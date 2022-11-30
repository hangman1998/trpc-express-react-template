import { PrismaClient } from "@prisma/client"
import { inferAsyncReturnType } from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"

export const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => {
	const prisma = new PrismaClient()
	return {
		prisma,
		req,
		res,
	}
}

export type Context = inferAsyncReturnType<typeof createContext>
