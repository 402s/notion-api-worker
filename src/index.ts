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

router.get("/database/:id", async({params, query}) => {
    const database_id = params.id;
    const workspace_id = query.id;
    // @ts-ignore as vars are in wrangler env
    const token = await NOTIONAUTH.get(workspace_id);

    const notion = new Client({ auth: token });

    const response = await notion.databases.query({
        database_id: database_id,
        filter: {
          or: [
          ]
        },
        sorts: [
          {
            property: 'Last ordered',
            direction: 'ascending',
          },
        ],
      });   

      return new Response(JSON.stringify(response));
});

router.get("/page/retrieve/:id", async({params, query}) => {
    const database_id = params.id;
    const workspace_id = query.id;
    // @ts-ignore as vars are in wrangler env
    const token = await NOTIONAUTH.get(workspace_id);

    const notion = new Client({ auth: token });

    const response = await notion.pages.retrieve({
        page_id: database_id,
        });


      return new Response(JSON.stringify(response));
});

router.get("/page/update/:id", async({params, query}) => {
    const database_id = params.id;
    const workspace_id = query.id;
    // @ts-ignore as vars are in wrangler env
    const token = await NOTIONAUTH.get(workspace_id);

    const notion = new Client({ auth: token });

    const response = await notion.pages.update({
        page_id: database_id,
        properties: {
            'Last ordered': {
                date: {
                    start: new Date().toISOString().split('T')[0],
                },
            },
        },
        });

        return new Response(JSON.stringify(response))
    });

addEventListener("fetch", (event:FetchEvent) => {
  event.respondWith(router.handle(event.request))
})