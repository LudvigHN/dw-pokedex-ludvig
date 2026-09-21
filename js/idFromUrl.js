export function getIdFromUrl(url){

    return url.slice(0,-1).split("/").pop()
    
}