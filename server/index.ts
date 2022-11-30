import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express"
// import { expressHandler } from "trpc-playground/handlers/express"
import { createContext } from "./context"
import { appRouter } from "./routers/_app"

const PORT = 2022

const main = async () => {
	const app = express()
	app.get("/", (_req, res) => res.send("Express + Prisma + tRPC 👋"))

	app.use((req, _res, next) => {
		// request logger
		console.log("⬅️ ", req.method, req.path, req.body ?? req.query)
		next()
	})
	app.use(
		"/trpc",
		trpcExpress.createExpressMiddleware({
			router: appRouter,
			createContext,
		})
	)
	// app.use(
	// 	"/play",
	// 	await expressHandler({
	// 		trpcApiEndpoint: "/trpc",
	// 		playgroundEndpoint: "/play",
	// 		router: appRouter,
	// 	})
	// )

	app.listen(PORT, () =>
		console.log(`server listening at http://localhost:${PORT} 🚀`)
	)
}
main()
