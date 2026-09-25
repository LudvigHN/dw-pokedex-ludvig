import { getPokemonTypeColor } from "./components/TypeColor.js"
import { setTypeColor } from "./components/TypeColor.js"
import { BaseStats } from "./components/BaseStats.js"
import { FlavorText } from "./components/FlavorText.js"
import { Abilities } from "./components/Abilities.js"
const url = new URL(window.location.href)
const params = url.searchParams
const id = params.get("id")
const apiUrl = "https://pokeapi.co/api/v2/pokemon/" + id
const rootDOM = document.querySelector("#root")

async function generatePokemon() {

    const response = await fetch(apiUrl);
    const data = await response.json();

    const card = document.createElement("article")
    card.classList.add("card", "type_color")
    card.innerHTML = `
    <div class="title">
        <div class="title_wrapper">
        <a href="index.html" class="back_home"><img src="assets/arrow.svg" alt="" class="back_home__arrow"></a>
        <h1 class="details_name">${data.name}</h1>
        </div>
        <p class="pokemon_id">#${id.padStart(3, "0")}</p>
    </div>
    <img src="${data.sprites.other["official-artwork"].front_default}" alt="" class="details_img">
    <div class="content_wrapper">
    <ul class="types"></ul>
    <h2 class="about type_color_text">About</h2>
    <div class="info">
        <ul class="info_list">
            <li class="weight">
                <div class="info_item_top">
                    <img src="assets/weight.svg" alt="">
                    <p class="info__text">${data.weight / 10} Kg</p>
                </div>
                <p class="info__small_text">Weight</p>
            </li>
            <li class="height">
                <div class="info_item_top">
                    <img src="assets/height.svg" alt="">
                    <p class="info__text">${data.height / 10} m</p>
                    </div>
                    <p class="info__small_text">Height</p>
                
            </li>
            <li class="abilities">
                <p class="info__small_text">Abilities</p></li>
        </ul>
    </div>
    <p class="flavor_text"></p>
    <h3 class="stats_title type_color_text">Base Stats</h3>
    <ul class="base_stats__list"></ul>
    </div>
    `

    rootDOM.append(card)

    const TypesDOM = document.querySelector(".types")
    data.types.forEach(type => {
        const typeLi = document.createElement("li")
        typeLi.classList.add("type")
        typeLi.style.backgroundColor = getPokemonTypeColor(type.type.name)
        typeLi.innerHTML = `
            ${type.type.name}
        `
        TypesDOM.append(typeLi)

    })

    Abilities(data)

    FlavorText(data)

    BaseStats(data)


    // .then(info => {flavorTextDOM.innerHTML = info.flavor_text_entries[0].flavor_text}
    // )
    setTypeColor(data.types[0].type.name)

}






function render() {
    generatePokemon()
}
render()