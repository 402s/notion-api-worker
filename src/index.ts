import { Router, Route, Request } from "itty-router"
import { Client } from "@notionhq/client";


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
interface NotionResponse {
    access_token: string
    workspace_id: string
    workspace_name: string
    workspace_icon: string
    bot_id: string
    owner: User
}

interface NotionError {
    error: string
}


const router = Router<Request, IMethods>()

router.get("/", () => { 
    return new Response(`Hello Wooooooorld!`)
})

router.get("/login", () => { 
    //@ts-ignore as vars are in wrangler env
    // return Response.redirect(Redirect_URI, 301) // Commenting while edge updates
    return Response.redirect("https://api.notion.com/v1/oauth/authorize?client_id=821734af-9bf0-47d8-bfbd-0c2f14efb15f&response_type=code", 301)
 });

router.get("/callback", async ({query}) => {
    const response:(NotionResponse|NotionError) = await fetch("https://api.notion.com/v1/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             //@ts-ignore as vars are in wrangler env
            "Authorization": "Basic " + JSON.stringify(btoa(Client_ID + ":" + Client_Secret))
        },
        redirect: "follow",
        body: JSON.stringify({
            "grant_type": "authorization_code",
            "code": query.code,
        })
    }).then((response) => {  
        console.log("Success");
        return response.json();
    }).then((data)=> {
        console.log(data);
        console.log("Success2");
        return(data)
    }).catch((error) => {
        // console.log(error);
        console.log("Error");
        return JSON.stringify(error);
    });

    // Store the access_token in KV with key as the workspace_id
    if("access_token" in response) {
        // @ts-ignore as vars are in wrangler env
        await NOTIONAUTH.put(response.workspace_id, response.access_token);
        return new Response("Success! You can close this tab now.")
    } else {
        return new Response("Error: " + response.error)
    }
});


// Take search request and seperate id and pass to query
router.get("/search", async({query}) => {
    const workspace_id = query.id;
    // @ts-ignore as vars are in wrangler env
    const token = await NOTIONAUTH.get(workspace_id);
    const notion = new Client({ auth: token });
    const response = await notion.search({
    query: "",
    sort: {
        direction: "ascending",
        timestamp: "last_edited_time",
    },
    });
    console.log(response);
    return new Response(JSON.stringify(response.results));
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

addEventListener("fetch", (event:FetchEvent) => {
  event.respondWith(router.handle(event.request))
})