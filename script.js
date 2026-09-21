import { getIdFromUrl } from "./js/idFromUrl.js";
let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=60&offset="
let offset = 0
const rootDOM = document.querySelector("#root")
const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
function generatePokemons() {
    const list = document.createElement("ul")
    list.classList.add("list")
    fetch(apiUrl+offset)
        .then(response => { return response.json() }
        )
        .then(data =>
            data.results.forEach(element => {
                const id = getIdFromUrl(element.url)
                const imageUrl = imgBaseUrl + id + ".png"
                const listItem = document.createElement("li")
                listItem.classList.add("list_item")
                listItem.innerHTML = `
                <p class="pokemon_id">#${id}</p>
                <img src="${imageUrl}" alt="picture of ${element.name}" class="item_img">
                <p class="pokemon_name">${element.name}</p>
                `

                list.append(listItem)

            }
            )
        )
        offset += 60
    return list
}
function render() {

    rootDOM.append(generatePokemons())
}
function init() {

    render()
}
init()


