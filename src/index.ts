import { Router, Route, Request } from 'itty-router'
import { Client } from '@notionhq/client';


interface IMethods {
  get: Route
  post: Route
  other: Route
}

const router = Router<Request, IMethods>()

router.get('/', (request: Request) => { return new Response('Hello world') })

// get the code from callback url
router.get('/callback', (request: Request) => {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    return new Response(code)
})

// using code get an oauth token by making a post request to https://api.notion.com/v1/oauth/token
router.post('/token', (request: Request) => {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
});
    
router.post('/callback', async (request: Request) => {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    return new Response(code);
});

router.post('/dev/callback', async (request: Request) => {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    console.log(code)
    return Response.redirect('http://localhost:3000/callback'+ '?code=' + code, 301);
});

router.get('/login', () => { return Response.redirect('https://api.notion.com/v1/oauth/authorize?client_id=b29cc2b5-0184-4adb-8b19-60aaf0e859dd&response_type=code', 301)
 });

// Take search request and seperate id and pass to query
router.get('/search', async() => {
    const notion = new Client({ auth: "" });
    const response = await notion.search({
    query: "shaun",
    sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time',
    },
    });
    console.log(response);
    return new Response(JSON.stringify(response.results));
})

router.get('/page/:id', async(request: Request) => {
    const notion = new Client({ auth: "" });
    const { id } = request.params;
    const pageId = id;
    const response = await notion.pages.retrieve({ page_id: pageId });
    return new Response(JSON.stringify(response));
});


addEventListener('fetch', (event:FetchEvent) => {
  event.respondWith(router.handle(event.request))
})