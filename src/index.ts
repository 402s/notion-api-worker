import { Router, Route, Request } from 'itty-router'

interface IMethods {
  get: Route
  post: Route
  other: Route
}

const router = Router<Request, IMethods>()

router.get('/', (request: Request) => { return new Response('Hello world') })
router.get('/search', (request: Request) => { return new Response('Search') })


addEventListener('fetch', (event:FetchEvent) => {
  event.respondWith(router.handle(event.request))
})