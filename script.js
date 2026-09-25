import { getIdFromUrl } from "./components/idFromUrl.js";
import { generateHeader } from "./components/Header.js";
let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=60&"

const rootDOM = document.querySelector("#root")
const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
const list = document.createElement("ul");
list.classList.add("list");
rootDOM.append(list)

async function generatePokemons() {


    const response = await fetch(apiUrl);
    const data = await response.json();

    apiUrl = data.next;
    data.results.forEach(element => {
        const id = getIdFromUrl(element.url)
        const paddedNumber = id.padStart(3, "0")

        const imageUrl = imgBaseUrl + id + ".png"
        const listItem = document.createElement("li")
        listItem.classList.add("list_item")
        listItem.innerHTML = `
               
                <p class="pokemon_id">#${paddedNumber}</p>
                <img src="${imageUrl}" alt="picture of ${element.name}" class="item_img" loading="lazy">
                <a href="details.html?id=${id}" class="pokemon_link">
                <p class="pokemon_name">${element.name}</p>
                </a>
                `

        list.append(listItem)
    });

}

function genBtn() {
    const btn = document.createElement("button")
    btn.classList.add("load_more_btn")
    btn.textContent = "load More"
    btn.addEventListener("click", async () => {
        await generatePokemons()
    })


    return btn
}
async function render() {
    rootDOM.append(genBtn())
    rootDOM.prepend(generateHeader())
    await generatePokemons()

}
function init() {

    render()
}
init()


