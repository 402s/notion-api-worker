

// On this route we simply redirect to the non-dev notion auth page. 
// In the future we may want to expand on this for more functionality.
export default async function login() {
  //For when we don't want to rely on worker vars:
  //const redirect_url = "https://api.notion.com/v1/oauth/authorize?client_id=821734af-9bf0-47d8-bfbd-0c2f14efb15f&response_type=code"

  //@ts-ignore as var is in global
  return(Response.redirect(Redirct_URI, 301))
}
