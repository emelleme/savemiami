/* https://savemiami.notion.site/SaveMiami-8e08dcb217e349509cefff8b62afdb9d */
const LINK_TO = "https://savemiami.notion.site/SaveMiami-8e08dcb217e349509cefff8b62afdb9d"
export async function onRequestGet(context) {
    
    // Contents of context object
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
      waitUntil, // same as ctx.waitUntil in existing Worker API
      next, // used for middleware or to fetch assets
      data, // arbitrary space for passing data between middlewares
    } = context;
    const url = params.path?.join('/') ?? ''
    // console.log(url)
    // return handleRequest(url);
    const destinationURL = LINK_TO;
    const statusCode = 301;
    return Response.redirect(destinationURL, statusCode);
    //try asset cdn
    
    // return env.ASSETS.fetch(request);
    // return new Response();
  }

  async function handleRequest() {
  
    // Only use the path for the cache key, removing query strings
    // and always store using HTTPS e.g. https://www.example.com/file-uri-here
    const someCustomKey = `${LINK_TO}`
    console.log(someCustomKey)
  
    try{
      let response = await fetch(someCustomKey, {
        cf: {
          // Always cache this fetch regardless of content type
          // for a max of 5 seconds before revalidating the resource
          cacheTtl: 20,
          cacheEverything: true,
          //Enterprise only feature, see Cache API for other plans
          cacheKey: someCustomKey,
        },
      })
      // Reconstruct the Response object to make its headers mutable.
      console.log(response.status)
      response = new Response(response.body, response)
      response.headers.set("Cache-Control", "max-age=1500")
      return response
    } catch(err){
      console.log(err)
    }
    

    // return false;
    // Set cache control headers to cache on browser for 25 minutes
    
  }