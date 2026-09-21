import { getIdFromUrl } from "./js/idFromUrl.js";
let url = "https://pokeapi.co/api/v2/pokemon"
let listDOM = document.querySelector(".list")
const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
fetch(url)
    .then(response => { return response.json() }
    )
    .then(data =>
        data.results.forEach(element => {
            const imageUrl = imgBaseUrl+getIdFromUrl(element.url)+".png"
            const listItem = document.createElement("li")
            listItem.innerHTML = `
            <img src="${imageUrl}" alt="${element.name}" class="item_img">
            `
            listDOM.append(listItem)
            
        }
        )
    )


