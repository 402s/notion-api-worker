import { Router, Route, Request } from 'itty-router'
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: NOTION_API_KEY });

interface IMethods {
  get: Route
  post: Route
  other: Route
}

const router = Router<Request, IMethods>()

function search(query){(async () => {
    const response = await notion.search({
      query: query,
      sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time',
      },
    });
    return(response);
  })()};

router.get('/', (request: Request) => { return new Response('Hello world') })
router.get('/search', (request: Request) => { return search("") })


addEventListener('fetch', (event:FetchEvent) => {
  event.respondWith(router.handle(event.request))
})