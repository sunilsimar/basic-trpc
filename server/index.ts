import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoInputType = z.object({
  title: z.string(),
  //   description: z.string(),
});

const appRouter = router({
  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    console.log("Hi there");

    //context
    const username = opts.ctx.username;
    console.log(username);
    // const title = opts.input.title;
    // const description = opts.input.description;

    //do DB stuff here

    return {
      id: "1",
    };
  }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      console.log("hi from signup");
      let email = opts.input.email;
      let password = opts.input.password;
      //do validation here
      //do Database stuff here

      let token = "123123";
      return {
        token,
      };
    }),
});

const server = createHTTPServer({
  router: appRouter,
  //every time requests comes , control should first reach here
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    console.log(authHeader);
    //jwt.verify()
    return {
      username: undefined,
    };
  },
});

server.listen(3000);

export type AppRouter = typeof appRouter;
