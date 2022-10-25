

// This route is where we handle the callbacks from Notion both on initial login and on getting the permanent token.
export default async function convertToken(query) {
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
        return response.json();
    }).then((data)=> {
        return(data)
    }).catch((error) => {
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
  }
  

// Some types:
interface NotionResponse {
    access_token: string
    workspace_id: string
    workspace_name: string
    workspace_icon: string
    bot_id: string
    owner: User
}

interface User {
    object: "user"
    id: string
    type?: string
    name?: string
    avatar_url?: string

}

interface NotionError {
    error: string
}