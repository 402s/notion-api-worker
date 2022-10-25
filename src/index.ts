import { Router, Route, Request } from "itty-router"
import { Client } from "@notionhq/client";

import login from "./routes/login"
import convertToken from "./routes/callback"
import search from "./routes/search";


interface IMethods {
  get: Route
  post: Route
  other: Route
}

interface User {
    object: "user"
    id: string
    type?: string
    name?: string
    avatar_url?: string

}


const router = Router<Request, IMethods>()

router.get("/", () => { 
    return new Response(`Hello Wooooooorld!`)
})

router.get("/login", () => { 
    login();
 });

router.get("/callback", async ({query}) => {
    convertToken(query);
});


// Take search request and seperate id and pass to query
router.get("/search", async({query}) => {
    const workspace_id = query.id;
    // @ts-ignore as vars are in wrangler env
    const token = await NOTIONAUTH.get(workspace_id);
    const notionClient = new Client({ auth: token})
    search(query, notionClient)
})

addEventListener("fetch", (event:FetchEvent) => {
  event.respondWith(router.handle(event.request))
})