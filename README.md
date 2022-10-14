Reminder to login with wrangler login on launch

Also, you need to set wrangler env variables:
wrangler secret put Client_ID
wrangler secret put Client_Secret


TODO: Turn all the possible methods into proper documentation and finish implementation

`
export const listComments = {
  method: "get",
  pathParams: [],
  queryParams: ["block_id", "start_cursor", "page_size"],
  bodyParams: [],
  path: (): string => `comments`,
} as const
`

`export const getPageProperty = {
  method: "get",
  pathParams: ["page_id", "property_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: (p: GetPagePropertyPathParameters): string =>
    `pages/${p.page_id}/properties/${p.property_id}`,
} as const
`

`export const getBlock = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: GetBlockPathParameters): string => `blocks/${p.block_id}`,
} as const
`

`export const updatePage = {
  method: "patch",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: ["properties", "icon", "cover", "archived"],
  path: (p: UpdatePagePathParameters): string => `pages/${p.page_id}`,
} as const`

`export const queryDatabase = {
  method: "post",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: ["sorts", "filter", "start_cursor", "page_size", "archived"],
  path: (p: QueryDatabasePathParameters): string =>
    `databases/${p.database_id}/query`,
} as const
`
`
export const createPage = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["parent", "properties", "icon", "cover", "content", "children"],
  path: (): string => `pages`,
} as const
`

`export const listUsers = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: (): string => `users`,
} as const`
`export const getUser = {
  method: "get",
  pathParams: ["user_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: GetUserPathParameters): string => `users/${p.user_id}`,
} as const
`

`export const getSelf = {
  method: "get",
  pathParams: [],
  queryParams: [],
  bodyParams: [],
  path: (): string => `users/me`,
} as const`

`export const getPage = {
  method: "get",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: GetPagePathParameters): string => `pages/${p.page_id}`,
} as const`

`export const listBlockChildren = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: (p: ListBlockChildrenPathParameters): string =>
    `blocks/${p.block_id}/children`,
} as const`

`export const deleteBlock = {
  method: "delete",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: DeleteBlockPathParameters): string => `blocks/${p.block_id}`,
} as const
`

`export const updateBlock = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [
    "embed",
    "type",
    "archived",
    "bookmark",
    "image",
    "video",
    "pdf",
    "file",
    "audio",
    "code",
    "equation",
    "divider",
    "breadcrumb",
    "table_of_contents",
    "link_to_page",
    "table_row",
    "heading_1",
    "heading_2",
    "heading_3",
    "paragraph",
    "bulleted_list_item",
    "numbered_list_item",
    "quote",
    "to_do",
    "toggle",
    "template",
    "callout",
    "synced_block",
    "table",
  ],
  path: (p: UpdateBlockPathParameters): string => `blocks/${p.block_id}`,
} as const`

`export const appendBlockChildren = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: ["children"],
  path: (p: AppendBlockChildrenPathParameters): string =>
    `blocks/${p.block_id}/children`,
} as const`

`export const getDatabase = {
  method: "get",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: GetDatabasePathParameters): string => `databases/${p.database_id}`,
} as const`

`export const updateDatabase = {
  method: "patch",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: [
    "title",
    "description",
    "icon",
    "cover",
    "properties",
    "is_inline",
    "archived",
  ],
  path: (p: UpdateDatabasePathParameters): string =>
    `databases/${p.database_id}`,
} as const
`

`export const listDatabases = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: (): string => `databases`,
} as const`

`export const createDatabase = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "parent",
    "properties",
    "icon",
    "cover",
    "title",
    "description",
    "is_inline",
  ],
  path: (): string => `databases`,
} as const`

`export const search = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["sort", "query", "start_cursor", "page_size", "filter"],
  path: (): string => `search`,
} as const`

`export const createComment = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["parent", "rich_text", "discussion_id"],
  path: (): string => `comments`,
} as const`