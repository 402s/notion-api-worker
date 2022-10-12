import { Router, Route, Request } from 'itty-router'
import { Client } from '@notionhq/client';

const notion = new Client({ auth: NOTION_API_KEY });

interface IMethods {
  get: Route
  post: Route
  other: Route
}

const router = Router<Request, IMethods>()

router.get('/', (request: Request) => { return new Response('Hello world') })

router.get('/login', () => { return Response.redirect('https://api.notion.com/v1/oauth/authorize?client_id=821734af-9bf0-47d8-bfbd-0c2f14efb15f&response_type=code')
 })

// Take search request and seperate id and pass to query
router.get('/search', async(request: Request) => {
    const response = await notion.search({
    query: "",
    sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time',
    },
    });
    console.log(response);
    return new Response(JSON.stringify(response));
})

router.get('/page/:id', async(request: Request) => {
    const { id } = request.params
    const pageId = id;
    const response = await notion.pages.retrieve({ page_id: pageId });
    return new Response(JSON.stringify(response));
});


addEventListener('fetch', (event:FetchEvent) => {
  event.respondWith(router.handle(event.request))
})