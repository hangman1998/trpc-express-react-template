import { initTRPC } from '@trpc/server';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { greeting } from './routers/hello';
import {PrismaClient} from '@prisma/client'

const t = initTRPC.create();
export const publicProcedure = t.procedure;
export const router = t.router;

const appRouter = router({
  hello: greeting // each router is merged here
})

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

const PORT = 2022

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  createContext() {
    const prisma = new PrismaClient();
    return {
      prisma,
    };
  },  }),
);

// these come from standalone version; don't know if are needed in express version or not!
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Request-Method', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
//   res.setHeader('Access-Control-Allow-Headers', '*');

app.get('/', (req, res) => res.send('Express + Prisma + tRPC + tRPC Shield'));

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT} 🚀`);
});