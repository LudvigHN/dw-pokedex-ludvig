import { getIdFromUrl } from "./js/idFromUrl.js";
let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=60&offset="
let offset = 0
const rootDOM = document.querySelector("#root")
const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
function generateHeader(){
    const header = document.createElement("header")
    header.classList.add("header")
    header.innerHTML = `
    <div class="header_text">
        <img src="assets/pokeball.svg" alt="" class="header_img">
        <p class="header_text">Pokédex</p>
    </div>
    <div class="header_search">
        <input type="search" value="" placeholder="Search">
        <select name="sort" id="sort">
            <option value="index">Index</option>
            <option value="name">Name</option>
        </select>
    </div>
    `
    return header
}
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
    
    rootDOM.append(generateHeader(),generatePokemons())
}
function init() {

    render()
}
init()


