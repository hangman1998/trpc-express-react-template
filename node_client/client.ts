import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import fetch from "node-fetch"
import type { AppRouter } from "../server/routers/_app"

// polyfill
global.fetch = fetch as any

async function main() {
	await new Promise(r => setTimeout(r, 1000))
	const client = createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: "http://localhost:2022/trpc",
			}),
		],
	})
	console.log(
		await client.hi.createHi.query({
			sender: "yousef",
			message: "server you better store this message or not!",
		})
	)
	console.log(
		await client.hi.createHi.query({
			sender: "yousef",
			message: "server you better store this new message or not!",
		})
	)
	console.log(await client.hi.seeMessages.query({ from: "yousef" }))
}

main()
