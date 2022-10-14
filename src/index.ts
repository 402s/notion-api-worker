import { Router, Route, Request } from "itty-router"
import { Client } from "@notionhq/client";


interface IMethods {
  get: Route
  post: Route
  other: Route
}

const router = Router<Request, IMethods>()

router.get("/", () => { 
    return new Response(`Hello Wooooooorld!`)
})
    

router.get("/callback", async ({query}) => {
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
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
    return new Response(JSON.stringify(response.error));
});

router.post("/dev/callback", async (request: Request) => {
    const url = new URL(request.url)
    const code = url.searchParams.get("code")
    console.log(code)

    return Response.redirect("http://localhost:8787/callback?code=" + code, 302);
});

router.get("/login", () => { 
    return Response.redirect("https://api.notion.com/v1/oauth/authorize?client_id=b29cc2b5-0184-4adb-8b19-60aaf0e859dd&response_type=code", 301)
 });

// Take search request and seperate id and pass to query
router.get("/search", async() => {
    const notion = new Client({ auth: "secret_ykuAumQjK7GxXmUVaWLWDXzAfwUhHXDhi1nB8cHpA7G" });
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

router.get("/page/:id", async(request: Request) => {
    const notion = new Client({ auth: "" });
    const { id } = request.params;
    const pageId = id;
    const response = await notion.pages.retrieve({ page_id: pageId });
    return new Response(JSON.stringify(response));
});


addEventListener("fetch", (event:FetchEvent) => {
  event.respondWith(router.handle(event.request))
})