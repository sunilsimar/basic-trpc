"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("./trpc");
const zod_1 = require("zod");
const standalone_1 = require("@trpc/server/adapters/standalone");
const todoInputType = zod_1.z.object({
    title: zod_1.z.string(),
    //   description: z.string(),
});
const appRouter = (0, trpc_1.router)({
    createTodo: trpc_1.publicProcedure.input(todoInputType).mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
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
    })),
    signUp: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("hi from signup");
        let email = opts.input.email;
        let password = opts.input.password;
        //do validation here
        //do Database stuff here
        let token = "123123";
        return {
            token,
        };
    })),
});
const server = (0, standalone_1.createHTTPServer)({
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
