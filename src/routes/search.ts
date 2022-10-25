export default async function search(query, notionClient){
    const response = await notionClient.search({
    query: "",
    sort: {
        direction: "ascending",
        timestamp: "last_edited_time",
    },
    });
    console.log(response);
    return new Response(JSON.stringify(response.results));
}