import { z } from "zod"
import { publicProcedure, router } from "../trpc"

export const hi = router({
	createHi: publicProcedure
		.meta({ openapi: { method: "POST", path: "/say-hi" } })
		.input(
			z.object({
				sender: z.string().nullish(),
				message: z.string(),
			})
		)
		.output(z.string())
		.query(async ({ ctx, input }) => {
			await ctx.prisma.hi.create({
				data: { from: input.sender ?? "unknown", message: input.message },
			})
			return `Server🤵: Hi! ${input.sender}, your message was saved!`
		}),
	seeMessages: publicProcedure
		.input(
			z.object({
				from: z.string().nullish(),
			})
		)
		.query(({ ctx, input }) =>
			ctx.prisma.hi.findMany({ where: { from: input.from ?? "unknown" } })
		),
})
