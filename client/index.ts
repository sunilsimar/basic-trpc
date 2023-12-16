import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",

      async headers() {
        return {
          Authorization: "Bearer 123",
        };
      },
    }),
  ],
});

async function main() {
  let response = await trpc.createTodo.mutate({
    title: "go to gym",
    // description: "Hit the gym",
  });

  console.log(response);
}

async function main1() {
  let response = await trpc.signUp.mutate({
    email: "sunil@gmail.com",
    password: "123123",
  });

  console.log(response);
}

main();
main1();
