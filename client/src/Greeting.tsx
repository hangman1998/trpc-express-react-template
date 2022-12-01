import { trpc } from "./utils/trpc"

export function Greeting() {
	const greeting = trpc.hi.welcome.useQuery({})

	return <div>{greeting.data ?? "loading..."}</div>
}
