import { trpc } from './utils/trpc';

export function Greeting() {
  const greeting = trpc.greeting.useQuery({name: 'yousef 🦕' });

  return <div>{greeting.data?.text}</div>;
}
